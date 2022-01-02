import { Button } from "@mui/material";
import { Auth } from "aws-amplify";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_AUTHENTICATED } from "../Constants/reducerEvents";
import Tab from "./Tab";
import "./header.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import Logo from "../Assets/icon.png";
import { Image } from "@mui/icons-material";

const pages = [{ name: "Home", link: "/" }];

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOut = async () => {
    handleClose();
    await Auth.signOut();
    dispatch({ type: SET_AUTHENTICATED, payload: { authenticated: false } });
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const username = useSelector(
    (state) => state.user.userData?.attributes?.name
  );
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const goToPage = (path) => {
    navigate(path);
    handleClose();
  };
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#333",
        height: "40px",
        display: "flex",
      }}
    >
      <img src={Logo} width="40" height="40" />
      {pages.map((p) => (
        <Tab name={p.name} link={p.link} key={p.link} />
      ))}
      <div
        style={{
          display: "inline-flex",
          flexGrow: 100,
          justifyContent: "flex-end",
          paddingRight: "10px",
        }}
      >
        <Button
          id="basic-button"
          variant="contained"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {username}
        </Button>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => goToPage("/profile")}>Profile</MenuItem>
        <MenuItem onClick={signOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
