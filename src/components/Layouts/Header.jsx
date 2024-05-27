import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Menu, MenuItem, Avatar, Button } from "@mui/material";
import { AccountCircle, Logout, Edit, LibraryBooks } from "@mui/icons-material";

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
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 relative">
        <div className="md:text-2xl text-lg font-bold">
          <Link to="/">Biên Soạn Đề Cương</Link>
        </div>
        <div className="flex items-center space-x-4">
          {user.role === "giangvien" && (
            <div className="hidden md:flex space-x-4">
              <Button
                component={Link}
                to="/create-syllabus"
                startIcon={<Edit />}
                className="text-white"
              >
                Soạn Đề Cương
              </Button>
              <Button
                component={Link}
                to="/manage-syllabus"
                startIcon={<LibraryBooks />}
                className="text-white"
              >
                Quản Lý Đề Cương
              </Button>
            </div>
          )}
          <div className="relative flex items-center gap-2">
            <button
              className="flex items-center gap-2 cursor-pointer bg-gradient-to-r from-blue-600 to-gray-800 p-2 rounded-lg shadow-lg hover:from-blue-700 hover:to-gray-900 transition-all md:mr-4"
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
              sx={{ mt: 1, "& .MuiMenu-paper": { width: "200px" } }} // Custom width
            >
              <MenuItem
                onClick={handleProfileClose}
                component={Link}
                to="/profile"
                className="hover:bg-gray-200 transition-colors"
              >
                <AccountCircle sx={{ mr: 1 }} />
                <Typography variant="inherit">Thông tin</Typography>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleProfileClose();
                }}
                className="hover:bg-gray-200 transition-colors"
              >
                <Logout sx={{ mr: 1 }} />
                <Typography variant="inherit">Đăng Xuất</Typography>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
