import { CmsImage, Image } from '@corpcare/shared/api';
import {
  ICard,
  IForm,
  IInsightCard,
  ILink,
  IMiscellaneousFigure,
  ISubHeadingInParts,
  ITestimony,
} from './shared';

export interface IThankYou {
  title?: string;
  backgroundImage?: CmsImage;
  description?: string;
  button?: ILink;
}
export interface IOurPartners {
  Heading?: string;
  PartnerImages?: {
    data?: Image[];
  };
  SubHeading?: string;
  Theme?: 'Main Page Background' | 'White';
  miscellaneousFigure?: IMiscellaneousFigure[];
}
export interface IHero {
  Button?: {
    theme?: 'primary' | 'secondary';
    link?: ILink;
  };
  Content?: string;
  backgroundImage?: CmsImage;
}
export interface IOurClients {
  Clients?: ITestimony[];
  Heading?: string;
  subHeading?: string;
  miscellaneousFigure?: IMiscellaneousFigure[];
}

export interface IProductFeatures {
  productCard?: ICard[];
  heading?: string;
  subHeadingParts?: ISubHeadingInParts[];
  miscellaneousFigure?: IMiscellaneousFigure[];
}

export interface IWhyCorpcareIsDifferent {
  backgroundImage?: CmsImage;
  whyCorpcareCard?: ICard[];
  heading?: string;
  subHeading?: string;
}
export interface IProductPanel {
  buttonTheme?: 'primary' | 'secondary';
  productButton?: ILink;
  productFeatures?: string;
  tabPanelCardHeading?: string;
  tabPanelHeading?: string;
  tabPanelImage?: CmsImage;
}
export interface IOurProducts {
  productPanel?: IProductPanel[];
  heading?: string;
  subHeadingInParts?: ISubHeadingInParts[];
  miscellaneousFigure?: IMiscellaneousFigure[];
}

export interface ICta {
  backgroundImage?: CmsImage;
  button?: ILink;
  buttonTheme?: 'primary' | 'secondary';
  content?: string;
}
export interface ICorpcareTeam {
  headingParts?: ISubHeadingInParts[];
  subHeadingParts?: ISubHeadingInParts[];
  teamCard?: ICard[];
  miscellaneousFigure?: IMiscellaneousFigure[];
}

export interface IFAQ {
  heading?: string;
  subHeading?: string;
  disclosure?: {
    disclosureHeading?: string;
    disclosureDescription?: string;
  }[];
  miscellaneousFigure?: IMiscellaneousFigure[];
  theme?: 'white' | 'gray';
}
export interface IServiceCard {
  heading?: string;
  subheading?: string;
  backgroundImage?: CmsImage;
  href?: string;
}

export interface IServicesWeOffer {
  services?: IServiceCard[];
  heading?: string;
  subHeadingParts?: ISubHeadingInParts[];
  miscellaneousFigure?: IMiscellaneousFigure[];
}

export interface IColTabs {
  heading?: string;
  subHeading?: string;
  tabs?: {
    panelDescription?: string;
    panelHeading?: string;
    panelIcon?: CmsImage;
    panelImage?: CmsImage;
  }[];
  miscellaneousFigure?: IMiscellaneousFigure[];
}

export interface IAboutHero {
  heading?: string;
  subheading?: string;
  description?: string;
  imageBig?: CmsImage;
  imageSmall?: CmsImage;
}

export interface ITheWayItWorks {
  heading?: string;
  subheading?: string;
  items: {
    cardImage?: CmsImage;
    cardHeading?: string;
    cardDescription?: string;
  }[];
  theme?: 'black' | 'white';
  miscellaneousFigure?: IMiscellaneousFigure[];
}
export interface IHowWeAreDifferent {
  heading?: string;
  subheading?: string;
  backgroundImage?: CmsImage;
  button?: ILink;
  items?: {
    cardHeading?: string;
    cardDescription?: string;
    cardImage?: CmsImage;
  }[];
}
export interface IValuesWeLiveBy {
  heading?: string;
  subheading?: string;
  items?: {
    cardHeading?: string;
    cardDescription?: string;
    cardImage?: CmsImage;
  }[];
}

export interface IBenefits {
  heading?: string;
  subHeading?: string;
  card?: {
    cardHeading?: string;
    cardImage?: CmsImage;
  }[];
  miscellaneousFigure?: IMiscellaneousFigure[];
}

export interface IWhomWeServe {
  heading?: string;
  subHeading?: string;
  content?: string;
  button?: ILink;
  card?: {
    cardHeading?: string;
    cardImage?: CmsImage;
  }[];
  miscellaneousFigure?: IMiscellaneousFigure[];
}

export interface IHowCanWeHelpYou {
  heading?: string;
  subHeading?: string;
  card?: ICard[];
  miscellaneousFigure?: IMiscellaneousFigure[];
}

export interface IAboutCard {
  content?: string;
  heading?: string;
  image?: CmsImage;
  imagePosition?: 'left' | 'right';
  subHeading?: string;
  ctaButton?: ILink;
  miscellaneousFigure?: IMiscellaneousFigure[];
}

export interface IOtherServices {
  card?: {
    description?: string;
    heading?: string;
    image?: CmsImage;
    button?: ILink;
  }[];
  miscellaneousFigure?: IMiscellaneousFigure[];
}

export interface IFundManagers {
  heading?: string;
  subHeading?: string;
  card?: ICard[];
  miscellaneousFigure?: IMiscellaneousFigure[];
}

