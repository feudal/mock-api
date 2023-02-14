import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { Button } from "components";
import { getError, makeBEM } from "utils";

export interface MockApiDataProps {
  data?: Object[];
  apiName?: string;
}

const bem = makeBEM("mock-api-data");

export const MockApiData = ({ data, apiName }: MockApiDataProps) => {
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

  return (
    <div className={bem()}>
      <h2 className={bem("title")}>Data</h2>

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
