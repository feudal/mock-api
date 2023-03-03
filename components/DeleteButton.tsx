import { IconButton, Tooltip } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import React from "react";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";

interface DeleteButtonProps extends DefaultComponentProps<any> {
  title?: string;
  placement?: "top" | "bottom" | "left" | "right";
}
export const DeleteButton = ({
  title = "Delete",
  placement = "top",
  ...props
}: DeleteButtonProps) => {
  return (
    <IconButton {...props}>
      <Tooltip title={title} placement={placement}>
        <HighlightOffIcon color="error" />
      </Tooltip>
    </IconButton>
  );
};
