import { registerEnumType } from '@nestjs/graphql';

export enum StatusEnum {
  Pending = 'Pending',
  InProgress = 'InProgress',
  Completed = 'Completed',
}

registerEnumType(StatusEnum, {
  name: 'StatusEnum',
  description:
    'Properties by which the todo status is Pending, InProgress or Completed.',
});
