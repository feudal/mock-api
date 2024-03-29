import { LoadingButton } from "@mui/lab";
import {
  Modal as MUIModal,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Button,
  CardActions,
  Divider,
} from "@mui/material";

const modal_style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  maxHeight: "80vh",
  overflow: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  title: React.ReactNode;
  actionLabel?: string;
  action: () => void;
  isLoading?: boolean;
  actionButtonProps?: any;
  modalStyles?: any;
  children: React.ReactNode;
}

export const Modal = ({
  open,
  handleClose,
  title,
  actionLabel = "Create",
  action,
  isLoading,
  modalStyles,
  actionButtonProps,
  children,
}: ModalProps) => {
  return (
    <MUIModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={{ ...modal_style, ...modalStyles }}>
        <CardHeader title={title} />

        <Divider />

        <CardContent sx={{ p: 1 }}>
          <Typography id="modal-modal-description">{children}</Typography>
        </CardContent>

        <Divider />

        <CardActions>
          <Button fullWidth variant="outlined" onClick={handleClose}>
            Close
          </Button>

          <LoadingButton
            {...actionButtonProps}
            fullWidth
            variant="contained"
            onClick={action}
            loading={isLoading}
          >
            {actionLabel}
          </LoadingButton>
        </CardActions>
      </Card>
    </MUIModal>
  );
};
