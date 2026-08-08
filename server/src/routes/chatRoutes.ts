import { Router } from "express";
import Controllers from "../controllers";

const ChatRoutes = Router();

ChatRoutes.post("/groups", Controllers.ChatController.createChatGroup);

ChatRoutes.get("/groups", Controllers.ChatController.getUserGroups);

ChatRoutes.post(
  "/groups/:chatGroupId/send",
  Controllers.ChatController.sendMessage,
);

export default ChatRoutes;
