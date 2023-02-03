import {
  AssetDashboardSummary,
  useGetDashboardAssetsList,
} from '@corpcare/shared/api';
import {
  CircularProgress,
  compactInrFormatter,
  compactNumberFormatter,
} from '../../index';
import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

import { DashboardMetricsCards } from './DashboardMetricsCards';

function DashboardMetricsListItem({
  data,
  isDetailsOpen,
  onToggle,
}: { data: AssetDashboardSummary } & {
  isDetailsOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-t first:border-0">
      <div
        key={data.assetId}
        className="lg:flex lg:justify-between grid grid-cols-11 gap-5 lg:gap-2 p-5 items-center cursor-pointer"
        onClick={onToggle}
      >
        <div className=" col-span-3">
          <CircularProgress
            value={data.assetValue}
            className="text-[#8078A0] w-14 h-14"
          />
        </div>
        <div className="col-span-8 lg:flex lg:flex-col lg:justify-center lg:w-28 lg:h-10 lg:border-r-2 lg:border-r-gray-300">
          <h4>{data.assetClass}</h4>
          {!!data.assetDuration && (
            <p className="text-xs">{data.assetDuration}</p>
          )}
        </div>
        <div className="col-span-3  text-xs">
          <p className="text-lighterGray">Invested value</p>
          {compactInrFormatter.format(data.investedVal)}
        </div>
        <div className="col-span-3  text-xs">
          <p className="text-lighterGray">Current Value</p>
          {compactInrFormatter.format(data.currentVal)}
        </div>
        <div className="col-span-3  text-xs">
          <p className="text-lighterGray">Returns</p>
          <span>{compactInrFormatter.format(data.returns)}</span>
          <span
            className={classNames(
              'text-[10px] pl-2 font-semibold',
              data.irr < 0 ? 'text-red-500' : 'text-green-500'
            )}
          >
            ({compactNumberFormatter.format(data.irr)}%)
          </span>
        </div>
        <div className="col-span-11 ">
          <button
            onClick={onToggle}
            className={classNames(
              'OutlineButton uppercase text-xs',
              isDetailsOpen && 'bg-brand text-white'
            )}
          >
            {isDetailsOpen ? 'Hide Details' : 'View Details'}
          </button>
        </div>
      </div>
      <Transition
        show={isDetailsOpen}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {isDetailsOpen && (
          <div className="border-t">
            <DashboardMetricsCards sectionName={data.detailsSectionName} />
          </div>
        )}
      </Transition>
    </div>
  );
}

export function DashboardMetricsLists() {
  const { data, isLoading } = useGetDashboardAssetsList();

  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );

  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    itemRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedItemIndex]);

  if (isLoading) {
    return <div className="SkeletonCard h-96" />;
  }
  if (!data && !isLoading) {
    return (
      <div className="h-80 lg:h-96 relative">
        <img
          src="dashboard-banner.png"
          className="object-contain h-full w-full opacity-20"
          alt="coming_soon"
        />
        <p className="absolute top-[10%] lg:top-[40%] text-center w-full text-xl lg:text-3xl text-lighterGray">
          Coming Soon
        </p>
        <br />
        <p className="absolute top-[40%] lg:top-[60%] text-center w-full text-xl lg:text-3xl text-lighterGray">
          Please reach out to&nbsp;
          <a href="mailto: contact@corpcare.co.in">contact@corpcare.co.in</a> to
          upload your existing portfolio.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      {data.map((listItem, idx) => (
        <div
          key={(listItem.assetId, idx)}
          ref={
            selectedItemIndex !== null && idx === selectedItemIndex
              ? itemRef
              : null
          }
        >
          <DashboardMetricsListItem
            data={listItem}
            isDetailsOpen={
              selectedItemIndex !== null && idx === selectedItemIndex
            }
            onToggle={() =>
              setSelectedItemIndex(selectedItemIndex !== idx ? idx : null)
            }
          />
        </div>
      ))}
    </div>
  );
}
