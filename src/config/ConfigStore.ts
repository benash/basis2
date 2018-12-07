import { observable, computed, } from 'mobx'
import { YarnPackageManager, NpmPackageManager, NoopPackageManager, } from './PackageManager'
import { WebpackBuildSystem, NoopBuildSystem, } from './build-system'
import { WebpackConfig } from './build-system/WebpackConfig'
import { BabelTranspiler, NoopTranspiler } from './Transpiler'
import { ConfigFile } from './ConfigFile'

export default class ConfigStore {
  id = Math.random()
  @observable packageManagerName = 'yarn'
  @observable useWebpack = true
  @observable webpackConfig: WebpackConfig = {
    entry: './src/index.js',
    outputPath: 'dist',
    outputFilename: 'bundle.js',
    loadCss: true,
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

  @computed get configFiles() {
    return new Array<ConfigFile>().concat(
      this.packageManager.configs(),
      this.buildSystem.configs(),
      this.transpiler.configs(),
    )
  }
}
