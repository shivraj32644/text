import { useGetPublicMutualSchema } from '@corpcare/shared/api';
import { CustomToast } from '@corpcare/web/ui';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { PublicMutualFundCard } from '../shared/PublicMutualFundCard';
import RequestDemoModal from '../shared/RequestDemoModal';

export function ExploreMutualFunds({
  data,
}: {
  data: { heading?: string; subHeading?; string };
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: schema, isLoading, isError } = useGetPublicMutualSchema(1);
  useEffect(() => {
    if (isError) {
      toast.custom((t) => (
        <CustomToast
          t={t}
          message={'Something went wrong! Please try again.'}
          type="error"
        />
      ));
    }
  }, [isError]);
  return (
    <div className="bg-white ">
      <div className="container mx-auto lg:p-10 p-5">
        <h2
          className="font-medium text-lg lg:text-xl tracking-[0.02em] text-brand uppercase text-left overflow-hidden before:h-[2px] after:h-[2px] after:bg-brand 
           after:inline-block after:relative after:align-middle after:w-6
           before:bg-brand before:inline-block before:relative before:align-middle 
           before:w-6 before:right-2 after:left-2 p-4"
        >
          {data?.heading}
        </h2>
        <h1 className="font-medium text-2xl lg:text-4xl tracking-[0.02em] text-[#191919] text-left max-w-lg">
          {data?.subHeading}
        </h1>
        <div
          className={classNames(
            'grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6 lg:mt-[41px]',
            schema?.items?.length !== 0 && !isLoading && !isError
              ? ''
              : 'animate-pulse relative'
          )}
        >
          {schema?.items?.length !== 0 && !isLoading && !isError ? (
            <>
              {schema?.items?.map((mf, index) => (
                <PublicMutualFundCard
                  key={index}
                  heading={mf?.plan_name}
                  category={mf?.category}
                  subCategory={mf?.sub_category}
                  data={mf?.return_average}
                  logo={
                    !mf?.amc?.logo_url
                      ? '/images/favicon.png'
                      : mf?.amc?.logo_url
                  }
                  alternativeText={mf?.amc?.name}
                  onAddToCart={() => {
                    setIsOpen(true);
                  }}
                />
              ))}
            </>
          ) : (
            <>
              <div className="h-full bg-gray-200 rounded-lg min-h-[224px] lg:min-h-[280px]" />
              <div className="h-full bg-gray-200 rounded-lg min-h-[224px] lg:min-h-[280px]" />
              <div className="h-full bg-gray-200 rounded-lg min-h-[224px] lg:min-h-[280px]" />
              <div className="h-full bg-gray-200 rounded-lg min-h-[224px] lg:min-h-[280px]" />
              <span className="sr-only">Loading...</span>
            </>
          )}
        </div>
      </div>
      <RequestDemoModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </div>
  );
}
