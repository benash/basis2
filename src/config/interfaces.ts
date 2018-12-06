import { ConfigFile } from './ConfigFile'

export interface HasDependencies {
  devDependencies: Array<string>
}

export interface HasConfigs {
  configs(): Array<ConfigFile>
}
