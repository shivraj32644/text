import { QueryFunctionContext, useQuery } from 'react-query';
import { cmsApiInstance, CmsImage } from '../cms-content/common';
const BROWSE_HELP_AND_TOPICS = 'BROWSE_HELP_AND_TOPICS';
const HELP_AND_TOPICS_CONTENT = 'HELP_AND_TOPICS_CONTENT';
export interface IHelpingTopic {
  helpTopicHeading?: string;
  helpTopicFAQ?: {
    disclosureDescription?: string;
    disclosureHeading?: string;
  }[];
  helpTopicImage?: CmsImage;
}

export interface IHelpandTopics {
  heading?: string;
  slug: string;
  helpingTopic?: IHelpingTopic[];
}
export async function fetchBrowseHelpandTopicsComponent() {
  const {
    data: {
      data: { attributes },
    },
  } = await cmsApiInstance.get<{
    data: {
      attributes: {
        Blocks: {
          __component: 'block.browse-help-topics';
          help_topics?: {
            data?: {
              attributes?: IHelpandTopics;
            }[];
          };
        }[];
      };
    };
  }>(`/help-and-support?populate=deep,5`);
  const filteredData = attributes?.Blocks.filter(
    (item) => item?.__component === 'block.browse-help-topics'
  );
  return filteredData[0];
}

export function useGetFetchBrowseHelpandTopicsComponent() {
  return useQuery([BROWSE_HELP_AND_TOPICS], fetchBrowseHelpandTopicsComponent);
}

export async function fetchHelpandTopicsContent({
  queryKey,
}: QueryFunctionContext<[string, string | undefined]>) {
  const [, slug] = queryKey;
  const {
    data: { data },
  } = await cmsApiInstance.get<{
    data: {
      attributes: IHelpandTopics;
    }[];
  }>(`/help-topics?filters[slug]=${slug}&populate=deep,5`);
  return data[0]?.attributes;
}

export function useGetFetchHelpandTopicsContent(slug?: string | undefined) {
  return useQuery([HELP_AND_TOPICS_CONTENT, slug], fetchHelpandTopicsContent);
}
