import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Button, Loader } from "components";
import { MockApi } from "types";
import { getError, makeBEM } from "utils";
import { DeleteIcon } from "svg";

const bem = makeBEM("mock-api-list");

export const MockApiList = () => {
  const [apis, setApis] = useState<{ data: MockApi[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);

    fetch("/api/mock-api")
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        setApis(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
        toast.error(getError(err));
      });
  }, []);

  const deleteApi = (id: string) =>
    fetch(`/api/mock-api/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        setApis(data);
        router.push("/");
      })
      .catch((err) => toast.error(getError(err)));

  return (
    <div className={bem()}>
      <h2 className={bem("title")}>API list</h2>

      {isLoading && <Loader />}
      {isError && <p>Error</p>}
      {apis?.data?.length === 0 && <p>No APIs</p>}

      <ul className={bem("list")}>
        {apis?.data?.map((api) => (
          <li key={api._id} className={bem("item")}>
            <Link
              href={`/${api._id}`}
              className={bem("link", { active: router.query.id === api._id })}
            >
              /{api.name}
            </Link>

            <DeleteIcon onClick={() => deleteApi(api._id)} />
          </li>
        ))}
      </ul>

      {router.asPath === "/" || (
        <Button block>
          <Link href="/">Create new API</Link>
        </Button>
      )}
    </div>
  );
};
