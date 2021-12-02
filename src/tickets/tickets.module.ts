import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TicketsService } from './service/tickets.service';
import { Tickets, TicketsSchema } from './schemas/ticket.schema';
import { TicketsController } from './controller/ticket.controller';
import { TicketsBoughtList, TicketsBoughtListSchema } from "./schemas/ticketBoughtList.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tickets.name, schema: TicketsSchema, collection: 'tickets' },
      { name: TicketsBoughtList.name, schema: TicketsBoughtListSchema, collection: 'ticketsBoughtList' },
    ]),
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
