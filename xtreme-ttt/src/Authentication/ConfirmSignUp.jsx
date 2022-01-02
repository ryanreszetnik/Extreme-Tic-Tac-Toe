import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CommonAuthPage from "./CommonAuthPage";

export default function ConfirmSignUp() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;
  const submit = async () => {
    await Auth.confirmSignUp(email, code);
    navigate("/signin");
  };
  return (
    <div>
      <CommonAuthPage
        title={`Confirm Email`}
        onSubmit={submit}
        submitName="Submit Code"
        secondaryLinks={[]}
        fields={[
          {
            label: "Code",
            onChange: (e) => setCode(e),
            value: code,
            type: "text",
          },
        ]}
      />
    </div>
  );
}
