import classNames from "classnames";
import { ToastContainer } from "react-toastify";
import React, { PropsWithChildren } from "react";

import { Container, MockApiList } from "components";
import { makeBEM } from "utils";

import "react-toastify/dist/ReactToastify.min.css";
import Link from "next/link";

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
    <>
      <div className={classNames(fontClass, bem())} {...props}>
        <header className={bem("header")}>
          <Container>
            <Link href="/">
              <h2>Mock-api</h2>
            </Link>
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
            <aside className={bem("aside")}>
              <MockApiList />
            </aside>

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

      <ToastContainer position="top-right" limit={1} />
    </>
  );
};
