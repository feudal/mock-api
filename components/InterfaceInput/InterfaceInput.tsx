import { Input, FieldsTypSelector } from "components";
import { Button } from "components/Button";
import React, { useEffect, useState } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { DeleteIcon } from "svg";
import { Field } from "types";

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

      {fields.map((field, idx) => {
        if (field === undefined) return null;

        return (
          <div className={bem("group")} key={idx}>
            <Input
              name="is-not-registered"
              required
              label={`Field name - ${idx + 1}`}
              defaultValue={field?.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFields((prev) => {
                  const newFields = [...prev];
                  newFields[idx]!.name = e.target.value;
                  return newFields;
                })
              }
            />

            <FieldsTypSelector
              index={idx}
              required
              name="fields"
              setFields={setFields}
            />

            <DeleteIcon onClick={() => deleteField(idx)} />
          </div>
        );
      })}

      <Button block onClick={addField}>
        Add new field
      </Button>
    </div>
  );
};
