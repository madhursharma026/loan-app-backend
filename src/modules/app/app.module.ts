import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { OtpModule } from '../otp/otp.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from '../auth/auth.module';
import { LoanModule } from '../loans/loans.module';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/user.entity';
import { AdminsModule } from '../admins/admins.module';
import { Admin } from '../admins/entities/admin.entity';
import { LoanEntity } from '../loans/entities/loans.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'loan-app',
        entities: [Admin, User, LoanEntity],
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      introspection: true,
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),
    OtpModule,
    AuthModule,
    UsersModule,
    AdminsModule,
    LoanModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

