export interface ReadinessProbe {
    waitUntilReady(initialDelay: number, period: number, timeout: number): Promise<void>;
}
