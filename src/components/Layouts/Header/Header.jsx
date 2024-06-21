import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Menu, MenuItem, Avatar, IconButton } from "@mui/material";
import { AccountCircle, Logout, ChatBubbleOutline } from "@mui/icons-material";
import { AiOutlineMessage } from "react-icons/ai";
import { useSelector } from "react-redux";
export const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const user = useSelector((state) => state?.user?.user?.currentUser);
  console.log("====================================");
  console.log(user);
  console.log("====================================");
  return (
    <header className="bg-gradient-to-r from-blue-500 to-gray-300 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 relative">
        <div className="md:text-2xl text-lg font-bold">
          <Link to="/" className="hover:text-blue-200 transition duration-300">
            Đề cương môn học
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <IconButton
            component={Link}
            to="/chat"
            className="text-white hover:text-gray-200 transition-colors duration-300"
          >
            <AiOutlineMessage size={32} />
          </IconButton>
          <div className="relative flex items-center gap-2">
            <button
              className="flex items-center gap-2 cursor-pointer  p-2 rounded-lg shadow-lg transition-all duration-300"
              onClick={handleProfileClick}
            >
              <Avatar
                src={user.avatar}
                alt="avatar-user"
                className="cursor-pointer transition-transform transform hover:scale-105"
              />
              <p className="transition-opacity hover:opacity-80 hidden md:block">
                {user.firstName} {user.lastName}
              </p>
            </button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileClose}
              sx={{
                mt: 1,
                "& .MuiMenu-paper": {
                  width: "200px",
                  backgroundColor: "#f8fafc",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                },
                "& .MuiMenu-list": {
                  padding: 0,
                },
              }}
            >
              <MenuItem
                onClick={handleProfileClose}
                component={Link}
                to="/profile"
                sx={{
                  "&:hover": {
                    backgroundColor: "#e2e8f0",
                  },
                  padding: "10px 20px",
                  transition: "background-color 0.2s ease-in-out",
                }}
              >
                <AccountCircle sx={{ mr: 1, color: "#3b82f6" }} />
                <Typography variant="inherit" className="text-gray-700">
                  Thông tin
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={handleProfileClose}
                sx={{
                  "&:hover": {
                    backgroundColor: "#e2e8f0",
                  },
                  padding: "10px 20px",
                  transition: "background-color 0.2s ease-in-out",
                }}
              >
                <Logout sx={{ mr: 1, color: "#ef4444" }} />
                <Typography variant="inherit" className="text-gray-700">
                  Đăng Xuất
                </Typography>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
