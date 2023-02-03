/* eslint-disable react/no-children-prop */

import {
  cmsApiInstance,
  CmsImage,
  normalizeCmsImage,
} from '@corpcare/shared/api';
import { Layout } from '../../components/blocks/Layout';
import { ChevronCircleArrowIcon } from '@corpcare/web/ui';
import classNames from 'classnames';
import { IHelpTopics } from '../../types/block';
import { Tab } from '@headlessui/react';
import { useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { IFooter, IHeader } from '../../types/global';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

function FaqItem({ question, answer }: { question?: string; answer?: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="py-4 px-5 border-b last:border-b-0">
      <p
        className="flex group lg:p-2 cursor-pointer text-lightGray  hover:text-brand transition lg:gap-48 items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="flex-grow text-sm lg:text-lg">{question}</span>
        <span
          className={classNames(
            'px-2 rounded-full  transition-transform',
            isExpanded ? '-rotate-180' : ''
          )}
        >
          <ChevronCircleArrowIcon className="lg:w-6 lg:h-6 w-5 h-5" />
        </span>
      </p>

      {isExpanded && (
        <div className="markdown-body !bg-white">
          <ReactMarkdown
            className="px-2 pt-2 text-sm lg:text-base text-lightGray"
            children={answer as string}
            remarkPlugins={[remarkGfm]}
            linkTarget="_blank"
          />
        </div>
      )}
    </div>
  );
}

export function HelpTopicFAQ({
  data,
}: {
  data?: {
    helpTopicHeading?: string;
    helpTopicFAQ?: {
      disclosureDescription?: string;
      disclosureHeading?: string;
    }[];
    helpTopicImage?: CmsImage;
  };
}) {
  return (
    <>
      <h3 className="flex-grow font-medium text-lg lg:text-xl text-lightGray mb-3 lg:!leading-[30px] tracking-[0.02em]">
        {data?.helpTopicHeading}
      </h3>

      <div className="border rounded-lg bg-white">
        {data?.helpTopicFAQ?.map((item) => (
          <FaqItem
            question={item?.disclosureHeading}
            answer={item?.disclosureHeading}
            key={item?.disclosureHeading}
          />
        ))}
      </div>
    </>
  );
}

const HelpandSupportPage = ({
  global,
  pageData,
  blocks,
}: {
  global: {
    header: IHeader;
    footer: IFooter;
  };
  pageData?: IHelpTopics;
  blocks?: any;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter() as NextRouter;
  if (router?.isFallback) {
    <div className="flex items-center justify-center h-screen flex-col gap-2">
      <img className="max-h-14" src="/corpcare-logo-black.png" alt="" />
      <h1 className="text-center text-base lg:text-lg">Loading ....</h1>
    </div>;
  }
  return (
    <Layout global={global}>
      <div className="p-5 lg:p-10 container mx-auto">
        <div
          className="flex items-center gap-5 cursor-pointer"
          onClick={() => router.push('/help-and-support')}
        >
          <svg
            className="w-6 h-6 lg:w-8 lg:h-8 auto flex-shrink-0"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 1C13.0333 1 10.1332 1.87973 7.66646 3.52796C5.19972 5.17618 3.27713 7.51886 2.14181 10.2597C1.0065 13.0006 0.709449 16.0166 1.28823 18.9264C1.86701 21.8361 3.29562 24.5088 5.39341 26.6066C7.4912 28.7044 10.1639 30.133 13.0737 30.7118C15.9834 31.2906 18.9994 30.9935 21.7403 29.8582C24.4812 28.7229 26.8238 26.8003 28.4721 24.3336C30.1203 21.8668 31 18.9667 31 16C30.9955 12.0231 29.4137 8.21044 26.6017 5.39837C23.7896 2.5863 19.9769 1.0045 16 1ZM18.707 21.293C18.8025 21.3852 18.8787 21.4956 18.9311 21.6176C18.9835 21.7396 19.0111 21.8708 19.0123 22.0036C19.0134 22.1364 18.9881 22.2681 18.9378 22.391C18.8876 22.5138 18.8133 22.6255 18.7194 22.7194C18.6255 22.8133 18.5139 22.8875 18.391 22.9378C18.2681 22.9881 18.1364 23.0134 18.0036 23.0123C17.8708 23.0111 17.7396 22.9835 17.6176 22.9311C17.4956 22.8787 17.3853 22.8025 17.293 22.707L11.293 16.707C11.1055 16.5195 11.0002 16.2652 11.0002 16C11.0002 15.7348 11.1055 15.4805 11.293 15.293L17.293 9.293C17.4816 9.11084 17.7342 9.01005 17.9964 9.01233C18.2586 9.0146 18.5094 9.11977 18.6948 9.30518C18.8802 9.49059 18.9854 9.7414 18.9877 10.0036C18.99 10.2658 18.8892 10.5184 18.707 10.707L13.414 16L18.707 21.293Z"
              fill="#C5A265"
            />
          </svg>
          <p className="font-medium text-[#191919] tracking-[0.02em] text-xl !leading-[30px] hover:text-brand">
            Back
          </p>
        </div>
        <div className="flex lg:flex-row flex-col overflow-y-auto gap-11 items-center lg:items-start mt-10">
          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <Tab.List className="bg-white border rounded-lg min-w-[250px] w-full sm:w-[284px] flex-col flex">
              {pageData?.helpingTopic?.map((topic, index) => {
                const helpTopicImage = normalizeCmsImage(topic?.helpTopicImage);
                return (
                  <Tab
                    key={topic?.helpTopicHeading}
                    className={classNames(
                      selectedIndex === index
                        ? 'text-brand hover:text-brandDark'
                        : 'text-lightGray hover:text-darkGray',
                      'group flex items-center tracking-[0.02em] text-sm lg:text-base font-medium py-4 lg:py-5 px-4 lg:px-[30px] w-full',
                      index + 1 !== pageData?.helpingTopic?.length && 'border-b'
                    )}
                    style={{
                      textAlign: 'start',
                    }}
                  >
                    <img
                      className={classNames('mr-3 flex-shrink-0 h-6 w-6')}
                      src={helpTopicImage?.url}
                      alt={helpTopicImage?.alternativeText}
                    />
                    {topic?.helpTopicHeading}
                  </Tab>
                );
              })}
            </Tab.List>
            <Tab.Panels className="w-full">
              {pageData?.helpingTopic?.map((topic, index) => {
                return (
                  <Tab.Panel key={index}>
                    <HelpTopicFAQ data={topic} />
                  </Tab.Panel>
                );
              })}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
      {/* {blocks?.Blocks?.length !== 0 && <BlockManager blocks={blocks?.Blocks} />} */}
    </Layout>
  );
};
//

export async function getStaticPaths() {
  try {
    const { data } = await cmsApiInstance.get<{
      data: any;
    }>('/help-topics', {});

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
      `/help-topics?filters[slug]=${slug}&populate=deep,5`
    );
    return {
      props: {
        pageData: data[0]?.attributes,
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/help-and-support',
        permanent: false,
      },
    };
  }
}
export default HelpandSupportPage;
