import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";

import { AutoCompleteMultiSelector } from "components";
import { User } from "types";
import { Modal } from ".";

const addUsersToProject = async (
  url: string,
  { arg: emails }: { arg: string[] }
) => await axios.post(url, { emails });

interface AddUserToProjectProps {
  open: boolean;
  handleClose: () => void;
  users: User[];
}

export const AddUserToProject = ({
  open,
  handleClose,
  users,
}: AddUserToProjectProps) => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const { trigger, isMutating } = useSWRMutation(
    `/api/project/${router.query.projectId}/users`,
    addUsersToProject,
    {
      onSuccess: async () => {
        await mutate(
          `/api/project/${router.query.projectId}?populateFields=true`
        );
        handleClose();
      },
    }
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="Add user to project"
      actionLabel="add"
      modalStyles={{ width: 600 }}
      action={() => handleSubmit((data) => trigger(data.emails))()}
      isLoading={isMutating}
    >
      <AutoCompleteMultiSelector
        multiple
        label="Emails"
        placeholder="Enter email"
        options={users?.map((user: User) => user.email)}
        {...register("emails")}
      />
    </Modal>
  );
};
