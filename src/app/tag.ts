export class Tag {
    
    constructor(
        public registry: string, 
        public repository: string, 
        public tag: string)
    {
    }

    get qualifiedName(): string {
        return `${this.registry}/${this.repository}:${this.tag}`;
    }

}