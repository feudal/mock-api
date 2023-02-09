import classNames from "classnames";
import React, { PropsWithChildren } from "react";

import { Container } from "components";
import { makeBEM } from "utils";

/* eslint-disable-next-line */
export interface LayoutProps {
  fontClass: string;
}

const bem = makeBEM("layout");

export const Layout = ({
  fontClass,
  children,
  ...props
}: PropsWithChildren<LayoutProps>) => {
  return (
    <div className={classNames(fontClass, bem())} {...props}>
      <header className={bem("header")}>
        <Container>
          <h2>Mock-api</h2>
        </Container>
      </header>

      <main className={bem("main")}>
        <Container
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            height: "100%",
          }}
        >
          <aside className={bem("aside")}>aside</aside>

          <section className={bem("section")}>{children}</section>
        </Container>
      </main>

      <footer className={bem("footer")}>
        <Container>
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <a href="" target="_blank">
              Mock-api
            </a>{" "}
            - All rights reserved
          </p>
        </Container>
      </footer>
    </div>
  );
};
