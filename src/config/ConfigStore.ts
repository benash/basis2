import { observable, computed } from 'mobx'
import { YarnPackageManager, NpmPackageManager, NoopPackageManager } from './PackageManager'
import { WebpackBuildSystem, NoopBuildSystem } from './build-system'
import { BabelTranspiler, NoopTranspiler } from './Transpiler'
import { ConfigFile } from './ConfigFile'
import { HasConfigs } from './interfaces'

export interface WebpackConfig {
  entry: string
  outputFilename: string
  outputPath: string
  loadCss: boolean
  loadImages: boolean
  loadFonts: boolean
  loadCsv: boolean
  loadXml: boolean
  useCleanPlugin: boolean
  useHtmlPlugin: boolean
}

export class ConfigStore {
  id = Math.random()
  @observable packageManagerName = 'yarn'
  @observable useWebpack = true
  @observable webpackConfig: WebpackConfig = {
    entry: './src/index.js',
    outputPath: 'dist',
    outputFilename: 'bundle.js',
    loadCss: false,
    loadImages: false,
    loadFonts: false,
    loadCsv: false,
    loadXml: false,
    useCleanPlugin: false,
    useHtmlPlugin: false,
  }
  @observable useBabel = false

  @computed get buildSystem() {
    if (this.useWebpack) {
      return new WebpackBuildSystem(this.webpackConfig)
    }

    return new NoopBuildSystem()
  }

  @computed get devDependencies() {
    return [
      this.buildSystem,
      this.transpiler,
    ].map(x => x.devDependencies)
    .reduce((prev, cur) => prev.concat(cur))
  }

  @computed get packageManager() {
    switch (this.packageManagerName) {
      case 'yarn':
        return new YarnPackageManager(this.devDependencies)
      case 'npm':
        return new NpmPackageManager(this.devDependencies)
      default:
        return new NoopPackageManager(this.devDependencies)
    }
  }

  @computed get transpiler() {
    if (this.useBabel) {
      return new BabelTranspiler()
    }
    return new NoopTranspiler()
  }

  @computed get htmlPage() {
    return new HtmlPage(this.webpackConfig)
  }

  @computed get configFiles() {
    return [
      this.packageManager,
      this.buildSystem,
      this.transpiler,
      // this.htmlPage,
    ]
    .map(a => a.configs())
    .reduce((acc, cur) => acc.concat(cur))
  }
}

class HtmlPage implements HasConfigs {
  constructor(public webpackConfig: WebpackConfig) {}
  configs(): ConfigFile[] {
    throw new Error('Method not implemented.')
  }
}
