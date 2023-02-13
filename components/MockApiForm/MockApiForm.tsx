import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { MockApi } from "types";
import { MockApiContext } from "context";
import { getError, makeBEM } from "utils";
import { Button, Input, InterfaceInput } from "components";

const bem = makeBEM("mock-api-form");

export const MockApiForm = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { setNeedToUpdate } = useContext(MockApiContext);
  const router = useRouter();

  const createApi = (api: Partial<MockApi>) =>
    fetch(`/api/mock-api`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(api),
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
      })
      .then(() => {
        setNeedToUpdate(true);
        router.reload();
      })
      .catch((err) => toast.error(getError(err)));

  return (
    <div className={bem()}>
      <h2>Create new API</h2>

      <form
        className={bem("form")}
        onSubmit={handleSubmit((data) => createApi(data))}
      >
        <Input label="API name" name="name" register={register} required />

        <InterfaceInput register={register} setValue={setValue} />

        <Input
          label="How many objects to generate (max 100)"
          name="count"
          register={register}
          required
          type="number"
          min={1}
          max={100}
        />

        <Button type="submit">Create</Button>
      </form>
    </div>
  );
};
