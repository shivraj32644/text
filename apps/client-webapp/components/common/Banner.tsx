import { RoundErrorCircleIcon, RoundSuccessCircleIcon } from '@corpcare/web/ui';

export const Banner = ({
  bannerText,
  buttonText,
  buttonFxn,
  bannerType,
}: {
  bannerText: string;
  buttonText: string;
  buttonFxn: () => void;
  bannerType: 'error' | 'success';
}) => {
  return (
    <div className="bg-lighter rounded-lg border border-brandLight flex justify-between items-center py-5 px-6">
      <div className="flex items-center gap-2">
        {bannerType === 'error' ? (
          <RoundErrorCircleIcon className="text-red-600 w-6 h-6 flex-shrink-0" />
        ) : (
          <RoundSuccessCircleIcon className="text-green-600 w-6 h-6 flex-shrink-0" />
        )}
        <p className="text-xl font-medium tracking-[0.02em] text-lightGray">
          {bannerText}
        </p>
      </div>
      <button className="Button uppercase" onClick={buttonFxn}>
        {buttonText}
      </button>
    </div>
  );
};
