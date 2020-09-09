import { ReadinessProbe } from './ReadinessProbe';
export interface AuthParams {
    username: string;
    password: string;
}
export interface HttpReadinessProbeParams {
    urlSupplier: () => string;
    auth?: AuthParams;
}
export declare class HttpReadinessProbe implements ReadinessProbe {
    private params;
    constructor(params: HttpReadinessProbeParams);
    waitUntilReady(initialDelay: number, period: number, timeout: number): Promise<void>;
}
