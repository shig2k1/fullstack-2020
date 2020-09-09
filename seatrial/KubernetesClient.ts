export type DeploymentDefinition = any;
export type ServiceDefinition = any;
export type K8sService = any;

export interface KubernetesClient {

  createDeployment(deployment: DeploymentDefinition): Promise<void>;

  createService(service: ServiceDefinition): Promise<K8sService>;

  deleteDeployment(deploymentName: string): Promise<void>;

  deleteService(serviceName: string): Promise<void>;

}
