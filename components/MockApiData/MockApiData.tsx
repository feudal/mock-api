import { makeBEM } from "utils";

export interface MockApiDataProps {
  data?: Object[];
}

const bem = makeBEM("mock-api-data");

export const MockApiData = ({ data }: MockApiDataProps) => {
  return (
    <div className={bem()}>
      <h2 className={bem("title")}>Data</h2>

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
