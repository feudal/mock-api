import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { Button } from "components";
import { getError, makeBEM } from "utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface MockApiDataProps {
  data?: Object[];
  apiName?: string;
}

const bem = makeBEM("mock-api-data");

export const MockApiData = ({ data, apiName }: MockApiDataProps) => {
  const [locationOrigin, setLocationOrigin] = useState<string>("");
  const router = useRouter();

  const deleteData = (name?: string) => {
    if (!name) return;

    fetch(`/api/data/${name}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(() => router.reload())
      .catch((err) => toast.error(getError(err)));
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    setLocationOrigin(window.location.origin);
  }, []);

  return (
    <div className={bem()}>
      <h2 className={bem("title")}>Data is available at </h2>

      <Link
        className={bem("link")}
        href={`${locationOrigin}/api/data/${apiName}`}
      >
        {locationOrigin}/api/data/{apiName}
      </Link>

      <Button onClick={() => deleteData(apiName)}>Delete all data</Button>

      <ul className={bem("list")}>
        {data?.map((item, idx) => (
          <li key={idx}>
            {idx === 0 && <span>data = </span>}
            <span>&#123;</span>
            {Object.entries(item).map(([key, value]) => (
              <p key={key} className={bem("item")}>
                {key}: {value}
              </p>
            ))}
            <span>&#125;,</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
