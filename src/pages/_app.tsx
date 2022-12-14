// src/pages/_app.tsx
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import {ReactQueryDevtoolsPanel, ReactQueryDevtools} from "react-query/devtools"
import { withTRPC } from "@trpc/next";
import { SessionProvider } from "next-auth/react";
import superjson from "superjson";
import type { AppType } from "next/app";
import type { AppRouter } from "../server/router";
import type { Session } from "next-auth";
import "../styles/globals.css";
import BaseLayout from "../components/layout/BaseLayout";
import { useState } from "react";
import useKeypress from "../utils/useKeypress";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
    const [isDevtoolsOpen, setIsDevtoolsOpen] = useState(false)

    useKeypress({
        meta: {
            "d": () => setIsDevtoolsOpen(prev => !prev)
        }
    })

    return (
        <SessionProvider session={session}>
            <BaseLayout>
                <Component {...pageProps} />
            </BaseLayout>
        </SessionProvider>
    );
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      links: [
        // loggerLink({
        //     enabled: (opts) =>
        //         process.env.NODE_ENV === "development" ||
        //         (opts.direction === "down" && opts.result instanceof Error),
        // }),
        httpBatchLink({ 
            url,
            maxBatchSize: 5
        }),
      ],
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },

      // To use SSR properly you need to forward the client's headers to the server
      // headers: () => {
      //   if (ctx?.req) {
      //     const headers = ctx?.req?.headers;
      //     delete headers?.connection;
      //     return {
      //       ...headers,
      //       "x-ssr": "1",
      //     };
      //   }
      //   return {};
      // }
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
