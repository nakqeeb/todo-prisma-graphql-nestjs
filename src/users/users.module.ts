import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PasswordService } from 'src/auth/password.service';

@Module({
  imports: [PrismaModule],
  providers: [UsersResolver, UsersService, PasswordService],
})
export class UsersModule {}
