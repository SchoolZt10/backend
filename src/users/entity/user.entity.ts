import { Exclude, Expose } from "class-transformer";

export class UserEntity {
  id: number;
  name: string
  email: string;
  role: string;
  @Exclude()
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
