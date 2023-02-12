import React, { useEffect, useState } from "react";
import { Field } from "types";

import { fakerOptions, fakerOptionsKeys, makeBEM } from "utils";

export interface FieldsTypSelectorProps
  extends React.HTMLAttributes<HTMLSelectElement> {
  name: string;
  index: number;
  required?: boolean;
  setFields: React.Dispatch<React.SetStateAction<(Field | undefined)[]>>;
}

const bem = makeBEM("fields-type-selector");

export const FieldsTypSelector = ({
  name,
  index,
  setFields,
  required,
  ...props
}: FieldsTypSelectorProps) => {
  const [fakerOption, setFakerOption] = useState<string>(fakerOptionsKeys[0]);
  const [subOption, setSubOption] = useState<string>(
    fakerOptions[fakerOption][0]
  );

  useEffect(() => {
    setFields((prev) => {
      const newFields = [...prev];
      newFields[index]!.type = [fakerOption, subOption];
      return newFields;
    });
  }, [fakerOption, name, index, setFields, subOption]);

  return (
    <div className={bem()}>
      <h3 className={bem("title")}>Field type</h3>

      <div className={bem("wrapper")}>
        <select
          {...props}
          required={required}
          defaultValue={fakerOption}
          onChange={(v) => setFakerOption(v.target.value)}
        >
          {fakerOptionsKeys.map((fakerOption) => (
            <option key={fakerOption} value={fakerOption}>
              {fakerOption}
            </option>
          ))}
        </select>

        <select
          {...props}
          required={required}
          defaultValue={subOption}
          onChange={(v) => setSubOption(v.target.value)}
        >
          {fakerOptions[fakerOption].map((subOption) => (
            <option key={subOption} value={subOption}>
              {subOption}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
