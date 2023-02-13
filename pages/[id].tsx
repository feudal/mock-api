import { useRouter } from "next/router";
import { CustomHead, MockApiItem } from "components";

export default function Home() {
  const { id } = useRouter().query;

  return (
    <>
      <CustomHead title={`Mock API - ${id}`} />

      <MockApiItem />
    </>
  );
}
