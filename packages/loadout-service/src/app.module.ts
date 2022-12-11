import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { LoadoutsModule } from './modules';
import configuration from './config/configuration';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] }), LoadoutsModule],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
