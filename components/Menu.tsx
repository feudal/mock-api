import { IconButton, Menu as MUIMenu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface MenuProps {
  children: React.ReactNode;
}

export const Menu = ({ children }: MenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <IconButton aria-label="more" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>

      <MUIMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              onClick: (e) => {
                handleClose();
                child?.props?.onClick?.(e);
              },
            } as React.HTMLAttributes<HTMLElement>);
          }
          return child;
        })}
      </MUIMenu>
    </div>
  );
};

Menu.Item = MenuItem;
