import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosResolver } from './todos.resolver';

@Module({
  imports: [PrismaModule],
  providers: [TodosResolver, TodosService],
})
export class TodosModule {}
