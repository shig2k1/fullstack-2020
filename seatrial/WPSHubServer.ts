import { GenericServer } from './GenericServer'
import randomstring from 'randomstring'
import { HttpReadinessProbe } from './readiness/HttpReadinessProbe'

const WPSHUB_DOCKER_IMAGE = 'docker.worldprogramming.com/wpshub'
const INSTALLROOT = '/opt/worldprogramming/wpshub-4'
const DEFAULT_PORT = 8181
const HUBADMINISTRATOR_USERNAME = 'HubAdministrator'
const HUBADMINISTRATOR_PASSWORD = 'password'

export class WPSHubServer extends GenericServer {
    private configuration: any = {};

    constructor (licenceKey: string) {
      super({
        name: 'wpshub',
        imageName: WPSHUB_DOCKER_IMAGE,
        containerPort: DEFAULT_PORT
      })
      this.configuration['bootstrap.adminPassword'] = HUBADMINISTRATOR_PASSWORD
      this.configuration['ondemandmonitor.monitorFrequency'] = '1'
      this.configuration['ondemandmonitor.connectionTimeout'] = '1'
      this.withEnv('WPSHUB_DATABASE_TYPE', 'internal')
      this.withEnv('WPSHUB_DATABASE_MEMORYKEY', randomstring.generate(16))
      this.withEnv('WPSHUB_LICENCE_KEY', licenceKey)
      this.withCoresRequest(0.5)
      this.withMemoryRequest('2Gi')
      this.withCommand(['/bin/sh', '-c', `${INSTALLROOT}/bin/wpshub bootstrap && ${INSTALLROOT}/bin/wpshub`])
      const readinessProbe = new HttpReadinessProbe({
        urlSupplier: () => this.getURL(),
        auth: {
          username: HUBADMINISTRATOR_USERNAME,
          password: HUBADMINISTRATOR_PASSWORD
        }
      })
      this.withReadinessProbe(readinessProbe)
      this.withCoresRequest(0.5)
      this.withMemoryRequest('2Gi')
      this.withReadinessTimeout(60000)
    }

    public async start (): Promise<void> {
      let javaOpts = ''
      Object.entries(this.configuration).forEach(([key, value]) => {
        javaOpts = `${javaOpts} -Dwpshub.${key}=${value}`
      })
      this.withEnv('JAVA_OPTS', javaOpts)
      await super.start()
    }

    public withConfigurationOption (moduleName: string, optionName: string, optionValue: string): this {
      this.configuration[`${moduleName}.${optionName}`] = optionValue
      return this
    }

    public getHubAdministratorUsername (): string {
      return HUBADMINISTRATOR_USERNAME
    }

    public getHubAdministratorPassword (): string {
      return HUBADMINISTRATOR_PASSWORD
    }

    public getURL (): string {
      return `http://${this.getHostname()}:${this.getPort()}`
    }
}
