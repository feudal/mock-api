import classNames from "classnames";
import { ToastContainer } from "react-toastify";
import React, { PropsWithChildren } from "react";
import Link from "next/link";
import { Stack } from "@mui/system";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { Container, UserCard } from "components";
import { makeBEM } from "utils";

import "react-toastify/dist/ReactToastify.min.css";

export interface LayoutProps {
  fontClass: string;
}

const bem = makeBEM("layout");

export const Layout = ({
  fontClass,
  children,
  ...props
}: PropsWithChildren<LayoutProps>) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated" && router.pathname !== "/login")
    router.push("/login");

  return (
    <>
      <div className={classNames(fontClass, bem())} {...props}>
        <header className={bem("header")}>
          <Container>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Link href="/">
                <h2>Mock-api</h2>
              </Link>

              <UserCard />
            </Stack>
          </Container>
        </header>

        <main className={bem("main")}>
          <Container style={{ height: "100%" }}>{children}</Container>
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
