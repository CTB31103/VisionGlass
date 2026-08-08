import mongoose from "mongoose";
import { Log } from "./log";

export type SessionFunctionParams = {
  session: mongoose.mongo.ClientSession;
  commit: () => Promise<void>;
  abort: () => Promise<void>;
};

type SessionFunction =
  | ((params: SessionFunctionParams) => void)
  | ((params: SessionFunctionParams) => Promise<void>);

export const SessionController = async (callback: SessionFunction) => {
  const session = await mongoose.startSession();

  const commit = async () => {
    if (!session.inTransaction()) return;
    await session.commitTransaction();
    if (session.hasEnded) return;
    await session.endSession();
  };

  const abort = async () => {
    if (!session.inTransaction()) return;
    await session.abortTransaction();
    await session.endSession();
  };

  try {
    session.startTransaction();

    await callback({
      session,
      commit,
      abort,
    });

    await commit();
  } catch (err) {
    await abort();
  }
};
