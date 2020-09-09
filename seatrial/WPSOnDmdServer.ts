import { GenericServer } from './GenericServer'
import { HttpReadinessProbe } from './readiness/HttpReadinessProbe'

const DEFAULT_PORT = 5555

export class WPSOnDemandServer extends GenericServer {
  constructor (licenceKeyBase64: string) {
    super({
      name: 'wpsondmd',
      imageName: 'docker.worldprogramming.com/wpsondmd',
      containerPort: DEFAULT_PORT
    })
    this.withEnv('WPS_LICENCE', licenceKeyBase64)
    const readinessProbe = new HttpReadinessProbe({
      urlSupplier: () => `${this.getURL()}/config`
    })
    this.withReadinessProbe(readinessProbe)
    this.withCoresRequest(0.1)
    this.withMemoryRequest('512Mi')
    this.withReadinessTimeout(120000)
  }

  public getURL () : string {
    return `http://${this.getHostname()}:${this.getPort()}`
  }
}
