import waitOn from 'wait-on'
import { ReadinessProbe } from './ReadinessProbe'

export interface AuthParams {
    username: string,
    password: string
}

export interface HttpReadinessProbeParams {
    urlSupplier: () => string;
    auth?: AuthParams;
}

type waitOptions = {
    resources: string[],
    delay: number,
    interval: number,
    timeout: number,
    tcpTimeout: number,
    auth?: AuthParams
}

export class HttpReadinessProbe implements ReadinessProbe {
  private params: HttpReadinessProbeParams;

  constructor (params: HttpReadinessProbeParams) {
    this.params = { ...params }
  }

  public async waitUntilReady (initialDelay: number, period: number, timeout: number): Promise<void> {
    const opts: waitOptions = {
      resources: [
        this.params.urlSupplier()
      ],
      delay: initialDelay,
      interval: period,
      timeout: timeout,
      tcpTimeout: timeout
    }
    if (this.params.auth) {
      opts.auth = { ...this.params.auth }
    }
    await waitOn(opts)
  }
}
