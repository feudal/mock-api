import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import { MockApi } from "types";
import { Button, Input, Loader } from "components";
import { getError, pascalCase, makeBEM } from "utils";

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
  if (isLoading) dataState = <Loader />;
  if (isError) dataState = <p>Error</p>;

  return (
    <div className={bem()}>
      <h1 className={bem("title")}>Mock API - {api?.name}</h1>

      {dataState || (
        <>
          <pre className={bem("code")}>
            <h3>interface {pascalCase(api?.name)} &#123;</h3>
            <ul style={{ marginLeft: 20 }}>
              {api?.fields.map((field) => (
                <li key={field.name}>
                  {field.name}: {field.type.join("-")};
                </li>
              ))}
            </ul>
            <h3>&#125;</h3>
          </pre>

          <Input
            label="How many objects to generate (max 100)"
            name="count"
            register={register}
            required
            type="number"
            min={1}
            max={100}
          />

          <Button
            onClick={handleSubmit((data) => {
              api?.name && generateMockApi(api.name, data.count);
            })}
          >
            Generate objects for api
          </Button>
        </>
      )}
    </div>
  );
};
