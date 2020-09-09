import { KubernetesClient } from './KubernetesClient';
import { SeaTrialConfiguration } from './SeaTrialConfiguration';
export declare class SeaTrial {
    private _kubernetesClient;
    private _configuration;
    constructor(configuration: SeaTrialConfiguration, kubernetesClient: KubernetesClient);
    get configuration(): SeaTrialConfiguration;
    get kubernetesClient(): KubernetesClient;
    private static loadConfigurationFromEnvironment;
    static newSeaTrial(): SeaTrial;
}
