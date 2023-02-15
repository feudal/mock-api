import classNames from "classnames";
import React from "react";

import { makeBEM } from "utils";

export interface ButtonProps extends HTMLButtonElement {
  children: HTMLCollection;
  block?: boolean;
  color?: string;
}

const bem = makeBEM("button");

export const Button = ({
  children,
  color = "primary",
  block,
  ...props
}: any) => {
  return (
    <button
      {...props}
      type={props.type || "button"}
      className={classNames(bem(null, [color], { block }), props.className)}
    >
      {children}
    </button>
  );
};
