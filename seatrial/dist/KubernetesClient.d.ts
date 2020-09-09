export declare type DeploymentDefinition = any;
export declare type ServiceDefinition = any;
export declare type K8sService = any;
export interface KubernetesClient {
    createDeployment(deployment: DeploymentDefinition): Promise<void>;
    createService(service: ServiceDefinition): Promise<K8sService>;
    deleteDeployment(deploymentName: string): Promise<void>;
    deleteService(serviceName: string): Promise<void>;
}
