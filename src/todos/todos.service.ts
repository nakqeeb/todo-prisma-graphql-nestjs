import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  create(userId: number, createTodoInput: CreateTodoInput) {
    const newTodo = this.prisma.todo.create({
      data: {
        todoItem: createTodoInput.todoItem,
        status: createTodoInput.status,
        userId: userId,
      },
    });
    return newTodo;
  }

  async findAll(userId: number) {
    const todoItems = await this.prisma.todo.findMany({
      where: { userId: userId },
    });
    if (!todoItems) {
      throw new NotFoundException();
    }
    return todoItems;
  }

  async findOne(todoId: number, userId: number) {
    const todoItem = await this.prisma.todo.findFirst({
      where: { id: todoId, userId: userId },
    });
    if (!todoItem) {
      throw new NotFoundException();
    }
    return todoItem;
    // OR
    // return this.prisma.user
    //   .findUnique({ where: { id: userId } })
    //   .todo({ where: { id: todoId } });
    // OR
    // return this.prisma.todo.findMany({
    //   where: {
    //     id: todoId,
    //     user: { id: userId },
    //   },
    // });
  }

  async updateStatus(
    todoId: number,
    userId: number,
    updateStatusDto: UpdateStatusDto,
  ) {
    const todo = await this.prisma.todo.findUnique({ where: { id: todoId } });
    if (todo.userId !== userId) {
      throw new UnauthorizedException('Unauthorized to edit this ToDo');
    }
    const updatedTodo = await this.prisma.todo.update({
      where: { id: todoId },
      data: updateStatusDto,
    });
    return updatedTodo;
  }

  async remove(todoId: number, userId: number) {
    const todo = await this.prisma.todo.findUnique({ where: { id: todoId } });
    if (!todo) {
      throw new NotFoundException('ToDo not found');
    }
    if (todo.userId !== userId) {
      throw new UnauthorizedException('Unauthorized to delete this ToDo');
    }
    return this.prisma.todo.delete({ where: { id: todoId } });
  }
}
