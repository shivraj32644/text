import { useState } from 'react';
import {
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  Cell,
  Legend,
  Tooltip,
} from 'recharts';
const compactInrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  notation: 'compact',
  minimumSignificantDigits: 3,
  maximumSignificantDigits: 4,
});

const compactNumberFormatter = new Intl.NumberFormat('en-IN', {
  style: 'decimal',
  notation: 'compact',
  minimumSignificantDigits: 3,
  maximumSignificantDigits: 4,
});
interface MarketCapDashboardData {
  exposure: number;
  currentVal: number;
  returns: null;
  change: null;
  chartData: {
    name: string;
    value: number;
    metaData: {
      exposure: number;
      currentVal: number;
      productList: {
        prodName: string;
        currentVal: number;
        exposure: number;
      }[];
    };
  }[];
}

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
  } = props;

  return (
    <g>
      <defs>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="2" x2="2" y2="0">
            <stop offset="10%" stopColor={fill} stopOpacity={1} />
            <stop offset="90%" stopColor={fill} stopOpacity={0} />
          </linearGradient>
        </defs>
      </defs>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        className="hover:cursor-pointer"
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius}
        outerRadius={outerRadius + 10}
        fill="url(#colorUv)"
      />
    </g>
  );
};

export const MarketCapitalization = ({
  marketCap,
  sectionName,
}: {
  marketCap: MarketCapDashboardData;
  sectionName: string;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  const colors = ['#8078A0', '#D1B27B', '#77C3A8'];

  const CustomTooltip = ({ payload, active, label }) => {
    return (
      <div className="opacity-95 relative right-0 lg:left-64 bg-white p-4  w-56 lg:w-72 rounded-lg shadow-lg">
        <div className="flex flex-col border-solid border-b border-gray-400 py-1 gap-2">
          <div className="flex justify-between items-center ">
            <p className="text-xl font-medium text-gray-700">
              {payload[0]?.payload?.name}
            </p>
            <p className="text-base font-medium text-gray-700">
              {compactNumberFormatter.format(
                payload[0]?.payload?.metaData?.exposure
              )}
              %
            </p>
          </div>
          <p className="text-base font-medium text-gray-700">
            {compactInrFormatter.format(
              payload[0]?.payload?.metaData?.currentVal
            )}
          </p>
        </div>
        {payload[0]?.payload?.metaData?.productList.map((item, index) => (
          <div
            key={index}
            className="border-dashed border-b border-gray-400 py-1 flex-col flex gap-2"
          >
            <div className="flex justify-between items-center ">
              <p className="text-base font-medium text-gray-400">
                {item?.prodName}
              </p>
              <p className="text-base font-medium text-gray-400">
                {compactNumberFormatter.format(item?.exposure)}%
              </p>
            </div>
            <p className="text-base font-medium text-gray-700">
              {compactInrFormatter.format(item?.currentVal)}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-[350px] p-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart className="lg:mt-6">
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={marketCap.chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#C5A265"
            fillRule="evenodd"
            dataKey="value"
            onMouseEnter={onPieEnter}
            stroke=""
          >
            {marketCap.chartData.map((entry, index) => (
              <>
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              </>
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            height={64}
            wrapperStyle={{ fontSize: 12, textTransform: 'uppercase' }}
          />
          {sectionName === 'total_details' && (
            <Tooltip
              cursor={false}
              content={({ payload, active, label }) => (
                <CustomTooltip
                  active={active}
                  payload={payload}
                  label={label}
                />
              )}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
