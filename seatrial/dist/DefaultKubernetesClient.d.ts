import { K8sService, DeploymentDefinition, ServiceDefinition, KubernetesClient } from './KubernetesClient';
export declare class DefaultKubernetesClient implements KubernetesClient {
    private kuberentesNamespace;
    private client;
    constructor(kubernetesNamespace: string);
    createDeployment(deployment: DeploymentDefinition): Promise<void>;
    createService(service: ServiceDefinition): Promise<K8sService>;
    deleteDeployment(deploymentName: string): Promise<void>;
    deleteService(serviceName: string): Promise<void>;
}
