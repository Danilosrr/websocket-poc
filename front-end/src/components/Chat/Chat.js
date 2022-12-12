import socket from "../../config/socket";
import { useRef, useState } from "react";
import { Box, Button, InputAdornment, Paper, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatArea from "./ChatMessages";
import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";

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
  logout: {
    position: "fixed",
    fontSize: '20px',
    top: "1px",
    left: "1px",
    color: "rgba(255, 0, 0, 0.5)",
  },
};

export default function Chat() {
  const navigate = useNavigate();
  const { token, signOut } = useAuth();
  const { username, room } = useUser();
  const inputRef = useRef();
  const [text, setText] = useState("");

  if (!token) {
    return <Navigate to={"/signin"} replace />;
  }

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("message", { room, username, text });

    setText("");
    inputRef.current.focus();
  }

  function handleSignOut() {
    signOut();
    navigate("/signin");
  }

  return (
    <Box sx={styles.container}>
      <ChatArea />
      <Paper elevation={0} component="form" onSubmit={handleSubmit}>
        <TextField
          required
          sx={styles.chatInput}
          placeholder={"Message to " + room}
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
      <LogoutIcon sx={styles.logout} onClick={handleSignOut}/>
    </Box>
  );
}
