import { SeaTrial } from './SeaTrial';
import { ReadinessProbe } from './readiness/ReadinessProbe';
export interface GenericServerParams {
    seaTrial?: SeaTrial;
    name: string;
    imageName: string;
    containerPort: number;
}
export declare class GenericServer {
    private seaTrial;
    private name;
    private imageName;
    private containerPort;
    private env;
    private readinessProbes;
    private id;
    private deploymentName;
    private serviceName;
    private label;
    private servicePorts;
    private imageTag;
    private imagePullPolicy;
    private command;
    private memoryRequest;
    private coresRequest;
    private initialDelay;
    private period;
    private timeout;
    constructor(params: GenericServerParams);
    withEnv(variable: string, value: string): this;
    withReadinessProbe(readinessProbe: ReadinessProbe): this;
    withReadinessInitialDelay(initialDelay: number): this;
    withReadinessPeriod(period: number): this;
    withReadinessTimeout(timeout: number): this;
    withCommand(command: string[]): this;
    withImageTag(imageTag: string): this;
    withImagePullPolicy(imagePullPolicy: string): this;
    withMemoryRequest(memoryRequest: string): this;
    withCoresRequest(coresRequest: number): this;
    start(): Promise<void>;
    private get kuberenetesNamespace();
    private createDeploymentSpec;
    private createServiceSpec;
    getPort(): number;
    getHostname(): string;
    private performReadinessChecks;
    close(): Promise<void>;
}
