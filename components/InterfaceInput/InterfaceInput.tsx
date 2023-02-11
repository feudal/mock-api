import { Input } from "components";
import { Button } from "components/Button";
import React, { useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { DeleteIcon } from "svg";

import { makeBEM } from "utils";

export interface InterfaceInputProps {
  register: UseFormRegister<FieldValues>;
}

const bem = makeBEM("interface-form");

export const InterfaceInput = ({ register }: InterfaceInputProps) => {
  const [fieldCount, setFieldCount] = useState(1);
  const [fields, setFields] = useState([{ id: 1 }]);

  const addField = () => {
    setFieldCount(fieldCount + 1);
    setFields([...fields, { id: fieldCount + 1 }]);
  };

  const deleteField = (id: number) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  return (
    <div className={bem()}>
      <h3 className={bem("title")}>Interface</h3>

      <Input
        register={register}
        name="interfaceName"
        label="Interface Name"
        required
      />

      {fields.map((field) => (
        <div className={bem("group")} key={field.id}>
          <Input
            register={register}
            name={`fieldName${field.id}`}
            label={`Field ${field.id} Name`}
            required
          />
          <Input
            register={register}
            name={`fieldType${field.id}`}
            label="Field Type"
            required
          />
          <DeleteIcon onClick={() => deleteField(field.id)} />
        </div>
      ))}

      <Button block onClick={addField}>
        Add new field
      </Button>
    </div>
  );
};
