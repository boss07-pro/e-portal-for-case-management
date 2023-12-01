import { useState } from "react";
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

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme);
  const navigate = useNavigate();
  return (
    <MenuItem
      active={selected === title}
      onClick={() => navigate(to)}
      icon={icon}
    >
      <Typography variant="h5">{title}</Typography>
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[500]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 25px 5px 20px !important",
          fontSize: "20px",
        },
        "& .pro-inner-item:hover": {
          color: "#0096FF !important",
        },
        "& .pro-menu-item.active": {
          color: "#0096FF !important",
        },
       
       
      }}
      borderRight="0.2px solid"
      
    >
      {/* Start */}
      <ProSidebar collapsed={isCollapsed}>
        {/* Menu icon  */}
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlined /> : undefined}
            style={{
              margin: "10px 0 20px 0",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="50px"
              >
                <Typography variant="h3" sx={{ color: colors.black[100] }}>
                  ADMINS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlined />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {/* USER */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={MyImage}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0", color: colors.black[100] }}
                >
                  Mark Zuck Zuck
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  CEO
                </Typography>
              </Box>
            </Box>
          )}

          {/* MENU ITEMS */}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/judge/"
              icon={
                <DashboardCustomizeOutlined
                  sx={{ color: colors.blueAccent[100] }}
                />
              }
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              sx={{ m: "15px 0 0 25px", color: colors.redAccent[500] }}
            >
              DATA
            </Typography>
            <Item
              title="Cause List"
              to="/judge/Causelist"
              icon={
                <PeopleOutlinedIcon sx={{ color: colors.blueAccent[100] }} />
              }
              onClick={<Causelist />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/judge/Calendar"
              icon={
                <CalendarTodayOutlinedIcon
                  sx={{ color: colors.blueAccent[100] }}
                />
              }
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              sx={{ m: "15px 0 0 25px", color: colors.redAccent[500] }}
            >
              INFO
            </Typography>
            <Item
              title="Judges"
              to="/judge/judges"
              icon={
                <PeopleOutlinedIcon sx={{ color: colors.blueAccent[100] }} />
              }
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Lawyers"
              to="/judge/lawyers"
              icon={
                <PeopleOutlinedIcon sx={{ color: colors.blueAccent[100] }} />
              }
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Parties"
              to="/judge/parties"
              icon={
                <PeopleOutlinedIcon sx={{ color: colors.blueAccent[100] }} />
              }
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              sx={{ m: "15px 0 0 25px", color: colors.redAccent[500] }}
            >
              STATS
            </Typography>
            <Item
              title="Line"
              to="/judge/Line"
              icon={
                <PeopleOutlinedIcon sx={{ color: colors.blueAccent[100] }} />
              }
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Settings"
              to="/judge/Settings"
              icon={<SettingsOutlined sx={{ color: colors.blueAccent[100] }} />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
