import socket from "../../config/socket";
import { useContext, useRef, useState } from "react";
import { Box, Button, InputAdornment, Paper, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatArea from "./ChatMessages";
import UserContext from "../../context/UserContext";

const styles = {
  container: {
    position: "fixed",
    top: 0,
    bottom: 0,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: "10px",
    overflow: "hidden",
  },
  chatInput: { height: "45px", width: "100%" },
};

export default function Chat() {
  const inputRef = useRef();
  const [text, setText] = useState("");
  const { username, room } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("message", { room, username, text });

    setText("");
    inputRef.current.focus();
  }

  return (
    <Box sx={styles.container}>
      <ChatArea />
      <Paper elevation={0} component="form" onSubmit={handleSubmit}>
        <TextField
          required
          sx={styles.chatInput}
          placeholder={"Send a message on room " + room}
          value={text}
          ref={inputRef}
          onChange={(e) => setText(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="text"
                  color="primary"
                  size="small"
                  type="submit"
                >
                  <SendIcon />
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Paper>
    </Box>
  );
}
