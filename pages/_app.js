import { useRouter } from "next/router";
import { ErrorBoundary } from "react-error-boundary";
import { SWRConfig } from "swr";
import { ToastContainer, toast } from "react-toastify";
import Layout from "@/common/layout/Layout";
import "@/globals.css";
// eslint-disable-next-line @theorem/no-imports-down
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <ErrorBoundary onError={<ErrorNotification router={router} />}>
        <SWRConfig
          value={{
            onError: (error, key) => {
              if (error.status !== 403 && error.status !== 404) {
                toast.error(<ErrorNotification router={router} />);
              }
            },
          }}
        >
          <Layout>
            <Component {...pageProps} />;
          </Layout>
        </SWRConfig>
      </ErrorBoundary>
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
  );
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
  );
}

export default MyApp;
