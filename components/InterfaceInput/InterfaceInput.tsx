import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

import { makeBEM } from "utils";

export interface InterfaceInputProps {
  register: UseFormRegister<FieldValues>;
}

const bem = makeBEM("interface-form");

export const InterfaceInput = ({ register }: InterfaceInputProps) => {
  return (
    <div className={bem()}>
      <h3>Interface</h3>
    </div>
  );
};
