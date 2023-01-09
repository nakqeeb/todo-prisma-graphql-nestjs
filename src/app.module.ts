import { TodosModule } from './todos/todos.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import config from './common/configs/config';
import { UsersModule } from './users/users.module';
import { GqlConfigService } from './gql-config.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TodosModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.example`,
      load: [config],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
  ],
})
export class AppModule {}
