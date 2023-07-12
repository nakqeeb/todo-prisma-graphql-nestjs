import { UpdateStatusDto } from './dto/update-status.dto';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { Todo } from './models/todo.model';
import { CreateTodoInput } from './dto/create-todo.input';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/users/models/user.model';
import { SentryInterceptor } from 'src/common/interceptors/sentry.interceptor';

@UseInterceptors(SentryInterceptor)
@Resolver(() => Todo)
@UseGuards(GqlAuthGuard)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Mutation(() => Todo)
  createTodo(
    @GetUser() user: User,
    @Args('createTodoInput') createTodoInput: CreateTodoInput,
  ) {
    return this.todosService.create(user.id, createTodoInput);
  }

  @Query(() => [Todo], { name: 'todos' })
  findAll(@GetUser() user: User) {
    return this.todosService.findAll(user.id);
  }

  @Query(() => Todo, { name: 'todo' })
  findOne(@GetUser() user: User, @Args('id', { type: () => Int }) id: number) {
    return this.todosService.findOne(id, user.id);
  }

  @Mutation(() => Todo)
  updateStatus(
    @GetUser() user: User,
    @Args('todoId') id: number,
    @Args('updateStatusDto') updateStatusDto: UpdateStatusDto,
  ) {
    return this.todosService.updateStatus(id, user.id, updateStatusDto);
  }

  @Mutation(() => Todo)
  removeTodo(
    @GetUser() user: User,
    @Args('todoId', { type: () => Int }) id: number,
  ) {
    return this.todosService.remove(id, user.id);
  }

  @ResolveField('theUser', () => User)
  async theUser(@Parent() todo: Todo) {
    return this.todosService.theUser(todo);
  }
}
