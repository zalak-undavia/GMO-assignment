import { useState } from "react";
import { Alert, Button, TextField } from "@mui/material";
import { SHOW_MESSAGE_QUERY_STRING, USER_INPUT_KEY } from "../../constants";

import "./UserInput.css";
import { useNavigate, useSearchParams } from "react-router-dom";

function UserInput(): React.ReactElement {
  const [username, setUsername] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const showMessage = searchParams.get(SHOW_MESSAGE_QUERY_STRING);

  const onSubmit = (e: any) => {
    e.preventDefault();
    const user = { username, phoneNumber, email };
    localStorage.setItem(USER_INPUT_KEY, JSON.stringify(user));

    navigate("/main-page");
  };

  return (
    <div className="user-input-container">
      <form onSubmit={onSubmit}>
        {showMessage && (
          <Alert severity="error" className="alert-container">
            Please enter your details before proceeding
          </Alert>
        )}
        <div>
          <TextField
            type="text"
            label="Username"
            variant="outlined"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
        </div>
        <div>
          <TextField
            label="PhoneNumber"
            variant="outlined"
            type="tel"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label="email"
            variant="outlined"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="btn-container">
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UserInput;
