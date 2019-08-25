export class Hello {
  constructor(
    private readonly greeting: string) {
  }

  greet() {
    console.log(this.greeting);
  }
}
