import React from "react";

import { makeBEM } from "utils";

/* eslint-disable-next-line */
export interface ContainerProps extends HTMLDivElement {
  children: HTMLCollection;
}

const bem = makeBEM("container");

export const Container = ({ children, ...props }: any) => {
  return (
    <div {...props} className={bem()}>
      {children}
    </div>
  );
};
