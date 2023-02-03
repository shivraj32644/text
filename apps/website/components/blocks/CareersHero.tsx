import { normalizeCmsImage } from '@corpcare/shared/api';
import { ICareersHero } from '../../types/block';

export function CareersHero({ data }: { data: ICareersHero }) {
  const image = normalizeCmsImage(data?.careerHeroData?.image);
  return (
    <div className="bg-white">
      <div className="container mx-auto lg:p-10 p-5 flex flex-col items-center">
        <h2
          className="font-medium text-lg lg:text-xl tracking-[0.02em] text-brand uppercase text-left overflow-hidden before:h-[2px] after:h-[2px] after:bg-brand 
           after:inline-block after:relative after:align-middle after:w-6
           before:bg-brand before:inline-block before:relative before:align-middle 
           before:w-6 before:right-2 after:left-2 
           mb-2 lg:mb-4"
        >
          {data?.careerHeroData?.heading}
        </h2>
        <h2 className="text-[1.75rem] lg:text-[2rem] text-center mb-8 lg:mb-10">
          {data?.careerHeroData?.subheading}
        </h2>
        <img
          src={image.url}
          alt={image.alternativeText}
          className="w-full h-[13.75rem] lg:w-[71.25rem] lg:h-[27.5rem] object-cover rounded-md"
        />
      </div>
    </div>
  );
}
