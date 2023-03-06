import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";

import { Modal } from ".";
import { Interface } from "types";
import { capitalize } from "utils";

const editInterface = async (
  url: string,
  { arg: { name, projectId } }: { arg: { name: string; projectId: string } }
) => await axios.patch(url, { name, projectId });

interface EditInterfaceModalProps {
  open: boolean;
  handleClose: () => void;
  interFace: Partial<Interface>;
}

export const EditInterfaceModal = ({
  open,
  handleClose,
  interFace,
}: EditInterfaceModalProps) => {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const { trigger, isMutating } = useSWRMutation(
    `/api/interface/${interFace._id}`,
    editInterface,
    {
      onSuccess: async () => {
        await mutate(`/api/project/${router.query.projectId}`);
        handleClose();
        reset();
      },
    }
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={
        <>
          Edit <b>&quot;{capitalize(interFace?.name)}&quot;</b> Interface
        </>
      }
      actionLabel="edit"
      modalStyles={{ width: 600 }}
      action={() =>
        handleSubmit((data) =>
          trigger({
            name: data.name,
            projectId: router.query.projectId as string,
          })
        )()
      }
      isLoading={isMutating}
    >
      <TextField
        required
        label="New Interface name"
        placeholder="Enter new Interface name"
        fullWidth
        variant="outlined"
        size="small"
        {...register("name")}
      />
    </Modal>
  );
};
