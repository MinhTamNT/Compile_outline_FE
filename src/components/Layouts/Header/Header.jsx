import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Menu, MenuItem, Avatar, IconButton } from "@mui/material";
import { AccountCircle, Logout, ChatBubbleOutline } from "@mui/icons-material";
import { AiOutlineMessage } from "react-icons/ai";
export const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const user = {
    avatarUser:
      "https://scontent.fsgn8-4.fna.fbcdn.net/v/t1.6435-9/47262838_2138678889505178_8494951695191638016_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=HM54JaB5WLIQ7kNvgFWw27A&_nc_ht=scontent.fsgn8-4.fna&oh=00_AYATUeqOQ5-34JKnN1f4svJ057EJQgSTqpng13XOGILekA&oe=667BE682",
    firstName: "Dương Hữu",
    lastName: "Thành",
    role: "giangvien",
  };

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
                src={user.avatarUser}
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
