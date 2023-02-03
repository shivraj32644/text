export const SECTION_ACCESS_DENIED_CONTENT =
  'You do not have access to this section.';
export interface IStateList {
  value: string;
  label: string;
}

export const stateListOptions: IStateList[] = [
  { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
  { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
  { value: 'Assam', label: 'Assam' },
  { value: 'Bihar', label: 'Bihar' },
  { value: 'Chhattisgarh', label: 'Chhattisgarh' },
  { value: 'Gujarat', label: 'Gujarat' },
  { value: 'Goa', label: 'Goa' },
  { value: 'Haryana', label: 'Haryana' },
  { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
  { value: 'Jharkhand', label: 'Jharkhand' },
  { value: 'Karnataka', label: 'Karnataka' },
  { value: 'Kerala', label: 'Kerala' },
  { value: 'Manipur', label: 'Manipur' },
  { value: 'Maharashtra', label: 'Maharashtra' },
  { value: 'Meghalaya', label: 'Meghalaya' },
  { value: 'Mizoram', label: 'Mizoram' },
  { value: 'Nagaland', label: 'Nagaland' },
  { value: 'Odisha', label: 'Odisha' },
  { value: 'Rajasthan', label: 'Rajasthan' },
  { value: 'Punjab', label: 'Punjab' },
  { value: 'Sikkim', label: 'Sikkim' },
  { value: 'West Bengal', label: 'West Bengal' },
  { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
  { value: 'Tamil Nadu', label: 'Tamil Nadu' },
  { value: 'Telangana', label: 'Telangana' },
  { value: 'Tripura', label: 'Tripura' },
  { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
  { value: 'Uttarakhand', label: 'Uttarakhand' },
  { value: 'Jammu and Kashmir', label: 'Jammu and Kashmir' },
  { value: 'Chandigarh', label: 'Chandigarh' },
  { value: 'Delhi', label: 'Delhi' },
];

export interface ICountryList {
  value: string;
  label: string;
}

export const countryListOptions: ICountryList[] = [
  { value: 'IN', label: 'India' },
];

export interface IIndustryList {
  value: string;
  label: string;
}

export const industryListOptions: IIndustryList[] = [
  {
    value: 'Agriculture and Allied Industries',
    label: 'Agriculture and Allied Industries',
  },
  { value: 'Auto Components', label: 'Auto Components' },
  { value: 'Automobiles', label: 'Automobiles' },
  { value: 'Aviation', label: 'Aviation' },
  { value: 'Banking', label: 'Banking' },
  { value: 'Biotechnology', label: 'Biotechnology' },
  { value: 'Cement', label: 'Cement' },
  { value: 'Chemicals', label: 'Chemicals' },
  {
    value: 'Consumer Durables',
    label: 'Consumer Durables',
  },
  {
    value: 'Defence Manufacturing',
    label: 'Defence Manufacturing',
  },
  { value: 'E-Commerce', label: 'E-Commerce' },
  {
    value: 'Education and Training',
    label: 'Education and Training',
  },
  {
    value: 'Electronics System Design & Manufacturing',
    label: 'Electronics System Design & Manufacturing',
  },
  {
    value: 'Engineering and Capital Goods',
    label: 'Engineering and Capital Goods',
  },
  {
    value: 'Financial Services',
    label: 'Financial Services',
  },
  { value: 'FMCG', label: 'FMCG' },
  {
    value: 'Gems and Jewellery',
    label: 'Gems and Jewellery',
  },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Infrastructure', label: 'Infrastructure' },
  { value: 'Insurance', label: 'Insurance' },
  { value: 'IT & BPM', label: 'IT & BPM' },
  { value: 'Manufacturing', label: 'Manufacturing' },
  {
    value: 'Media and Entertainment',
    label: 'Media and Entertainment',
  },
  { value: 'Medical Devices', label: 'Medical Devices' },
  {
    value: 'Metals and Mining',
    label: 'Metals and Mining',
  },
  { value: 'MSME', label: 'MSME' },
  { value: 'Oil and Gas', label: 'Oil and Gas' },
  { value: 'Pharmaceuticals', label: 'Pharmaceuticals' },
  { value: 'Ports', label: 'Ports' },
  { value: 'Power', label: 'Power' },
  { value: 'Railways', label: 'Railways' },
  { value: 'Real Estate', label: 'Real Estate' },
  {
    value: 'Renewable Energy',
    label: 'Renewable Energy',
  },
  { value: 'Retail', label: 'Retail' },
  { value: 'Roads', label: 'Roads' },
  {
    value: 'Science and Technology',
    label: 'Science and Technology',
  },
  { value: 'Services', label: 'Services' },
  { value: 'Services', label: 'Services' },
  { value: 'Steel', label: 'Steel' },
  { value: 'Textiles', label: 'Textiles' },
  {
    value: 'Telecommunications',
    label: 'Telecommunications',
  },
  {
    value: 'Tourism and Hospitality',
    label: 'Tourism and Hospitality',
  },
];

export interface IBusinessEntityList {
  value: string;
  label: string;
}

export const businessEntityListOptions: IBusinessEntityList[] = [
  { value: 'public_limited_company', label: 'Public Limited Company' },
  { value: 'private_limited_company', label: 'Private Limited Company' },
  {
    value: 'limited_liability_partnership',
    label: 'Limited Liability Partnership',
  },
  { value: 'partnership_firm', label: 'Partnership Firm' },
  { value: 'sole_proprietorship', label: 'Sole Proprietorship' },
  { value: 'one_person_company', label: 'One Person Company' },
  {
    value: 'non_government_organization',
    label: 'Non-Government Organization (NGO)',
  },
];
