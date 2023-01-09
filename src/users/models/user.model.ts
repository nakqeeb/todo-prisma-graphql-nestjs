import { GenderEnum } from '../../common/types/gender.enum';
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Todo } from '../../todos/models/todo.model';
import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class User extends BaseModel {
  @Field()
  username: string;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  phoneNumber: string;

  @HideField()
  password: string;

  @Field()
  address: string;

  @Field()
  dateOfBirth: Date;

  @Field(type => GenderEnum)
  gender: GenderEnum;
  
  @Field(type => [Todo], {nullable: true})
  todos?: Todo[];
}
