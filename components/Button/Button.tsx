import classNames from "classnames";
import React from "react";

import { makeBEM } from "utils";

/* eslint-disable-next-line */
export interface ButtonProps extends HTMLButtonElement {
  children: HTMLCollection;
}

const bem = makeBEM("button");

export const Button = ({ children, ...props }: any) => {
  return (
    <button {...props} className={classNames(bem(), props.className)}>
      {children}
    </button>
  );
};
