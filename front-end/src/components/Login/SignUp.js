import { Box, Button, Link, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAlert from "../../hooks/useAlert";
import api from "../../services/api";
import PasswordInput from "./PasswordInput";

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

function SignUp() {
  const { setMessage } = useAlert();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    if (
      !formData?.username ||
      !formData?.password ||
      !formData?.passwordConfirmation
    ) {
      setMessage({ type: "error", text: "All fields are mandatory!" });
      return;
    }

    const { username, password, passwordConfirmation } = formData;

    if (password !== passwordConfirmation) {
      setMessage({
        type: "error",
        text: "both the password and confirm password fields value must be matched!",
      });
      return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
      setMessage({
        type: "error",
        text: "password must contain upper and lower case letters and at least one number!",
      });
      return;
    }

    try {
      await api.signUp({ username, password });
      setMessage({ type: "success", text: "Successfully registered!" });
      navigate("/signin");
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
          placeholder="password"
          onChange={handleInputChange}
          value={formData.password}
        />
        <PasswordInput
          name="passwordConfirmation"
          sx={styles.input}
          placeholder="confirm password"
          onChange={handleInputChange}
          value={formData.passwordConfirmation}
        />
        <Box sx={styles.actionsContainer}>
          <Typography color={"#658354"}>
            Already have an account? <Link href="/signin" color={"#4b6043"}>Log in</Link>
          </Typography>
          <Button
            variant="contained"
            type="submit"
            sx={{ backgroundColor: "#7431F4" }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SignUp;
