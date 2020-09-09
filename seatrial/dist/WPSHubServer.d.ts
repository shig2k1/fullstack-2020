import { GenericServer } from './GenericServer';
export declare class WPSHubServer extends GenericServer {
    private configuration;
    constructor(licenceKey: string);
    start(): Promise<void>;
    withConfigurationOption(moduleName: string, optionName: string, optionValue: string): this;
    getHubAdministratorUsername(): string;
    getHubAdministratorPassword(): string;
    getURL(): string;
}
