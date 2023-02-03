import { useGetDashboardInvestmentGrowthData } from '../../../../../shared/api/src/index';
import classNames from 'classnames';
import {
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Label,
  Bar,
  ComposedChart,
} from 'recharts';
import { compactInrFormatter } from '../utils/currency';
import { useState } from 'react';

const CustomizedDot = (props: any) => {
  const { cx, cy, stroke, payload, value, active } = props;

  if (active) {
    return (
      <svg x={cx - 6} y={cy - 6} width={12} height={12} viewBox="0 0 2000 2000">
        <rect
          width="2000"
          height="2000"
          style={{ fill: '#30D26F', strokeWidth: 3, stroke: 'rgb(0,0,0)' }}
        />
      </svg>
    );
  }

  return (
    <svg x={cx - 5} y={cy - 5} width={10} height={10} viewBox="0 0 1024 1024">
      <rect
        width="1024"
        height="1024"
        style={{ fill: '#30D26F', strokeWidth: 3, stroke: 'rgb(0,0,0)' }}
      />
    </svg>
  );
};

export function DashboardInvestmentGrowth() {
  const [visibleDataKeys, setVisibleDataKeys] = useState({
    newNewAssets: true,
    aum: true,
  });
  const { data, isLoading } = useGetDashboardInvestmentGrowthData();

  if (isLoading) {
    return <div className="SkeletonCard h-96" />;
  }

  return (
    <div
      className={classNames(
        'Card p-0',
        !data && !isLoading ? 'opacity-20 pointer-events-none' : ''
      )}
    >
      <h2 className="px-5 lg:px-3 py-4 border-b font-medium lg:text-inherit text-sm">
        Your Investment Growth
      </h2>

      <div className="h-[350px] p-4">
        <ResponsiveContainer className="w-full h-full">
          <ComposedChart
            width={500}
            height={500}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            data={data}
          >
            <CartesianGrid verticalPoints={[-1]} stroke="#ddd" />
            <XAxis dataKey="month" fontSize={12} axisLine={false} />
            <Tooltip formatter={(v) => compactInrFormatter.format(v)} />
            <Legend
              verticalAlign="top"
              height={64}
              wrapperStyle={{ fontSize: 12 }}
              payload={[
                {
                  id: 'newNewAssets',
                  value: 'Net New Assets (YTD)',
                  color: '#4D4471',
                  type: 'square',
                  inactive: !visibleDataKeys.newNewAssets,
                },
                {
                  id: 'aum',
                  value: 'Current Value (YTD)',
                  color: '#30D26F',
                  type: 'square',
                  inactive: !visibleDataKeys.aum,
                },
              ]}
              onClick={(data) =>
                setVisibleDataKeys((prev) => ({
                  ...prev,
                  [data.id]: !prev[data.id as 'aum' | 'newNewAssets'],
                }))
              }
            />

            <YAxis
              yAxisId="newAssetsAxis"
              tickFormatter={(v) => compactInrFormatter.format(v)}
              fontSize={12}
              axisLine={false}
              type="number"
            >
              <Label
                value={
                  visibleDataKeys.newNewAssets ? 'NET NEW ASSETS (YTD)' : ''
                }
                angle={-90}
                position="left"
                style={{ textAnchor: 'middle' }}
                fontSize={12}
                fill="#777"
              />
            </YAxis>
            <Bar
              dataKey="newNewAssets"
              yAxisId="newAssetsAxis"
              barSize={50}
              fill="#4D4471"
              name="Net New Assets (YTD)"
              hide={!visibleDataKeys.newNewAssets}
            />

            <YAxis
              yAxisId="aumAxis"
              orientation="right"
              tickFormatter={(v) => compactInrFormatter.format(v)}
              fontSize={12}
              axisLine={false}
              type="number"
            >
              <Label
                value={visibleDataKeys.aum ? 'AUM (₹)' : ''}
                angle={90}
                position="right"
                style={{ textAnchor: 'middle' }}
                fontSize={12}
                fill="#777"
                offset={8}
              />
            </YAxis>
            <Line
              yAxisId="aumAxis"
              type="linear"
              dataKey="aum"
              hide={!visibleDataKeys.aum}
              stroke="#30D26F"
              name="Current Value (YTD)"
              dot={<CustomizedDot />}
              activeDot={<CustomizedDot active />}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
