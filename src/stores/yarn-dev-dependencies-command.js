export default class YarnDevDependenciesCommand {
  constructor(dependencies, ) {
    this.dependencies = dependencies
  }
  
  get toString() {
    return `yarn add -D ${this.dependencies.join(' ')}`
  }
}
