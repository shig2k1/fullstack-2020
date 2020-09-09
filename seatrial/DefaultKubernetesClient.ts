import { K8sService, DeploymentDefinition, ServiceDefinition, KubernetesClient } from './KubernetesClient'
import * as ApiClient from 'kubernetes-client'

export class DefaultKubernetesClient implements KubernetesClient {
  private kuberentesNamespace: string;
  private client: ApiClient.ApiRoot;

  constructor (kubernetesNamespace: string) {
    this.kuberentesNamespace = kubernetesNamespace
    this.client = new ApiClient.Client1_13({
      version: '1.13'
    })
  }

  async createDeployment (deployment: DeploymentDefinition): Promise<void> {
    return await this.client.apis.apps.v1.namespaces(this.kuberentesNamespace).deployments.post({ body: deployment })
  }

  async createService (service: ServiceDefinition): Promise<K8sService> {
    const createdService = await this.client.api.v1.namespaces(this.kuberentesNamespace).services.post({
      body: service
    })
    return createdService
  }

  async deleteDeployment (deploymentName: string): Promise<void> {
    await this.client.apis.apps.v1.namespaces(this.kuberentesNamespace).deployment(deploymentName).delete()
  }

  async deleteService (serviceName: string): Promise<void> {
    await this.client.api.v1.namespaces(this.kuberentesNamespace).service(serviceName).delete()
  }
}