export interface IWhyCorpCareForFixedIncome {
  heading?: string;
  subheading?: string;
  items?: {
    heading?: string;
    image?: CmsImage;
    points?: { label?: string }[];
  }[];
  miscellaneousFigure?: IMiscellaneousFigure[];
}

export interface INews {
  heading?: string;
  subHeadingParts?: ISubHeadingInParts[];
  NewsCard?: {
    heading?: string;
    category?: string;
    cardImage?: CmsImage;
    publishDate?: string;
    newsLink?: ILink;
  }[];
  miscellaneousFigure?: IMiscellaneousFigure[];
}

interface ICustomSection {
  heading?: string;
  subheading?: string;
  image?: CmsImage;
  content?: string;
}

export interface ICareersHero {
  careerHeroData?: ICustomSection;
}

export interface IWorkLifeAtCorpCare {
  workLifeAtCorpCareData?: ICustomSection;
  items?: ICard[];
  miscellaneousFigure?: IMiscellaneousFigure[];
}

export interface IBeThePartOfCorpCareTeam {
  beThePartOfCorpCareData?: ICustomSection;
  ctaLink?: ILink;
  items?: ICard[];
  miscellaneousFigure?: IMiscellaneousFigure[];
}

export interface IJoinOurTeam {
  heading?: string;
  subheading?: string;
  positions?: {
    role?: string;
    description?: string;
    applyLink?: ILink;
  }[];
  miscellaneousFigure?: IMiscellaneousFigure[];
}
export interface ITreasuryManagements {
  leftSection?: ICustomSection;
  rightSection?: ICustomSection;
  miscellaneousFigure?: IMiscellaneousFigure[];
}
export interface IWhoWeAre {
  heading?: string;
  subheading?: string;
  items?: ICard[];
  miscellaneousFigure?: IMiscellaneousFigure[];
}

export interface IContactUsCards {
  cards?: ICustomSection[];
  miscellaneousFigure?: IMiscellaneousFigure[];
}
export interface IPartnerWithUsHero {
  heading?: string;
  content?: string;
  ctaLink?: ILink;
  partnerImages?: { data?: Image[] };
}
export interface IWebinarCard {
  youtubeLink?: string;
  Date?: string;
  Highlights?: string;
  Overview?: string;
  image?: CmsImage;
  slug?: string;
  title?: string;
  speaker?: {
    data?: {
      attributes?: {
        description?: string;
        designation?: string;
        name?: string;
        image?: CmsImage;
      };
    };
  };
  heroImage?: CmsImage;
}
export interface IWebinars {
  attributes?: IWebinarCard;
}

export interface IUpcomingWebinars {
  heading?: string;
  subHeading?: string;
  upcoming_webinars?: {
    data?: IWebinars[];
  };
  miscellaneousFigure?: IMiscellaneousFigure[];
}

export interface IStayTuned {
  button?: ILink;
  content?: string;
  image?: CmsImage;
  searchBox?: {
    label?: string;
    name?: string;
    placeholder?: string;
    validations?: {
      type?: string;
      params?: string[];
    }[];
    validationType?: 'string';
  };
}

export interface IRelatedInsights {
  subHeading?: string;
  heading?: string;
  insights?: {
    data?: {
      attributes?: IInsightCard;
    }[];
  };
  miscellaneousFigure?: IMiscellaneousFigure[];
}

export interface IHelpTopicsData {
  attributes?: IHelpTopics;
}
export interface IHelpandSupport {
  heading?: string;
  help_topics?: {
    data?: IHelpTopicsData[];
  };
  miscellaneousFigure?: IMiscellaneousFigure[];
}

export interface IHelpTopics {
  heading?: string;
  slug: string;
  helpingTopic?: {
    helpTopicHeading?: string;
    helpTopicFAQ?: {
      disclosureDescription?: string;
      disclosureHeading?: string;
    }[];
    helpTopicImage?: CmsImage;
  }[];
}
export interface IContactUsForm {
  heading?: string;
  subheading?: string;
  image?: CmsImage;
  formContactUs?: { data?: { attributes?: IForm } };
  miscellaneousFigure?: IMiscellaneousFigure[];
}

export interface IPartnerWithUsForm {
  heading?: string;
  subheading?: string;
  partnersCards?: ITestimony[];
  partnerForm?: { data?: { attributes?: IForm } };
}

export interface IQuerySupport {
  heading?: string;
  ctaText?: string;
  image?: CmsImage;
  modalHeading?: string;
  queryForm?: { data?: { attributes?: IForm } };
}

export interface IRecognization {
  heading?: string;
  subHeading?: string;
  theme?: 'white' | 'black';
  card?: {
    description?: string;
    image?: CmsImage;
  }[];
  miscellaneousFigure?: IMiscellaneousFigure[];
}

export interface FundTabsCard {
  id?: number;
  fundTabsTitle?: string;
  one_month?: string;
  six_month?: string;
  one_year?: string;
  three_year?: string;
  five_year?: string;
  since_inception?: string;
  fundTabsIcon?: CmsImage;
  Button?: {
    theme?: 'primary' | 'secondary';
    link?: ILink;
  };
}

export interface FundTab {
  id?: number;
  title?: string;
  fundTabsCard?: FundTabsCard[];
}
export interface IExploreAIFandPMSFunds {
  id?: number;
  heading?: string;
  subHeading?: string;
  fundTabs?: FundTab[];
  miscellaneousFigure?: IMiscellaneousFigure[];
}
