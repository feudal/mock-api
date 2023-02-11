import { Input, Selector } from "components";
import { Button } from "components/Button";
import React, { useState } from "react";
import {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormUnregister,
} from "react-hook-form";
import { DeleteIcon } from "svg";

import { makeBEM } from "utils";

export interface InterfaceInputProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  unregister: UseFormUnregister<FieldValues>;
}

const bem = makeBEM("interface-form");

export const InterfaceInput = ({
  register,
  setValue,
  unregister,
}: InterfaceInputProps) => {
  const [fieldCount, setFieldCount] = useState(1);
  const [fields, setFields] = useState([{ id: 1 }]);
  register(`fieldType1`);

  const addField = () => {
    setFieldCount(fieldCount + 1);
    setFields([...fields, { id: fieldCount + 1 }]);
    register(`fieldName${fieldCount + 1}`);
  };

  const deleteField = (id: number) => {
    setFields(fields.filter((field) => field.id !== id));
    unregister(`fieldName${id}`);
    unregister(`fieldType${id}`);
  };

  return (
    <div className={bem()}>
      <h3 className={bem("title")}>Interface</h3>

      <Input
        register={register}
        name="interfaceName"
        label="Interface name"
        required
      />

      {fields.map((field) => (
        <div className={bem("group")} key={field.id}>
          <Input
            register={register}
            name={`fieldName${field.id}`}
            label={`Field name - ${field.id}`}
            required
          />

          {/* this is hidden input to register field type */}
          <input {...register(`fieldType${field.id}`)} hidden />
          <Selector
            name={`fieldType${field.id}`}
            setValue={setValue}
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
