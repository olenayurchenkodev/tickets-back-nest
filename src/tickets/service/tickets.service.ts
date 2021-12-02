import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import * as Stripe from "stripe";

import { InjectModel } from "@nestjs/mongoose";

import { Tickets, TicketsDocument } from "../schemas/ticket.schema";
import {
  TicketsBoughtList,
  TicketsBoughtListDocument,
} from "../schemas/ticketBoughtList.schema";
import { SK } from "../../config";


@Injectable()
export class TicketsService {
  // @ts-ignore
  private stripe: Stripe = new Stripe(SK, {
    apiVersion: '2020-08-27'
  });

  constructor(
    @InjectModel(Tickets.name)
    private ticketsModel: Model<TicketsDocument>,
    @InjectModel(TicketsBoughtList.name)
    private ticketsBoughtListModel: Model<TicketsBoughtListDocument>
  ) {  }

  getTicketsList(): Promise<any> {
    const ticketsList = this.ticketsModel.find().exec();
    return ticketsList;
  }

  getBoughtTicketsList(): Promise<any> {
    const ticketsBoughtList = this.ticketsBoughtListModel.find().exec();
    return ticketsBoughtList;
  }

  buyTicket(token: string, amount: number, id: string): Promise<any> {

    return new Promise<any>((resolve, reject) => {
      this.stripe.charges.create({
          amount: amount,
          currency: "USD",
          description: "Ticket payment",
          source: token
        }, (err, charge) => {
          if (err) {
            resolve({ success: false, status: err.raw.message });
          } else {
            this.ticketsBoughtListModel.create({ token, price: amount, date: new Date().getTime(), id: id });
            resolve({ success: true, status: "Payment Successful" });
          }
        });
    });
  }
}
