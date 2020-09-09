import { GenericServer } from './GenericServer';
export declare class WPSOnDemandServer extends GenericServer {
    constructor(licenceKeyBase64: string);
    getURL(): string;
}
