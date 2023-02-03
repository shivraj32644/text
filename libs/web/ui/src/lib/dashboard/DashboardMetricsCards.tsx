import { type ReactNode } from 'react';
import { useGetAssetDashboardData } from '@corpcare/shared/api';
import {
  compactInrFormatter,
  compactNumberFormatter,
  DashboardAssetCardProgressList,
  DashboardAssetCardTable,
  MarketCapitalization,
} from '../../index';
import classNames from 'classnames';
import { Tab } from '@headlessui/react';

function DashboardAssetCard({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: { key: string; value: string }[];
  children: ReactNode;
}) {
  return (
    <div
      className={classNames(
        'Card p-0 h-full min-h-[300px]',
        title !== 'Market Capitalization' && 'overflow-hidden'
      )}
    >
      <div className="border-b py-2">
        <h4 className="font-medium text-sm lg:text-lg my-2 px-4">{title}</h4>

        {meta && (
          <div className="flex items-center gap-1 justify-between px-4">
            {meta?.map((item) => (
              <div key={item.key} className="text-sm">
                <p className="text-lighterGray">{item.key}</p>
                <p className="text-black mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>{children}</div>
    </div>
  );
}

export function DashboardMetricsCards({
  sectionName,
}: {
  sectionName: string;
}) {
  // const {data, isLoading} = useGetDashboardInfoCardsData(name);
  const { data } = useGetAssetDashboardData(sectionName);

  if (!data) {
    return (
      <div className="p-5">
        <div className="SkeletonCard h-96" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 pt-4 pb-10 px-5 gap-5 lg:gap-7 bg-[#FFFDFA]">
      {data.map((item) => (
        <div key={item.type}>
          {item.type === 'assetAllocation' && (
            <DashboardAssetCard title="Asset Allocation">
              <DashboardAssetCardProgressList
                data={item.chartData?.map(({ name, exposure, metaData }) => ({
                  name,
                  percentage: exposure,
                  hoverContent: (
                    <div className="bg-white w-56 flex flex-col gap-y-3">
                      <div className="flex justify-between ">
                        <p className="text-Black font-semibold">{name}</p>
                        <p className="text-Black font-semibold">{`${compactNumberFormatter.format(
                          exposure
                        )}%`}</p>
                      </div>

                      <div className="text-xs font-semibold border-b-2 pb-2 border-b-gray-300">
                        <p className="text-lighterGray pb-2">Invested value</p>
                        {compactInrFormatter.format(metaData.cost)}
                      </div>
                      <div className="text-xs font-semibold border-b-2 pb-2 border-b-gray-300">
                        <p className="text-lighterGray pb-2">Current Value</p>
                        {compactInrFormatter.format(metaData.mktValue)}
                      </div>
                      <div className="text-xs font-semibold border-b-2 pb-2 border-b-gray-300">
                        <p className="text-lighterGray pb-2">Returns</p>
                        {compactInrFormatter.format(metaData.returns)}
                      </div>
                    </div>
                  ),
                }))}
              />
            </DashboardAssetCard>
          )}

          {item.type === 'categoryPerformance' && (
            <DashboardAssetCard title="Category Performance">
              <DashboardAssetCardProgressList
                data={item.chartData?.map(({ name, exposure }) => ({
                  name,
                  percentage: exposure,
                }))}
              />
            </DashboardAssetCard>
          )}

          {item.type === 'duration' && (
            <DashboardAssetCard title="Duration">
              <DashboardAssetCardProgressList
                data={item.chartData.map(({ name, exposure }) => ({
                  name,
                  percentage: exposure,
                }))}
              />
            </DashboardAssetCard>
          )}

          {item.type === 'products' && (
            <DashboardAssetCard title="Products">
              <DashboardAssetCardProgressList
                data={item.chartData?.map(({ name, exposure, metaData }) => ({
                  name,
                  percentage: exposure,
                  hoverContent: (
                    <div className="bg-white w-56 flex flex-col gap-y-3">
                      <div className="flex justify-between ">
                        <p className="text-Black font-semibold">{name}</p>
                        <p className="text-Black font-semibold">{`${compactNumberFormatter.format(
                          exposure
                        )}%`}</p>
                      </div>

                      <div className="text-xs font-semibold border-b-2 pb-2 border-b-gray-300">
                        <p className="text-lighterGray">Invested value</p>
                        {compactInrFormatter.format(metaData.cost)}
                      </div>
                      <div className="text-xs font-semibold border-b-2 pb-2 border-b-gray-300">
                        <p className="text-lighterGray">Current Value</p>
                        {compactInrFormatter.format(metaData.currMktVal)}
                      </div>
                      <div className="text-xs font-semibold border-b-2 pb-2 border-b-gray-300">
                        <p className="text-lighterGray">Returns</p>
                        {compactInrFormatter.format(metaData.returns)}
                      </div>
                    </div>
                  ),
                }))}
              />
            </DashboardAssetCard>
          )}

          {item.type === 'rating' && (
            <DashboardAssetCard
              title="Rating"
              meta={[
                {
                  key: 'Current Value',
                  value: compactInrFormatter.format(item.currentVal),
                },
                { key: 'Exposure', value: `${item.exposure.toFixed(2)}%` },
              ]}
            >
              <DashboardAssetCardProgressList
                data={item.chartData?.map(({ name, exposure, currentVal }) => ({
                  name,
                  percentage: exposure,
                  hoverContent:
                    sectionName === 'total_details' ? (
                      <div className="bg-white w-56 flex flex-col gap-y-3">
                        <div className="flex justify-between ">
                          <p className="text-Black font-semibold">{name}</p>
                          <p className="text-Black font-semibold">{`${compactNumberFormatter.format(
                            exposure
                          )}%`}</p>
                        </div>

                        <div className="text-xs font-semibold ">
                          <p className="text-lighterGray">Current value</p>
                          {compactInrFormatter.format(currentVal)}
                        </div>
                      </div>
                    ) : null,
                }))}
              />
            </DashboardAssetCard>
          )}

          {item.type === 'capitalGains' && (
            <DashboardAssetCard title="Capital Gains">
              <Tab.Group>
                <Tab.List className="flex px-4 my-3 gap-x-5 border-b-2 border-gray-100">
                  {Object.keys(item).map((category) => {
                    if (category === 'type') return;
                    return (
                      <Tab
                        key={category}
                        className={({ selected }) =>
                          classNames(
                            'text-[0.60rem] font-semibold py-2 focus:outline-none',
                            selected
                              ? 'text-black border-b-4 border-b-brand rounded-xs'
                              : 'text-gray-400 '
                          )
                        }
                      >
                        {category.toUpperCase()}
                      </Tab>
                    );
                  })}
                </Tab.List>
                <Tab.Panels className="mt-2">
                  {Object.keys(item).map((key, idx) => {
                    if (key === 'type') return;

                    const value = item[key] as any;
                    return (
                      <Tab.Panel
                        key={idx}
                        className={classNames('rounded-xl bg-white p-3')}
                      >
                        <>
                          <div className="flex items-center gap-1 justify-between px-4 mb-2">
                            {[
                              {
                                key: 'Long Term',
                                value: compactInrFormatter.format(
                                  (value.schemeList || value.prodList)?.reduce(
                                    (sum: any, { ltValue }: any) =>
                                      sum + (ltValue || 0),
                                    0
                                  ) || 0
                                ),
                              },
                              {
                                key: 'Short Term',
                                value: compactInrFormatter.format(
                                  (value.schemeList || value.prodList)?.reduce(
                                    (sum, { stVal }) => sum + (stVal || 0),
                                    0
                                  ) || 0
                                ),
                              },
                            ]?.map((item) => (
                              <div key={item.key} className="text-sm">
                                <p className="text-lighterGray">{item.key}</p>
                                <p className="text-black mt-1">{item.value}</p>
                              </div>
                            ))}
                          </div>

                          <DashboardAssetCardTable
                            columns={[
                              { key: 'idx', name: 'No.' },
                              { key: 'product', name: 'Product' },
                              { key: 'longTerm', name: 'Long Term' },
                              { key: 'shortTerm', name: 'Short Term' },
                            ]}
                            data={
                              (value.schemeList || value.prodList)?.map(
                                (v, idx) => ({
                                  idx: String(idx + 1),
                                  id: v.name,
                                  product: v.name,
                                  longTerm: v.ltValue
                                    ? compactInrFormatter.format(v.ltValue)
                                    : '----',
                                  shortTerm: v.stVal
                                    ? compactInrFormatter.format(v.stVal)
                                    : '----',
                                })
                              ) || []
                            }
                          />
                        </>
                      </Tab.Panel>
                    );
                  })}
                </Tab.Panels>
              </Tab.Group>
            </DashboardAssetCard>
          )}

          {item.type === 'topSectors' && (
            <DashboardAssetCard
              title="Top Sectors"
              meta={[
                {
                  key: 'Current Value',
                  value: compactInrFormatter.format(item.currentValue || 0),
                },
                { key: 'Exposure', value: item.exposure.toFixed(2) + '%' },
              ]}
            >
              <DashboardAssetCardTable
                columns={[
                  { key: 'idx', name: 'No.' },
                  { key: 'sector', name: 'Sector' },
                  { key: 'currentValue', name: 'Current Value' },
                  { key: 'exposure', name: 'Exposure' },
                ]}
                data={
                  item.companySectorlist?.map((v, idx) => ({
                    idx: String(idx + 1),
                    id: v.sectName,
                    sector: v.sectName,
                    currentValue: compactInrFormatter.format(v.currentValue),
                    exposure: v.exposure.toFixed(2) + '%',
                  })) || []
                }
              />
            </DashboardAssetCard>
          )}

          {item.type === 'marketCap' && (
            <DashboardAssetCard
              title="Market Capitalization"
              meta={[
                {
                  key: 'Current Value',
                  value: compactInrFormatter.format(item.currentVal || 0),
                },
                { key: 'Exposure', value: item.exposure.toFixed(2) + '%' },
              ]}
            >
              <MarketCapitalization
                marketCap={item}
                sectionName={sectionName}
              />
            </DashboardAssetCard>
          )}

          {item.type === 'topCompany' && (
            <DashboardAssetCard
              title="Top Company"
              meta={[
                {
                  key: 'Current Value',
                  value: compactInrFormatter.format(item.currentValue || 0),
                },
                { key: 'Exposure', value: item.exposure.toFixed(2) + '%' },
              ]}
            >
              <DashboardAssetCardTable
                columns={[
                  { key: 'idx', name: 'No.' },
                  { key: 'sector', name: 'Sector' },
                  { key: 'currentValue', name: 'Current Value' },
                  { key: 'exposure', name: 'Exposure' },
                ]}
                data={
                  item.companySectorlist.map((v, idx) => ({
                    idx: String(idx + 1),
                    id: v.compName,
                    sector: v.compName,
                    currentValue: compactInrFormatter.format(v.currentValue),
                    exposure: v.exposure.toFixed(2) + '%',
                  })) || []
                }
              />
            </DashboardAssetCard>
          )}
        </div>
      ))}
      {/* {data.map((cardData) => (
        <div key={cardData.name} className="Card min-h-[270px]">
          <h4 className="font-medium">{cardData.name}</h4>

          {cardData.values.map((value) => (
            <div key={value.name} className="mt-5">
              <p className="flex text-lighterGray uppercase text-xs mb-1">
                <span className="flex-e">{value.name}</span>
                <span>{value.percentage}%</span>
              </p>

              <div className="Progress">
                <span
                  className="ProgressValue"
                  style={{ width: `${value.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ))} */}
    </div>
  );
}
