import React, { useEffect, useState } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";

import { fakerOptions, fakerOptionsKeys, makeBEM } from "utils";

export interface SelectorProps extends React.HTMLAttributes<HTMLSelectElement> {
  name: string;
  setValue: UseFormSetValue<FieldValues>;
  required?: boolean;
}

const bem = makeBEM("selector");

export const Selector = ({
  name,
  setValue,
  required,
  ...props
}: SelectorProps) => {
  const [fakerOption, setFakerOption] = useState<string>(fakerOptionsKeys[0]);
  const [subOption, setSubOption] = useState<string>(
    fakerOptions[fakerOption][0]
  );

  useEffect(
    () => setValue(name, [fakerOption, subOption]),
    [fakerOption, name, setValue, subOption]
  );

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
