import { observable, computed, } from 'mobx'
import { YarnPackageManager, NpmPackageManager, NoopPackageManager, } from './PackageManager'
import { WebpackBuildSystem, NoopBuildSystem, WebpackConfig, } from './BuildSystem'
import { BabelTranspiler, NoopTranspiler } from './Transpiler'
import { ConfigFile } from './ConfigFile'

export default class ConfigStore {
  id = Math.random()
  @observable packageManagerName = 'yarn'
  @observable useWebpack = true
  @observable webpackEntry = './src/index.js'
  @observable webpackOutputPath = 'dist'
  @observable webpackOutputFilename = 'bundle.js'
  @observable useBabel = false

  @computed get buildSystem() {
    if (this.useWebpack) {
      const config = new WebpackConfig(this.webpackEntry, this.webpackOutputFilename, this.webpackOutputPath)
      return new WebpackBuildSystem(config)
    }

    return new NoopBuildSystem()
  }

  @computed get devDependencies() {
    return this.buildSystem.devDependencies.concat(this.transpiler.devDependencies)
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
