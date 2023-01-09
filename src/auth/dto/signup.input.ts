import { GenderEnum } from '../../common/types/gender.enum';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class SignupInput {
  @Field()
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @Field()
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @ApiProperty()
  @IsNotEmpty()
  phoneNumber: string;

  @Field()
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Field()
  @ApiProperty()
  address: string;

  @Field()
  @ApiProperty()
  //@IsDateString()
  @IsDate()
  dateOfBirth: Date;

  @Field()
  @ApiProperty({ enum: GenderEnum })
  @IsEnum(GenderEnum, {
    message: 'gender must be either Male or Female',
  })
  gender: GenderEnum;
}
