import { Router } from "express";
import Controllers from "../controllers";

export const ChatRoutes = Router();

ChatRoutes.post("/groups", Controllers.ChatController.createChatGroup);

ChatRoutes.get("/groups", Controllers.ChatController.getUserGroups);

ChatRoutes.post(
  "/groups/:chatGroupId/send",
  Controllers.ChatController.sendMessage,
);
