import { useLocation } from "react-router-dom";
import { useContext, useState , useEffect} from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import MyImage from "../../assets/user.png";
import { tokens } from "../../themes";
import DashboardCustomizeOutlined from "@mui/icons-material/DashboardCustomizeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlined from "@mui/icons-material/MenuOutlined";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import Causelist from "../Causelist/causelist";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";
import { RoleContext } from "../../hooks/RoleContext";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme);
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        marginTop: "10px",
        marginLeft: "25px",
        marginBottom: "2px",
      }}
    >
      <a onClick={() => navigate(to)} style={{ cursor: "pointer" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}></div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6">{title}</Typography>
          </div>
        </div>
      </a>
    </div>
  );
};

const Sidebar = () => {
  const [name, setName] = useState("");
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.name) {
    setName(location.state.name);
    }
  }, [location]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <div
      className="main"
      style={{
        display: "flex",
        height: "100vh",
        position: "fixed",
        width: "20vh",
        flexDirection: "column",
      }}
    >
      <div className="inner-items">
        <Typography
          variant="h3"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          {name}
        </Typography>
        <div
          className="image"
          style={{
            display: "flex",
            marginTop: "20px",
            justifyContent: "center",
          }}
        >
          <img
            alt="profile-user"
            width="100px"
            height="100px"
            src={MyImage}
            style={{ cursor: "pointer", borderRadius: "50%" }}
          />
        </div>
        <div className="menu-items">
          <div
            className="inner-menu-items"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div className="items">
              <Typography
                variant="h7"
                color={colors.black[100]}
                marginLeft="20px"
              >
                Info
              </Typography>
              <Item
                title="Dashboard"
                to="/judge"
                icon={DashboardCustomizeOutlined}
              />
              <Item title="Cases" to="/judge/cases" />
              <Item title="Calendar" to="/judge/calendar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
