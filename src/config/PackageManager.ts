import { HasConfigs, HasDependencies } from './interfaces'
import { ConfigFile } from './ConfigFile'

interface PackageManagerI extends HasConfigs, HasDependencies {}

abstract class PackageManager implements PackageManagerI {
  constructor(public devDependencies: string[]) {}
  abstract configs(): ConfigFile[]
}

class PackageManagerConfigFile implements ConfigFile {
  public name: string = 'Package Installation'
  public language: string = 'console'
  public contents: string

  constructor(command: string) {
    this.contents = `> ${command}`
  }
}

export class YarnPackageManager extends PackageManager {
  configs() {
    return [
      new PackageManagerConfigFile(`yarn add -D ${this.devDependencies.join(' ')}`),
    ]
  }
}

export class NpmPackageManager extends PackageManager {
  configs() {
    return [
      new PackageManagerConfigFile(`npm install ${this.devDependencies.join(' ')} --save-dev`),
    ]
  }
}

export class NoopPackageManager extends PackageManager {
  configs() {
    return []
  }
}
