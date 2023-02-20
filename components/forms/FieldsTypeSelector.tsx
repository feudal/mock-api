import { Grid, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Field } from "types";

import { fakerOptions, fakerOptionsKeys } from "utils";

export interface FieldsTypSelectorProps
  extends React.HTMLAttributes<HTMLSelectElement> {
  name: string;
  index: number;
  required?: boolean;
  setFields: React.Dispatch<React.SetStateAction<(Field | undefined)[]>>;
}

export const FieldsTypeSelector = ({
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
    <>
      <Grid item xs={6}>
        <Select
          // {...props}
          fullWidth
          variant="outlined"
          size="small"
          required={required}
          defaultValue={fakerOption}
          onChange={(v) => {
            setFakerOption(v.target.value);
            setSubOption(fakerOptions[v.target.value][0]);
          }}
        >
          {fakerOptionsKeys.map((fakerOption, idx) => (
            <MenuItem key={idx} value={fakerOption}>
              {fakerOption}
            </MenuItem>
          ))}
        </Select>
      </Grid>

      <Grid item xs={6}>
        <Select
          // {...props}
          fullWidth
          variant="outlined"
          size="small"
          required={required}
          value={subOption}
          onChange={(v) => setSubOption(v.target.value)}
        >
          {fakerOptions[fakerOption].map((subOption, idx) => (
            <MenuItem key={idx} value={subOption}>
              {subOption}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </>
  );
};
