export default class NpmDevDependenciesCommand {
  constructor(dependencies, ) {
    this.dependencies = dependencies
  }
  
  get toString() {
    return `npm install -D ${this.dependencies.join(' ')}`
  }
}
