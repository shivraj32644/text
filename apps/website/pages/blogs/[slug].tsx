/* eslint-disable react/no-children-prop */
import { cmsApiInstance, normalizeCmsImage } from '@corpcare/shared/api';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import {
  CalendarBrandIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from '@corpcare/web/ui';
import { Layout } from '../../components/blocks/Layout';
import BlockManager from '../../components/shared/BlockManager';
import gfm from 'remark-gfm';
import { Fragment } from 'react';
import { IFooter, IHeader } from '../..//types/global';
import { IArticlesCard } from '../..//types/shared';
import { Url } from 'url';
import Link from 'next/link';
import { useRouter } from 'next/router';
import remarkGfm from 'remark-gfm';

const Article = ({
  global,
  pageData,
  blocks,
}: {
  global: {
    header: IHeader;
    footer: IFooter;
  };
  pageData?: IArticlesCard;
  blocks?: any;
}) => {
  const icon = normalizeCmsImage(pageData?.category?.data?.attributes?.image);
  const image = normalizeCmsImage(pageData?.Image);
  const router = useRouter();
  if (router?.isFallback) {
    <div className="flex items-center justify-center h-screen flex-col gap-2">
      <img className="max-h-14" src="/corpcare-logo-black.png" alt="" />
      <h1 className="text-center text-base lg:text-lg">Loading ....</h1>
    </div>;
  }
  return (
    <Layout global={global}>
      <div className="container mx-auto flex lg:flex-row flex-col lg:gap-[90px] py-10 lg:py-[80px] lg:px-10 px-5">
        <div className="flex-col gap-6 items-center lg:flex hidden">
          {pageData?.social?.map((_social, index) => {
            const type = _social?.socialNetwork || '';
            return (
              <Fragment key={type + index}>
                {type === 'Facebook' && (
                  <Link href={_social?.url as Url} passHref>
                    <a target="_blank" rel="noopener noreferrer">
                      <FacebookIcon className="w-8 h-8 flex-shrink-0  cursor-pointer" />
                    </a>
                  </Link>
                )}
                {type === 'Twitter' && (
                  <Link href={_social?.url as Url} passHref>
                    <a target="_blank" rel="noopener noreferrer">
                      <TwitterIcon className="w-8 h-8 flex-shrink-0  cursor-pointer" />
                    </a>
                  </Link>
                )}
                {type === 'Linkedin' && (
                  <Link href={_social?.url as Url} passHref>
                    <a target="_blank" rel="noopener noreferrer">
                      <LinkedinIcon className="w-8 h-8 flex-shrink-0  cursor-pointer" />
                    </a>
                  </Link>
                )}
              </Fragment>
            );
          })}
        </div>
        <div className="flex flex-col">
          <h1 className="text-[#191919] font-medium text-xl lg:text-4xl tracking-[0.02em]">
            {pageData?.title}
          </h1>
          <div className="flex items-center gap-5 pt-4 mb-8 lg:mb-10">
            <div className="flex items-center gap-[6px]">
              <img
                src={icon?.url}
                alt={icon?.alternativeText}
                className="h-5 w-5"
              />
              <p className="text-lightGray tracking-[0.02em] text-base font-normal">
                {pageData?.category?.data?.attributes?.title}
              </p>
            </div>
            <div className="flex items-center gap-[6px]">
              <CalendarBrandIcon className="w-5 h-5 text-brand" />
              <div
                suppressHydrationWarning
                className="text-lighterGray tracking-[0.02em] font-normal text-base"
              >
                {new Date(pageData?.publishAt as string).toLocaleDateString(
                  undefined,
                  {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                  }
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-5 items-center pt-4 mb-5 lg:hidden">
            {pageData?.social?.map((_social, index) => {
              const type = _social?.socialNetwork || '';
              return (
                <Fragment key={type + index}>
                  {type === 'Facebook' && (
                    <Link href={_social?.url as Url} passHref>
                      <a target="_blank" rel="noopener noreferrer">
                        <FacebookIcon className="w-6 h-6 flex-shrink-0  cursor-pointer" />
                      </a>
                    </Link>
                  )}
                  {type === 'Twitter' && (
                    <Link href={_social?.url as Url} passHref>
                      <a target="_blank" rel="noopener noreferrer">
                        <TwitterIcon className="w-6 h-6 flex-shrink-0  cursor-pointer" />
                      </a>
                    </Link>
                  )}
                  {type === 'Linkedin' && (
                    <Link href={_social?.url as Url} passHref>
                      <a target="_blank" rel="noopener noreferrer">
                        <LinkedinIcon className="w-6 h-6 flex-shrink-0  cursor-pointer" />
                      </a>
                    </Link>
                  )}
                </Fragment>
              );
            })}
          </div>
          <section className="flex flex-col bg-white border rounded-lg border-brandLight p-5 lg:p-10 ">
            <img
              src={image?.url}
              alt={image?.alternativeText}
              className="h-40 lg:h-[450px] object-cover w-auto self-center mb-6 lg:mb-8"
            />
            <div className="markdown-body !bg-white">
              <ReactMarkdown
                className="text-base lg:text-lg font-medium tracking-[0.02em] text-lightGray"
                children={pageData?.content as string}
                remarkPlugins={[remarkGfm]}
                linkTarget="_blank"
              />
            </div>
          </section>
        </div>
      </div>
      {blocks?.Blocks?.length !== 0 && <BlockManager blocks={blocks?.Blocks} />}
    </Layout>
  );
};
//

export async function getStaticPaths() {
  try {
    const { data } = await cmsApiInstance.get<{
      data: any;
    }>('/articles', {});

    const paths = data?.data?.map((item) => {
      return {
        params: { slug: item?.attributes?.slug },
      };
    });
    return {
      paths: paths,
      fallback: 'blocking', // See the "fallback" section below
    };
  } catch (error) {
    return { paths: [{ params: { slug: '' } }], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  try {
    const {
      data: { data },
    } = await cmsApiInstance.get(
      `/articles?filters[slug]=${slug}&populate=deep,5`
    );
    return {
      props: {
        pageData: data[0]?.attributes,
        blocks: {
          ...data[0]?.attributes?.blocks,
          Blocks: data[0]?.attributes?.Blocks.map((item) => {
            return {
              ...item,
            };
          }),
        },
      },
      revalidate: 10, // In seconds
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/blogs',
        permanent: false,
      },
    };
  }
}
export default Article;
