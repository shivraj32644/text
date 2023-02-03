import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode, useEffect } from 'react';
import 'swiper/css/bundle';
import '../../../libs/web/ui/src/styles.css';
import '../style.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from 'next/app';
import { cmsApiInstance } from '@corpcare/shared/api';
import { IFooter, IHeader } from '../types/global';
import { toast, Toaster, useToasterStore } from 'react-hot-toast';
import 'github-markdown-css';

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

type pageProps = {
  global: {
    footer: IFooter;
    header: IHeader;
  };
};
function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const { global } = pageProps as pageProps;
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
      <Toaster position="top-center" />
      <Head>
        <title>CorpCare | Website</title>
        <link rel="icon" type="image/png" href="/images/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.cdnfonts.com/css/proxima-nova-2"
          rel="stylesheet"
        />
      </Head>
      {getLayout(<Component {...pageProps} global={global} />)}
    </QueryClientProvider>
  );
}

CustomApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  try {
    const {
      data: {
        data: { attributes },
      },
    } = await cmsApiInstance.get<{
      data: {
        id: string;
        attributes: {
          footer: IFooter;
          header: IHeader;
        };
      };
    }>('/global?populate=deep,6');
    return {
      ...appProps,
      pageProps: {
        global: {
          ...attributes,
        },
      },
    };
  } catch (error) {
    return { ...appProps };
  }
};
export default CustomApp;
