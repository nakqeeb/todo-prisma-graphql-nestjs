import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { StatusEnum } from 'src/common/types/status.enum';

@InputType()
export class CreateTodoInput {
  @Field()
  @IsNotEmpty()
  todoItem: string;

  @Field(() => StatusEnum, { nullable: true }) // { nullable: true } important to make it optional
  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusEnum;
}
