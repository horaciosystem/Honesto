import { useRouter } from "next/router"
import { ToastContainer, toast } from "react-toastify"
import Layout from "@/common/layout/Layout"
import { QueryClient, QueryClientProvider } from "react-query"
import { Hydrate } from "react-query/hydration"

// eslint-disable-next-line @theorem/no-imports-down
import "react-toastify/dist/ReactToastify.css"
import "@/globals.css"

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  queryClient.setDefaultOptions({
    queries: {
      onError(error) {
        toast.error(<ErrorNotification router={router} />)
      },
    },
  })

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
      <ToastContainer
        position="top-center"
        autoClose={false}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        limit={1}
      />
    </>
  )
}

function ErrorNotification({ router }) {
  return (
    <div role="alert">
      Something went wrong!
      <p>
        Please{" "}
        <a className="font-bold underline" onClick={() => router.reload()}>
          try again
        </a>
      </p>
    </div>
  )
}

export default MyApp
