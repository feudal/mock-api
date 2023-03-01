import { Grid, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Field } from "types";

import { fakerOptions, fakerOptionsKeys } from "utils";
import { ChipsInput } from ".";

export interface FieldsTypSelectorProps {
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
}: FieldsTypSelectorProps) => {
  const [fakerOption, setFakerOption] = useState<string>(fakerOptionsKeys[2]);
  const [subOption, setSubOption] = useState<string>(
    fakerOption === "enum" || fakerOption === "interface"
      ? ""
      : fakerOptions[fakerOption][0]
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
      <Grid item xs={4}>
        <Select
          fullWidth
          variant="outlined"
          size="small"
          required={required}
          defaultValue={fakerOption}
          onChange={(v) => {
            switch (v.target.value) {
              case "enum":
                setFakerOption("enum");
                setSubOption("");
                return;
              case "interface":
                setFakerOption("interface");
                setSubOption("");
                return;
              default:
                setFakerOption(v.target.value);
                setSubOption(fakerOptions[v.target.value][0]);
            }
          }}
        >
          {fakerOptionsKeys.map((fakerOption, idx) => (
            <MenuItem
              key={idx}
              value={fakerOption}
              sx={{
                color:
                  fakerOption === "enum" || fakerOption === "interface"
                    ? "primary.main"
                    : "text.primary",
              }}
            >
              {fakerOption}
            </MenuItem>
          ))}
        </Select>
      </Grid>

      <Grid item xs={8}>
        {fakerOption !== "enum" && fakerOption !== "interface" && (
          <Select
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
        )}

        {fakerOption === "enum" && (
          <ChipsInput
            label="Enum choices"
            placeholder="Enter choices"
            onChange={(values) => setSubOption(values.join(" | "))}
          />
        )}

        {fakerOption === "interface" && <div>Interface</div>}
      </Grid>
    </>
  );
};
