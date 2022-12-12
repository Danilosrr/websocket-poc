import { Box, Button, Link, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../Login/PasswordInput";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";
import useAlert from "../../hooks/useAlert";

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "55px",
  },
  container: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  input: {
    marginBottom: "16px",
    padding: "0 10px",
    backgroundColor: "#ffffff",
    backgroundClip: "content-box",
  },
  actionsContainer: {
    display: "flex",
    padding: "0 10px",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

function SignIn() {
  const { signIn } = useAuth();
  const { setMessage, message } = useAlert();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    if (!formData?.username || !formData?.password) {
      setMessage({ type: "error", text: "All fields are mandatory!" });
      return;
    }

    const { username, password } = formData;

    try {
      const {
        data: { token },
      } = await api.signIn({ username, password });
      signIn(token);
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMessage({
          type: "error",
          text: error.response.data,
        });
        return;
      }
      setMessage({
        type: "error",
        text: "Error, try again later!",
      });
    }
  }

  return (
    <Box sx={styles.form} component="form" onSubmit={handleSubmit}>
      <Box sx={styles.container}>
        <Box sx={{ height: "50px" }} />
        <TextField
          name="username"
          sx={styles.input}
          placeholder="username"
          type="text"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.username}
        />
        <PasswordInput
          name="password"
          sx={styles.input}
          onChange={handleInputChange}
          value={formData.password}
        />
        <Box sx={styles.actionsContainer}>
          <Typography color={"#658354"}>
            Dont have an account? <Link href="/signup" color={"#4b6043"}>Sign up </Link>
          </Typography>

          <Button
            variant="contained"
            type="submit"
            sx={{ backgroundColor: "#658354" }}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SignIn;
