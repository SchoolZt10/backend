import { IsEmail, IsString, MaxLength } from "class-validator";

export class CreateCommentDto {
  @IsString()
  @MaxLength(128)
  username: string;
  @IsEmail()
  @MaxLength(128)
  email: string;
  @IsString()
  @MaxLength(1024 * 2)
  comment: string;

  @IsString()
  postId: string;
}
