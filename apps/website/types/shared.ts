import { CmsImage } from '@corpcare/shared/api';
import { Url } from 'url';

export interface ILink {
  href?: Url;
  label?: string;
  target?: string;
  isExternal?: boolean;
  theme?: 'primary' | 'secondary';
  linkImage?: CmsImage;
}

export interface IArticlesCard {
  Image?: CmsImage;
  buttonText?: string;
  category?: {
    data?: {
      attributes?: {
        title?: string;
        image?: CmsImage;
      };
    };
  };
  content?: string;
  publishAt?: string;
  slug?: string;
  social?: {
    socialNetwork?: string;
    url?: Url;
  }[];
  title?: string;
}

export interface IInsightCard {
  image?: CmsImage;
  category?: {
    data?: {
      attributes?: {
        title?: string;
        image?: CmsImage;
      };
    };
  };
  slug?: string;
  content?: string;
  social?: {
    socialNetwork?: string;
    url?: Url;
  }[];
  title?: string;
  createdAt?: string;
}

export interface IForm {
  button?: ILink;
  inputs?: {
    label?: string;
    name?: string;
    placeholder?: string;
    type?: 'text' | 'tel' | 'textarea';
    validations?: {
      type?: string;
      params?: string[];
    }[];
    validationType?: 'string';
  }[];
  slug?: string;
  title?: string;
}

export interface ITestimony {
  authorDesignation?: string;
  authorImage?: CmsImage;
  authorName?: string;
  comment?: string;
  rating?: number;
}

export interface ICard {
  cardHeading?: string;
  cardDescription?: string;
  cardImage?: CmsImage;
  cardContent?: string;
}

export interface ISubHeadingInParts {
  text?: string;
  color?: 'black' | 'white' | 'brand' | 'brandLight';
}

export interface IMiscellaneousFigure {
  alignment?:
    | 'Top-Left'
    | 'Top-Right'
    | 'Bottom-Left'
    | 'Bottom-Right'
    | 'Center-Left'
    | 'Center-Right';
  figure?: CmsImage;
}
