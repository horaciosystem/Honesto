import { QueryClient, useQuery } from "react-query"
import { dehydrate } from "react-query/hydration"
import ShareFeedBack from "@/features/share/ShareFeedback"
import PageColumn from "@/common/PageColumn"
import { fetcher } from "@/lib/fetcher"

function ShareFeedBackPage() {
  return (
    <PageColumn size="md">
      <ShareFeedBack />
    </PageColumn>
  )
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()
  try {
    await queryClient.prefetchQuery("users", fetcher)
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    }
  } catch {
    //Ignore API errors on SSR
  }
}

export default ShareFeedBackPage
