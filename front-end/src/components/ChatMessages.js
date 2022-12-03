import { Avatar, Box, List, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import socket from "../config/socket";
import UserContext from "../context/UserContext";
import useEventSubscription from "../hooks/useMessages";
import { string_to_color } from "../utils/utils";

export default function ChatArea() {
  const { username, room } = useContext(UserContext);
  const [messages, setMessages] = useState([]);

  const styles = {
    chatBox: {
      height: "calc(100% - 75px)",
      width: "100%",
      padding: "10px",
      overflowY: "scroll",
    },
    selfMessage: { display: "flex", justifyContent: "flex-end" },
    message: { display: "flex" },
  };

  useEffect(() => {
    socket.emit(
      "select_room",
      {
        username,
        room,
      },
      (response) => {
        setMessages(response);
        console.log(messages);
      }
    );
    // eslint-disable-next-line
  }, []);

  socket.on("message", (data) => {});

  const addMessage = (...newMessage) =>
    setMessages((messages) => [...messages, ...newMessage]);
  useEventSubscription("message", addMessage);

  return (
    <List sx={styles.chatBox}>
      {messages.map((message, i) => {
        const date = new Date(message.createdAt.toString());
        return (
          <Box
            sx={
              message.username === username
                ? styles.selfMessage
                : styles.message
            }
          >
            {message.username === username ? (
              <></>
            ) : (
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  bgcolor: string_to_color(message.username, 45),
                  marginRight: "10px",
                  fontSize: "12px",
                }}
              >
                {message.username[0]}
              </Avatar>
            )}
            <Paper
              sx={{ margin: "10px 0", width: "fit-content", padding: "0 10px" }}
            >
              <Typography key={i} variant="body2" display="block">
                {message.text}
              </Typography>
              <Typography
                variant="caption"
                sx={{ float: "right", color: "#606060" }}
              >
                {`${date.getHours().toLocaleString("en-Us", {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}:${date.getMinutes()}`}
              </Typography>
            </Paper>
          </Box>
        );
      })}
    </List>
  );
}
