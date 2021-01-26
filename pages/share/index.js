import ShareFeedBack from "@/features/share/ShareFeedback";
import PageColumn from "@/common/PageColumn";
import { fetcher } from "@/lib/fetcher";

function ShareFeedBackPage({ users }) {
  return (
    <PageColumn size="md">
      <ShareFeedBack users={users} />
    </PageColumn>
  );
}

export async function getServerSideProps() {
  const users = await fetcher("users");
  if (users) {
    return { props: { users } };
  }
  //Ignore API errors on SSR
  return { props: { users: [] } };
}

export default ShareFeedBackPage;
