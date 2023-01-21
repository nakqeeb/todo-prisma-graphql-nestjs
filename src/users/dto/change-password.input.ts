import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class ChangePasswordInput {
  @Field()
  @IsNotEmpty()
  @MinLength(6)
  oldPassword: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}
