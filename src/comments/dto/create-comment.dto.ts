import { IsEmail, IsString, MaxLength } from "class-validator";

export class CreateCommentDto {
  @IsString()
  @MaxLength(1024 * 2)
  comment: string;

  @IsString()
  postId: string;
}
