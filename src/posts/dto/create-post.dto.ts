import { IsOptional, IsString, MaxLength } from "class-validator";

export class CreatePostDto {
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
