import { Grid, MenuItem, Select } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Field } from "types";

import { ProjectContext } from "context";
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
  const { interFaces } = useContext(ProjectContext);
  const interfacesOptions = interFaces?.map((interFace) => interFace.name);
  const [fakerOption, setFakerOption] = useState<string>(fakerOptionsKeys[3]);

  const [subOption, setSubOption] = useState<string>(
    fakerOption === "enum" ||
      fakerOption === "interface" ||
      fakerOption === "array-of-interface"
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
          value={fakerOption}
          onChange={(v) => {
            switch (v.target.value) {
              case "enum":
                setFakerOption("enum");
                setSubOption("");
                break;
              case "interface" || "array-of-interface":
                setFakerOption("interface");
                setSubOption(interfacesOptions?.[0] || "");
                break;
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
                  fakerOption === "enum" ||
                  fakerOption === "interface" ||
                  fakerOption === "array-of-interface"
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
        {fakerOption !== "enum" &&
          fakerOption !== "interface" &&
          fakerOption !== "array-of-interface" && (
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

        {(fakerOption === "interface" ||
          fakerOption === "array-of-interface") && (
          <Select
            fullWidth
            variant="outlined"
            size="small"
            required={required}
            value={subOption}
            onChange={(v) => setSubOption(v.target.value)}
          >
            {interfacesOptions?.map((subOption, idx) => (
              <MenuItem key={idx} value={subOption}>
                {subOption}
              </MenuItem>
            ))}
          </Select>
        )}
      </Grid>
    </>
  );
};
