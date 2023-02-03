import { AboutCard } from '../blocks/AboutCard';
import { AboutHero } from '../blocks/AboutHero';
import { Benefits } from '../blocks/Benefits';
import { ColTabs } from '../blocks/ColTabs';
import { CorpcareTeam } from '../blocks/CorpcareTeam';
import { Cta } from '../blocks/Cta';
import { FAQ } from '../blocks/FAQ';
import { Hero } from '../blocks/Hero';
import { HowCanWeHelpYou } from '../blocks/HowCanWeHelpYou';
import { HowWeAreDifferent } from '../blocks/HowWeAreDifferent';
import { News } from '../blocks/News';
import { OurClients } from '../blocks/OurClients';
import { OurPartners } from '../blocks/OurPartners';
import { OurProducts } from '../blocks/OurProducts';
import { ProductFeatures } from '../blocks/ProductFeatures';
import RelatedArticles from '../blocks/RelatedArticles';
import RenderMarkdown from '../blocks/RenderMarkdown';
import { ServicesWeOffer } from '../blocks/ServicesWeOffer';
import { TheWayItWorks } from '../blocks/TheWayItWorks';
import { ValuesWeLiveBy } from '../blocks/ValuesWeLiveBy';
import { WhomWeServe } from '../blocks/WhomWeServe';
import { WhyCorpCareForFixedIncome } from '../blocks/WhyCorpCareForFixedIncome';
import { WhyCorpcareIsDifferent } from '../blocks/WhyCorpcareIsDifferent';
import { OtherServices } from '../blocks/OtherServices';
import { FundManagers } from '../blocks/FundManagers';
import { CareersHero } from '../blocks/CareersHero';
import { WorkLifeAtCorpCare } from '../blocks/WorkLifeAtCorpCare';
import { BeThePartOfCorpCareTeam } from '../blocks/BeThePartOfCorpCareTeam';
import { JoinOurTeam } from '../blocks/JoinOurTeam';
import { TreasuryManagements } from '../blocks/TreasuryManagement';
import { WhoWeAre } from '../blocks/WhoWeAre';
import { ContactUsCards } from '../blocks/ContactUsCards';
import { PartnerWithUsHero } from '../blocks/PartnerWithUsHero';
import { UpcomingWebinars } from '../blocks/UpcomingWebinars';
import { StayTuned } from '../blocks/StayTuned';
import RelatedInsights from '../blocks/RelatedInsights';
import { BrowseHelpTopics } from '../blocks/BrowseHelpTopics';
import { ContactUsForm } from '../blocks/ContactUsForm';
import { PartnerWithUsForm } from '../blocks/PartnerWithUsForm';
import { TheProcessWeFollow } from '../blocks/TheProcessWeFollow';
import { QuerySupport } from '../blocks/QuerySupport';
import { ExploreMutualFunds } from '../blocks/ExploreMutualFunds';
import { Recognization } from '../blocks/Recognization';
import { ExploreAIFandPMSFunds } from '../blocks/ExploreAIFandPMSFunds';
import { ThankYou } from '../blocks/ThankYou';

type IComponent =
  | 'block.our-partners'
  | 'block.hero'
  | 'block.our-clients'
  | 'block.product-features'
  | 'block.why-corpcare-is-different'
  | 'block.our-products'
  | 'block.cta'
  | 'block.corpcare-team'
  | 'block.faq'
  | 'block.services-we-offer'
  | 'block.col-tabs'
  | 'block.about-hero'
  | 'block.the-way-it-works'
  | 'block.how-we-are-different'
  | 'block.related-articles'
  | 'block.values-we-live-by'
  | 'block.rich-content'
  | 'block.benefits'
  | 'block.whom-we-serve'
  | 'block.how-can-we-help-you'
  | 'block.about-card'
  | 'block.other-services'
  | 'block.fund-managers'
  | 'block.why-corp-care-for-fixed-income'
  | 'block.news'
  | 'block.careers-hero'
  | 'block.work-life-at-corp-care'
  | 'block.be-the-part-of-corp-care-team'
  | 'block.join-our-team'
  | 'block.treasury-management'
  | 'block.who-we-are'
  | 'block.contact-us-cards'
  | 'block.partner-with-us-hero'
  | 'block.upcoming-webinars'
  | 'block.stay-tuned'
  | 'block.related-insights'
  | 'block.browse-help-topics'
  | 'block.contact-us-form'
  | 'block.partner-with-us-form'
  | 'block.related-insights'
  | 'block.the-process-we-follow'
  | 'block.query-support'
  | 'block.explore-mutual-funds'
  | 'block.recognizations'
  | 'block.explore-aif-and-pms-funds'
  | 'block.thank-you';

