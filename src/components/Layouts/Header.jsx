import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Menu, MenuItem, Avatar } from "@mui/material";
import { AccountCircle, Settings, Logout } from "@mui/icons-material";

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  


  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 relative">
        <div className="md:text-2xl text-lg font-bold">
          <Link to="/">Biên Soạn Đề Cương</Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative flex items-center gap-2">
            <Avatar
              src="https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/326403390_1522209771635250_7604274983211479574_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=2Bc8s9nqRjEQ7kNvgHWenrP&_nc_ht=scontent.fsgn8-3.fna&oh=00_AYAsLx173PJ2OzpgGvGS1001vYeb8RMN4_lHGnEYSZnjkw&oe=6659204A"
              alt="avatar-user"
              className="cursor-pointer"
              onClick={handleProfileClick}
            />
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
              >
                <AccountCircle sx={{ mr: 1 }} />
                <Typography variant="inherit">Thông tin</Typography>
              </MenuItem>
              <MenuItem
                onClick={handleProfileClose}
                component={Link}
                to="/settings"
              >
                <Settings sx={{ mr: 1 }} />
                <Typography variant="inherit">Cài Đặt</Typography>
              </MenuItem>
            </Menu>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Logout />}
              onClick={() => alert("Logged out")}
              sx={{ ml: 2, padding: 1 }}
            >
              <Typography variant="caption" style={{ fontSize: "12px" }}>
                Đăng Xuất
              </Typography>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
