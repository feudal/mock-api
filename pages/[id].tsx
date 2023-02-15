import { useRouter } from "next/router";
import { CustomHead, MockApiItem, MockApiList } from "components";

export default function Home() {
  const { id } = useRouter().query;

  return (
    <>
      <CustomHead title={`Mock API - ${id}`} />

      <aside>
        <MockApiList />
      </aside>
      <MockApiItem />
    </>
  );
}
