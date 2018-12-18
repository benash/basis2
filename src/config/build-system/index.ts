import { HasDependencies, HasConfigs } from '../interfaces'
import { ConfigFile } from '../ConfigFile'
import { WebpackConfig } from '../ConfigStore'
import { Feature, WebpackBaseFeature } from './Feature'

interface BuildSystem extends HasDependencies, HasConfigs {}

export class NoopBuildSystem implements BuildSystem {
  devDependencies: string[] = []
  configs = () => []
}

export class WebpackBuildSystem implements BuildSystem {
  constructor(private config: WebpackConfig) {}

  get devDependencies(): string[] {
    const obj = this.enabledFeatures
      .map(f => f.devDependencies)
      .reduce((acc, x) => acc.concat(x))
      .reduce((acc, x) => { acc[x] = true; return acc }, <{[key: string]: boolean}>{} )
    return Object.entries(obj).map(([k, v]) => k)
  }

  private get enabledFeatures(): Feature[] {
    return WebpackBaseFeature.allFeatures(this.config)
      .filter(f => f.isEnabled)
  }

  private get contents(): string {
    return this.enabledFeatures
      .map(f => f.partialFileContents)
      .reduce((acc, contents) => acc.merge(contents))
      .prettified
  }

  configs(): ConfigFile[] {
    // const entryPointConfigs: ConfigFile[] = new EntryPoint(this.config.entry, `${this.config.outputPath}/index.html`).configs()
    // return [new WebpackConfigFile(this.config), ...entryPointConfigs]
    return [{
      name: 'webpack.config.js',
      language: 'js',
      contents: this.contents,
    }]
  }
}
