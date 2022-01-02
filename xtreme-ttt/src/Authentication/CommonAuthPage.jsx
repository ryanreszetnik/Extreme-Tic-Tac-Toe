import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CommonAuthPage({
  fields,
  title,
  onSubmit,
  submitName,
  secondaryName = null,
  secondaryLink,
  secondaryLinks,
}) {
  const getTextField = (props) => {
    return (
      <div style={{ display: "flex", paddingTop: "10px" }}>
        <Box
          component="div"
          sx={{
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <TextField
            variant="outlined"
            label={props.label}
            type={props.type}
            style={{ width: "250px" }}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
          />
        </Box>
      </div>
    );
  };
  const getLink = (l) => {};

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          width: "400px",
          borderStyle: "solid",
          alignItems: "center",
          paddingBottom: "45px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>{title}</h1>
        {fields.map((f) => getTextField(f))}
        <Box
          sx={{
            display: "flex",
            marginLeft: "auto",
            marginRight: "auto",
            width: "250px",
            paddingTop: "10px",
          }}
        >
          <div>{secondaryLinks.map((l) => getLink(l))}</div>
          {secondaryName != null && (
            <div style={{ marginTop: "auto", marginBottom: "auto" }}>
              <Link
                to={secondaryLink}
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
              >
                {secondaryName}
              </Link>
            </div>
          )}
          <div
            style={{
              backgroundColor: "blue",
              marginLeft: "auto",
              marginRight: "0",
            }}
          >
            <Button variant="contained" onClick={() => onSubmit()}>
              {submitName}
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
}
