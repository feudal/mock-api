import { CustomHead, MockApiForm, MockApiList } from "components";

export default function Home() {
  return (
    <>
      <CustomHead title="Mocks API" />

      <MockApiList />
      <MockApiForm />
    </>
  );
}