const getBlockComponent: (
  {
    __component,
    ...rest
  }: {
    [x: string]: any;
    __component: IComponent;
  },
  index: number
) => JSX.Element | null = ({ __component, ...data }, index) => {
  let Block;

  switch (__component) {
    case 'block.our-partners':
      Block = OurPartners;
      break;
    case 'block.hero':
      Block = Hero;
      break;
    case 'block.cta':
      Block = Cta;
      break;
    case 'block.our-clients':
      Block = OurClients;
      break;
    case 'block.product-features':
      Block = ProductFeatures;
      break;
    case 'block.why-corpcare-is-different':
      Block = WhyCorpcareIsDifferent;
      break;
    case 'block.our-products':
      Block = OurProducts;
      break;
    case 'block.corpcare-team':
      Block = CorpcareTeam;
      break;
    case 'block.faq':
      Block = FAQ;
      break;
    case 'block.services-we-offer':
      Block = ServicesWeOffer;
      break;
    case 'block.col-tabs':
      Block = ColTabs;
      break;
    case 'block.about-hero':
      Block = AboutHero;
      break;
    case 'block.the-way-it-works':
      Block = TheWayItWorks;
      break;
    case 'block.how-we-are-different':
      Block = HowWeAreDifferent;
      break;
    case 'block.related-articles':
      Block = RelatedArticles;
      break;
    case 'block.values-we-live-by':
      Block = ValuesWeLiveBy;
      break;
    case 'block.rich-content':
      Block = RenderMarkdown;
      break;
    case 'block.benefits':
      Block = Benefits;
      break;
    case 'block.whom-we-serve':
      Block = WhomWeServe;
      break;
    case 'block.how-can-we-help-you':
      Block = HowCanWeHelpYou;
      break;
    case 'block.about-card':
      Block = AboutCard;
      break;
    case 'block.other-services':
      Block = OtherServices;
      break;
    case 'block.fund-managers':
      Block = FundManagers;
      break;
    case 'block.why-corp-care-for-fixed-income':
      Block = WhyCorpCareForFixedIncome;
      break;
    case 'block.news':
      Block = News;
      break;
    case 'block.careers-hero':
      Block = CareersHero;
      break;
    case 'block.work-life-at-corp-care':
      Block = WorkLifeAtCorpCare;
      break;
    case 'block.be-the-part-of-corp-care-team':
      Block = BeThePartOfCorpCareTeam;
      break;
    case 'block.join-our-team':
      Block = JoinOurTeam;
      break;
    case 'block.treasury-management':
      Block = TreasuryManagements;
      break;
    case 'block.who-we-are':
      Block = WhoWeAre;
      break;
    case 'block.contact-us-cards':
      Block = ContactUsCards;
      break;
    case 'block.partner-with-us-hero':
      Block = PartnerWithUsHero;
      break;
    case 'block.upcoming-webinars':
      Block = UpcomingWebinars;
      break;
    case 'block.stay-tuned':
      Block = StayTuned;
      break;
    case 'block.related-insights':
      Block = RelatedInsights;
      break;
    case 'block.browse-help-topics':
      Block = BrowseHelpTopics;
      break;
    case 'block.contact-us-form':
      Block = ContactUsForm;
      break;
    case 'block.partner-with-us-form':
      Block = PartnerWithUsForm;
      break;
    case 'block.the-process-we-follow':
      Block = TheProcessWeFollow;
      break;
    case 'block.query-support':
      Block = QuerySupport;
      break;
    case 'block.explore-mutual-funds':
      Block = ExploreMutualFunds;
      break;
    case 'block.recognizations':
      Block = Recognization;
      break;
    case 'block.explore-aif-and-pms-funds':
      Block = ExploreAIFandPMSFunds;
      break;
    case 'block.thank-you':
      Block = ThankYou;
      break;
  }
  return Block ? <Block key={`index-${index}`} data={data} /> : null;
};

const BlockManager = ({ blocks }) => {
  return <>{blocks?.map(getBlockComponent)}</>;
};

BlockManager.defaultProps = {
  blocks: [],
};

export default BlockManager;
