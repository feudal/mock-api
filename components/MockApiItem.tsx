import { Button, CircularProgress, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import { MockApi } from "types";
import { MockApiData, MockApiInterface } from "components";
import { getError, makeBEM } from "utils";

const generateMockApi = (name: string, count: number) => {
  if (!name) return;

  fetch(`/api/mock-api/generate/${name}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ count }),
  })
    .then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      toast.success("Data for API generated");
    })
    .catch((err) => toast.error(getError(err)));
};

const bem = makeBEM("mock-api-item");

export const MockApiItem = () => {
  const { id } = useRouter().query;
  const [api, setApi] = useState<MockApi | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);

    fetch(`/api/mock-api/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data: MockApi) => {
        setApi(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
        toast.error(getError(err));
      });
  }, [id]);

  let dataState = null;
  if (isLoading) dataState = <CircularProgress />;
  if (isError) dataState = <p>Error</p>;

  return (
    <div className={bem()}>
      <h1 className={bem("title")}>Mock API - {api?.name}</h1>

      {dataState || (
        <>
          <MockApiInterface name={api?.name} fields={api?.fields} />

          {api?.data.length !== 0 ? (
            <MockApiData apiName={api?.name} data={api?.data} />
          ) : (
            <>
              <TextField
                // min={1}
                // max={100}
                {...register("count", { required: true })}
                label="How many objects to generate (max 100)"
                name="count"
                type="number"
              />

              <Button
                onClick={handleSubmit((data) => {
                  if (api?.name) {
                    generateMockApi(api.name, data.count);
                    router.reload();
                  }
                })}
              >
                Generate objects for api
              </Button>
            </>
          )}
        </>
      )}
    </div>
  );
};
