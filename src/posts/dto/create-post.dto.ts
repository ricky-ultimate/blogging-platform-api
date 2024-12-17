import { IsNotEmpty, IsOptional, IsString, ArrayNotEmpty, ArrayMinSize } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @ArrayNotEmpty()
  @ArrayMinSize(1)
  tags: string[];
}
