import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class LoginInput {
  @Field()
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
