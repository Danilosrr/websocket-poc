import { Avatar, Box, List, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import socket from "../../config/socket";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import api from "../../services/api";
import { socketApi } from "../../services/socketApi";
import { string_to_color } from "../../utils/utils";

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

export default function ChatArea() {
  const { token } = useAuth();
  const { username, setUsername, room } = useUser();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function loadPage() {
      if (!token) return;

      const { data } = await api.connectChat(token);
      setUsername(data.username);

      await socketApi.connectRoom({ username, room }, setMessages);
    }

    loadPage();
    // eslint-disable-next-line
  }, []);

  socket.on("message", (data) => {});

  const addMessage = (...newMessage) =>
    setMessages((messages) => [...messages, ...newMessage]);
  socketApi.useEventSubscription("message", addMessage);

  return (
    <List sx={styles.chatBox}>
      {messages.map((message, i) => {
        const date = new Date(message.createdAt.toString());
        return (
          <Box
            key={i}
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
              <Typography key={i} variant="body2" style={{ display: "block", wordBreak:"break-word" }}>
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
