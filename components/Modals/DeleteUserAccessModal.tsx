import React from "react";
import { Modal } from ".";

interface DeleteUserAccessModalProps {
  userName: string;
  open: boolean;
  handleClose: () => void;
  action: () => void;
}

export const DeleteUserAccessModal = ({
  userName,
  open,
  handleClose,
  action,
}: DeleteUserAccessModalProps) => {
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="Delete user access"
      actionLabel="delete"
      actionButtonProps={{
        color: "error",
      }}
      action={action}
    >
      Are you sure you want to delete {userName} from the list?
    </Modal>
  );
};
