import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Button, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

import { Field } from "types";
import { FieldsTypeSelector } from "components";
import { makeBEM } from "utils";

export interface InterfaceInputProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const bem = makeBEM("interface-form");

export const InterfaceInput = ({ register, setValue }: InterfaceInputProps) => {
  const [fields, setFields] = useState<(Field | undefined)[]>([
    { name: "", type: [] },
  ]);
  register("fields", { required: true });
  useEffect(() => setValue("fields", fields), [fields, setValue]);
  const addField = () => setFields([...fields, { name: "", type: [] }]);

  const deleteField = (id: number) => {
    const newFields = [...fields];
    newFields[id] = undefined;
    setFields(newFields);
  };

  return (
    <div className={bem()}>
      <h3 className={bem("title")}>Interface</h3>

      <p className={bem("info")}>
        Field name must contain only letters and underscores, and be unique
      </p>

      {fields.map((field, idx) => {
        if (field === undefined) return null;

        return (
          <div className={bem("group")} key={idx}>
            <TextField
              label={`Field name - ${idx + 1}`}
              // pattern="[a-zA-Z_]+"
              defaultValue={field?.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFields((prev) => {
                  const newFields = [...prev];
                  newFields[idx]!.name = e.target.value;
                  return newFields;
                })
              }
            />

            <FieldsTypeSelector
              index={idx}
              required
              name="fields"
              setFields={setFields}
            />

            <IconButton onClick={() => deleteField(idx)}>
              <HighlightOffIcon />
            </IconButton>
          </div>
        );
      })}

      <Button variant="contained" onClick={addField}>
        Add new field
      </Button>
    </div>
  );
};
