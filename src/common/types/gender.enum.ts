import { registerEnumType } from '@nestjs/graphql';

export enum GenderEnum {
  male = 'male',
  female = 'female',
}

registerEnumType(GenderEnum, {
  name: 'GenderEnum',
  description: 'Properties by which the user gender is male or female.',
});
