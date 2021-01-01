export type UserId = string;

export class User {
  constructor(public id: UserId, public firstName: string) {}
}
