import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactElement, ReactNode, useEffect } from 'react';
import 'swiper/css/bundle';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../libs/web/ui/src/styles.css';
import { SidebarProvider } from '../components/useGlobalSideBarContext';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  const TOAST_LIMIT = 3;
  const { toasts } = useToasterStore();
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) removal without animation
  }, [toasts]);
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <Toaster position="top-center" />
        <Head>
          <title>CorpCare | Admin</title>
          <link rel="icon" type="image/png" href="/favicon.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        {getLayout(<Component {...pageProps} />)}
      </SidebarProvider>
    </QueryClientProvider>
  );
}

export default CustomApp;
