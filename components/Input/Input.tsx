import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

import { makeBEM } from "utils";

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<FieldValues>;
  name: string;
  label?: string;
  required?: boolean;
  type?: string;
  min?: number;
  max?: number;
}

const bem = makeBEM("input");

export const Input = ({ register, name, label, ...props }: InputProps) => {
  return (
    <div className={bem()}>
      <label htmlFor={name} className={bem("label")}>
        {label}
      </label>
      <input
        className={bem("input")}
        {...register(name, { required: props.required })}
        {...props}
      />
    </div>
  );
};
