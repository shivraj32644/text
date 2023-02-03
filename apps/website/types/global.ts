import { CmsImage } from '@corpcare/shared/api';
import { ILink } from './shared';

export interface IFooter {
  footerLabel?: string;
  footerImage?: CmsImage;
  footerBottomLinks?: ILink[];
  footerColumns?: {
    title?: string;
    links?: ILink[];
  }[];
  socialNetworks?: {
    url?: string;
    socialImage?: CmsImage;
  }[];
}

export interface IHeader {
  authButton?: ILink[];
  companyLogo?: CmsImage;
  headerMenuList?: {
    heading?: string;
    headerMenuItem?: {
      subHeading?: string;
      links?: ILink[];
    }[];
  }[];
}
