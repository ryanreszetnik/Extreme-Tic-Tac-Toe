import { Box, Button, TextField } from "@mui/material";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonAuthPage from "./CommonAuthPage";

export default function SingUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const submit = async () => {
    await Auth.signUp({
      username: email,
      password: password,
      attributes: { name: name },
    });
    navigate("/confirmSignUp", { state: { email: email } });
  };
  return (
    <div>
      <CommonAuthPage
        title="Sign Up"
        onSubmit={submit}
        submitName="Sign Up"
        secondaryName="Sign In Instead"
        secondaryLink="/signin"
        secondaryLinks={[]}
        fields={[
          {
            label: "Name",
            onChange: (e) => setName(e),
            value: name,
            type: "text",
          },
          {
            label: "Email",
            onChange: (e) => setEmail(e),
            value: email,
            type: "email",
          },
          {
            label: "Password",
            onChange: (e) => setPassword(e),
            value: password,
            type: "password",
          },
        ]}
      />
    </div>
  );
}
