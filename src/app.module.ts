import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketsModule } from "./tickets/tickets.module";

const uri =
  'mongodb+srv://olenayurchenkodev:222333@cluster0.odlic.mongodb.net/TicketsDB?retryWrites=true&w=majority';

@Module({
  imports: [MongooseModule.forRoot(uri), TicketsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
