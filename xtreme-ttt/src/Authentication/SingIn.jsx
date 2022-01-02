import { Box, Button, TextField } from "@mui/material";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommonAuthPage from "./CommonAuthPage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_AUTHENTICATED } from "../Constants/reducerEvents";

export default function SingIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = async () => {
    console.log("submit");
    try {
      await Auth.signIn(email, password);
      const usersession = await Auth.currentSession();
      const user = await Auth.currentUserInfo();
      dispatch({
        type: SET_AUTHENTICATED,
        payload: { authenticated: true, ...usersession, userData: user },
      });
      console.log(usersession);
      navigate("/");

      console.log("success");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <CommonAuthPage
        title="Sign In"
        onSubmit={submit}
        submitName="Sign In"
        secondaryName="Create Account"
        secondaryLink="/signup"
        secondaryLinks={[
          { to: "/signup", name: "Create Account" },
          { to: "/signup", name: "Create Account" },
        ]}
        fields={[
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
