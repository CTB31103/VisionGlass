import {
  getModelForClass,
  index,
  ModelOptions,
  Prop,
  PropType,
} from "@typegoose/typegoose";
import { IChatMessage } from "../interfaces";
import { Log } from "../utils";

@ModelOptions({
  schemaOptions: {
    collection: "ChatMessages",
  },
})
@index({ chatMessageId: 1 }, { unique: true })
export class ChatMessage implements IChatMessage {
  @Prop({ type: String })
  chatMessageId: string;
  @Prop({ type: String })
  chatGroupId: string;
  @Prop({ type: String })
  fromUserId: string;
  @Prop({ type: Number })
  sentOn: number;
  @Prop({ type: String })
  message: string;
  @Prop({ type: String })
  attachmentGroupId: string;

  constructor(props: IChatMessage) {
    this.chatMessageId = props.chatMessageId;
    this.chatGroupId = props.chatGroupId;
    this.fromUserId = props.fromUserId;
    this.sentOn = props.sentOn;
    this.message = props.message;
    this.attachmentGroupId = props.attachmentGroupId;
  }

  toChatMessage() {
    return new ChatMessage(this);
  }

  toString() {
    return Log.json(this);
  }
}

export const ChatMessageModel = getModelForClass(ChatMessage);

/**
 *
 *  Wanted to run google ads - needed website
 *
 *  Dave - people search keyword "safelite"/"glassmotive" auto glass points to daves number
 *        https://bestnewyorkautoglass.com/buffalo-auto-glass-repair
 *
 *  Visionglass Lockport NY
 *
 *  also have a location in Attica
 *  Service anywhere hundred miles within lockport - all western and central new york
 *
 *  Set prices for windshields given on Omega
 *  Given vin make and model
 *  Output availabilty distributer and price take lowest price
 *  Add 300 output of omega
 *
 *  Premium - 50 for rain repllent
 *
 *  Basic - add 50 for wiper blades
 *
 *  Essentials -
 *
 *
 *  Avg for cash is around 3-400
 *  Windshields as low as 299
 *
 *  Techs email a picture of vin or report
 *  Change to green
 *
 *  Have a section of the fairs that customers can find us at maybe in the contact page
 *
 * */
