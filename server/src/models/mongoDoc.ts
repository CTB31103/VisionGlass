import {
  BeAnObject,
  IObjectWithTypegooseFunction,
} from "@typegoose/typegoose/lib/types";
import {
  Document,
  DefaultIdVirtual,
  DefaultSchemaOptions,
  Types,
} from "mongoose";

export type MongoDoc<T> = Document<
  unknown,
  BeAnObject,
  T,
  DefaultIdVirtual,
  DefaultSchemaOptions
> &
  Omit<
    T & {
      _id: Types.ObjectId;
    } & {
      __v: number;
    },
    "id" | "typegooseName"
  > &
  DefaultIdVirtual &
  IObjectWithTypegooseFunction & {
    id: string;
  };
