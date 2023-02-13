import classNames from "classnames";
import React from "react";

import { makeBEM } from "utils";

export interface ButtonProps extends HTMLButtonElement {
  children: HTMLCollection;
  block?: boolean;
}

const bem = makeBEM("button");

export const Button = ({ children, block, ...props }: any) => {
  return (
    <button
      {...props}
      type={props.type || "button"}
      className={classNames(bem(null, { block }), props.className)}
    >
      {children}
    </button>
  );
};
