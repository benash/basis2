import { ConfigFile } from './ConfigFile'

export interface HasDependencies {
  devDependencies: string[]
}

export interface HasConfigs {
  configs(): ConfigFile[]
}
