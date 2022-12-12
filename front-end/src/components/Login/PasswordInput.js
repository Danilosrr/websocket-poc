import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";

function PasswordInput({ name, sx, label, value, placeholder, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  function handleIconClick() {
    setShowPassword(!showPassword);
  }

  return (
    <FormControl sx={sx} variant="filled">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <OutlinedInput
        id={name}
        name={name}
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle visibility"
              onClick={handleIconClick}
              onMouseDown={handleIconClick}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
    </FormControl>
  );
}

export default PasswordInput;
