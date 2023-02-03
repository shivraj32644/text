import { cmsApiInstance } from '@corpcare/shared/api';

import ErrorPage from 'next/error';
import { Layout } from '../components/blocks/Layout';
import BlockManager from '../components/shared/BlockManager';
import { useRouter } from 'next/router';

export function Index({ pageData, global }) {
  const router = useRouter();
  if (router?.isFallback) {
    <div className="flex items-center justify-center h-screen flex-col gap-2">
      <img className="max-h-14" src="/corpcare-logo-black.png" alt="" />
      <h1 className="text-center text-base lg:text-lg">Loading ....</h1>
    </div>;
  }
  if (pageData === null) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout global={global} seo={pageData?.seo}>
      {pageData?.Blocks?.length !== 0 && (
        <BlockManager blocks={pageData?.Blocks} />
      )}
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const { data } = await cmsApiInstance.get<{
      data: {
        apiID: string;
        schema: {
          kind: 'singleType';
          attributes: {
            Blocks: {
              type: 'dynamiczone';
            };
          };
        };
      }[];
    }>('content-type-builder/content-types', {
      params: {
        populate: {
          schema: {
            populate: ['*', 'Blocks'],
          },
        },
      },
    });

    const paths = data?.data
      ?.filter(
        (item) =>
          item?.schema?.kind === 'singleType' &&
          item?.schema?.attributes?.Blocks?.type === 'dynamiczone'
      )
      ?.map((item) => ({
        params: { slug: [item?.apiID] },
      }));
    return {
      paths: paths,
      fallback: 'blocking', // See the "fallback" section below
    };
  } catch (error) {
    return { paths: [{ params: { slug: [] } }], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  try {
    const {
      data: {
        data: { attributes },
      },
    } = await cmsApiInstance.get(
      `${
        params.slug
          ? `${params.slug[0]}?populate=deep,5`
          : '/home-page?populate=deep,5'
      }`
    );

    return {
      props: {
        pageData: {
          ...attributes,
        },
      },
      revalidate: 10, // In seconds
    };
  } catch (error) {
    return {
      props: { pageData: null },
    };
  }
}

export default Index;
