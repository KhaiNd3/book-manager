export class CreateAuthorCommand {
  constructor(
    public readonly authorName: string,
    public readonly description: string,
  ) {}
}
