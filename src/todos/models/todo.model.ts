import { BaseModel } from 'src/common/models/base.model';
import { StatusEnum } from '../../common/types/status.enum';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';

@ObjectType()
export class Todo extends BaseModel {
  @Field()
  todoItem: string;

  @Field(() => StatusEnum)
  status: StatusEnum;

  @Field(() => User)
  user: User;

  @Field(() => Int)
  userId: number;
}
