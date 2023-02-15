import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

import { makeBEM } from "utils";

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  name: string;
  register?: UseFormRegister<FieldValues>;
  label?: string;
  required?: boolean;
  type?: string;
  min?: number;
  max?: number;
  pattern?: string;
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
        {...(register && register(name, { required: props.required }))}
        {...props}
      />
    </div>
  );
};
