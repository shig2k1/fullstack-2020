import process from 'process'
import _ from 'lodash'
import { KubernetesClient } from './KubernetesClient'
import { SeaTrialException } from './SeaTrialException'
import { SeaTrialConfiguration } from './SeaTrialConfiguration'
import { DefaultKubernetesClient } from './DefaultKubernetesClient'

export class SeaTrial {
  private _kubernetesClient: KubernetesClient
  private _configuration: SeaTrialConfiguration

  constructor (configuration: SeaTrialConfiguration, kubernetesClient: KubernetesClient) {
    this._configuration = configuration
    this._kubernetesClient = kubernetesClient
  }

  get configuration (): SeaTrialConfiguration {
    return {
      ...this._configuration
    }
  }

  get kubernetesClient (): KubernetesClient {
    return this._kubernetesClient
  }

  private static loadConfigurationFromEnvironment (): SeaTrialConfiguration {
    const clusterHostname = process.env.SEATRIAL_CLUSTER_HOSTNAME ?? ''
    const kubernetesNamespace = process.env.SEATRIAL_NAMESPACE ?? ''
    return { clusterHostname, kubernetesNamespace }
  }

  static newSeaTrial (): SeaTrial {
    const configFromEnv: SeaTrialConfiguration = SeaTrial.loadConfigurationFromEnvironment()
    if (_.isEmpty(configFromEnv.clusterHostname)) {
      throw new SeaTrialException('Configuration missing cluster hostname')
    }
    if (_.isEmpty(configFromEnv.kubernetesNamespace)) {
      throw new SeaTrialException('Configuration missing namespace')
    }
    return new SeaTrial(configFromEnv, new DefaultKubernetesClient(configFromEnv.kubernetesNamespace))
  }
}
