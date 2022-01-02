import React, { useEffect, useState } from "react";
import Amplify, { Auth } from "aws-amplify";
import { awsConfig } from "../Constants/awsConstants";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SingIn from "./SingIn";
import SingUp from "./SingUp";
import ForgotPassword from "./ForgotPassword";
import ConfirmSignUp from "./ConfirmSignUp";
import { isUnionTypeNode } from "typescript";
import { useDispatch, useSelector } from "react-redux";
import { SET_AUTHENTICATED } from "../Constants/reducerEvents";
// import { Redirect } from "react-router";
Amplify.configure(awsConfig);
export default function Authentication({ ...props }) {
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useSelector((state) => state.user.authenticated);

  const dispatch = useDispatch();
  const updateUser = async () => {
    try {
      // const user = await Auth.currentAuthenticatedUser();
      const user = await Auth.currentUserInfo();
      if (user === null) {
        throw new Error("Not authenticated");
      }
      const usersession = await Auth.currentSession();
      dispatch({
        type: SET_AUTHENTICATED,
        payload: { authenticated: true, ...usersession, userData: user },
      });
    } catch (e) {
      dispatch({ type: SET_AUTHENTICATED, payload: { authenticated: false } });
    }
    setLoading(false);
  };
  useEffect(() => {
    updateUser();
  }, []);
  const signInPages = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SingIn />} />
          <Route path="/signup" element={<SingUp />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/confirmSignUp" element={<ConfirmSignUp />} />
          <Route path="/*" element={<Navigate to="/signin" />} />
        </Routes>
      </BrowserRouter>
    );
  };
  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && !isAuthenticated && signInPages()}
      {!loading && isAuthenticated && props.children}
    </div>
  );
}
