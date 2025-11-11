import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, DatabaseModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
