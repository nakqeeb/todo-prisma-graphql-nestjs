import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { StatusEnum } from 'src/common/types/status.enum';

@InputType()
export class UpdateStatusDto {
  @Field(() => StatusEnum)
  @IsNotEmpty()
  @IsEnum(StatusEnum, {
    message: 'status must be either Pending, InProgress or Completed',
  })
  status: StatusEnum;
}
