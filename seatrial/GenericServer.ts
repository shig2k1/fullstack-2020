import { SeaTrial } from './SeaTrial'
import randomstring from 'randomstring'
import { SeaTrialException } from './SeaTrialException'
import seatrialUtils from './SeaTrialUtils'
import { ReadinessProbe } from './readiness/ReadinessProbe'
import { ServiceDefinition, DeploymentDefinition } from './KubernetesClient'

export interface GenericServerParams {
  seaTrial?: SeaTrial
  name: string
  imageName: string
  containerPort: number
}

export class GenericServer {
  private seaTrial: SeaTrial;
  private name: string;
  private imageName: string;
  private containerPort: number;
  private env: {};
  private readinessProbes: Array<any>
  private id: string;
  private deploymentName: string;
  private serviceName: string;
  private label: string;
  private servicePorts: { port?: number };
  private imageTag: string;
  private imagePullPolicy: string;
  private command: string[] | null;
  private memoryRequest: string;
  private coresRequest: number | null;
  private initialDelay: number;
  private period: number;
  private timeout: number;

  constructor (params: GenericServerParams) {
    this.seaTrial = params.seaTrial || SeaTrial.newSeaTrial()
    this.name = params.name
    this.imageName = params.imageName
    this.containerPort = params.containerPort
    this.env = {}
    this.readinessProbes = []
    this.id = randomstring.generate(7).toLocaleLowerCase()
    this.deploymentName = this.name + '-deployment-' + this.id
    this.serviceName = this.name + '-service-' + this.id
    this.label = this.name + '-' + seatrialUtils.generateUniqueLabel()
    this.servicePorts = { }
    this.imageTag = 'latest'
    this.imagePullPolicy = 'Always'
    this.command = null
    this.memoryRequest = '512Mi'
    this.coresRequest = null
    this.initialDelay = 1000
    this.period = 1000
    this.timeout = 30000
  }

  public withEnv (variable: string, value: string): this {
    (this.env as any)[variable] = value
    return this
  }

  public withReadinessProbe (readinessProbe: ReadinessProbe): this {
    this.readinessProbes.push(readinessProbe)
    return this
  }

  public withReadinessInitialDelay (initialDelay: number): this {
    this.initialDelay = initialDelay
    return this
  }

  public withReadinessPeriod (period: number): this {
    this.period = period
    return this
  }

  public withReadinessTimeout (timeout: number): this {
    this.timeout = timeout
    return this
  }

  public withCommand (command: string[]): this {
    this.command = [...command]
    return this
  }

  public withImageTag (imageTag: string): this {
    this.imageTag = imageTag
    return this
  }

  public withImagePullPolicy (imagePullPolicy: string): this {
    if (!imagePullPolicy) {
      throw new Error()
    }
    this.imagePullPolicy = imagePullPolicy
    return this
  }

  public withMemoryRequest (memoryRequest: string): this {
    if (!memoryRequest) {
      throw new Error()
    }
    this.memoryRequest = memoryRequest
    return this
  }

  public withCoresRequest (coresRequest: number): this {
    if (coresRequest < 0) {
      throw new Error()
    }
    this.coresRequest = coresRequest
    return this
  }

  async start (): Promise<void> {
    try {
      const deployment = this.createDeploymentSpec()
      await this.seaTrial.kubernetesClient.createDeployment(deployment)
      const service = this.createServiceSpec()
      const createdService = await this.seaTrial.kubernetesClient.createService(service)
      for (const servicePort of createdService.body.spec.ports) {
        (this.servicePorts as any)[servicePort.name] = servicePort.nodePort
      }
      await this.performReadinessChecks()
    } catch (error) {
      console.error(error)
      throw new SeaTrialException('Could not start ' + this.name)
    }
  }

  private get kuberenetesNamespace (): string {
    return this.seaTrial.configuration.kubernetesNamespace
  }

  private createDeploymentSpec (): DeploymentDefinition {
    const deployment: any = {
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      metadata: {
        name: this.deploymentName,
        namespace: this.kuberenetesNamespace
      },
      spec: {
        selector: {
          matchLabels: {
            app: this.label
          }
        },
        template: {
          metadata: {
            labels: {
              app: this.label
            }
          },
          spec: {
            containers: [
              {
                image: `${this.imageName}:${this.imageTag}`,
                name: this.label,
                ports: [
                  {
                    containerPort: this.containerPort,
                    name: 'port',
                    protocol: 'TCP'
                  }
                ],
                imagePullPolicy: this.imagePullPolicy,
                env: Object.entries(this.env).map(([key, value]) => {
                  return {
                    name: key,
                    value
                  }
                }),
                resources: {
                  requests: {
                    memory: this.memoryRequest
                  }
                }
              }
            ]
          }
        }
      }
    }
    if (this.command !== null) {
      deployment.spec.template.spec.containers[0].command = this.command
    }
    if (this.coresRequest !== null) {
      deployment.spec.template.spec.containers[0].resources.cpu = `${this.coresRequest * 1000}m`
    }
    return deployment
  }

  private createServiceSpec (): ServiceDefinition {
    const service = {
      apiVersion: 'v1',
      kind: 'Service',
      metadata: {
        name: this.serviceName,
        namespace: this.kuberenetesNamespace
      },
      spec: {
        type: 'NodePort',
        selector: {
          app: this.label
        },
        ports: [
          {
            name: 'port',
            port: this.containerPort,
            protocol: 'TCP',
            targetPort: 'port'
          }
        ]
      }
    }
    return service
  }

  public getPort (): number {
    return this.servicePorts.port || 0
  }

  public getHostname (): string {
    return this.seaTrial.configuration.clusterHostname
  }

  private async performReadinessChecks (): Promise<void> {
    const promises = this.readinessProbes.map(async (readinessProbe) => {
      return await readinessProbe.waitUntilReady(this.initialDelay, this.period, this.timeout)
    })
    await Promise.all(promises)
  }

  public async close (): Promise<void> {
    // TODO handle exceptions and surpress
    try {
      await this.seaTrial.kubernetesClient.deleteDeployment(this.deploymentName)
    } finally {
      await this.seaTrial.kubernetesClient.deleteService(this.serviceName)
    }
  }
}
