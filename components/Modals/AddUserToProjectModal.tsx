import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import useSWR, { useSWRConfig } from "swr";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { AutoCompleteMultiSelector } from "components";
import { User } from "types";
import { Modal } from ".";

const addUsersToProject = async (projectId: string, emails: string[]) => {
  await axios
    .post(`/api/project/${projectId}/users`, { emails })
    .catch((err) => toast.error(err.response.data.error));
};

interface AddUserToProjectProps {
  open: boolean;
  handleClose: () => void;
}

export const AddUserToProject = ({
  open,
  handleClose,
}: AddUserToProjectProps) => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: users } = useSWR("/api/user", fetcher);

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="Add user to project"
      actionLabel="add"
      modalStyles={{
        width: "60vw",
      }}
      action={async () => {
        await handleSubmit((data) =>
          addUsersToProject(router.query.projectId as string, data.emails)
        )();
        mutate(`/api/project/${router.query.projectId}`);
        handleClose();
      }}
    >
      <AutoCompleteMultiSelector
        label="Emails"
        placeholder="Enter email"
        options={users?.data?.map((user: User) => user.email)}
        {...register("emails")}
      />
    </Modal>
  );
};
