import React from "react";
import { Modal } from ".";

interface DeleteProjectModalProps {
  projectName: string;
  open: boolean;
  handleClose: () => void;
  action: () => void;
}

export const DeleteProjectModal = ({
  projectName,
  open,
  handleClose,
  action,
}: DeleteProjectModalProps) => {
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="Delete project"
      actionLabel="delete"
      actionButtonProps={{
        color: "error",
      }}
      action={action}
    >
      Are you sure you want to delete the project <b>{projectName}</b>? <br />
      This action cannot be undone.
    </Modal>
  );
};
