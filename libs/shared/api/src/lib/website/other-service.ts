import { useQuery } from 'react-query';
import { Url } from 'url';
import { cmsApiInstance, CmsImage } from '../cms-content/common';

const OTHER_SERVICES_CONTENT = 'OTHER_SERVICES_CONTENT';

export async function fetchOtherServicesCardComponent() {
  const {
    data: {
      data: { attributes },
    },
  } = await cmsApiInstance.get<{
    data: {
      attributes: {
        Blocks: {
          __component: 'block.other-services';
          card?: {
            description?: string;
            heading?: string;
            image?: CmsImage;
            button?: {
              href?: Url;
              label?: string;
              target?: string;
              isExternal?: boolean;
              theme?: 'primary' | 'secondary';
              linkImage?: CmsImage;
            };
          }[];
        }[];
      };
    };
  }>(`/other-services?populate=deep,5`);
  const filteredData = attributes?.Blocks.filter(
    (item) => item?.__component === 'block.other-services'
  );
  return filteredData[0];
}

export function useGetFetchOtherServicesComponent() {
  return useQuery([OTHER_SERVICES_CONTENT], fetchOtherServicesCardComponent);
}
