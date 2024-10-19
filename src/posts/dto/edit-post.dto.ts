import { IsOptional, IsString, MaxLength } from "class-validator";
import { CreatePostDto } from "./create-post.dto";

export class UpdatePostDto extends CreatePostDto {
  @MaxLength(128)
  @IsString()
  title: string;

  @MaxLength(1024 * 10)
  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  categoryId: string;
}
