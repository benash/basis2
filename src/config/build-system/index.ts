import { HasDependencies, HasConfigs, } from '../interfaces'
import { ConfigFile } from '../ConfigFile'
import { EntryPoint } from './EntryPoint';
import { WebpackConfig } from './WebpackConfig';
import { WebpackConfigFile } from './WebpackConfigFile';

interface BuildSystem extends HasDependencies, HasConfigs {}

export class NoopBuildSystem implements BuildSystem {
  devDependencies: Array<string> = []
  configs = () => []
}

export class WebpackBuildSystem implements BuildSystem {
  constructor(private config: WebpackConfig) {}

  devDependencies: Array<string> = [
    'webpack',
    'webpack-cli',
  ]

  configs(): ConfigFile[] {
    const entryPointConfigs: ConfigFile[] = new EntryPoint(this.config.entry, `${this.config.outputPath}/index.html`).configs()
    return [new WebpackConfigFile(this.config), ...entryPointConfigs]
  }
}


