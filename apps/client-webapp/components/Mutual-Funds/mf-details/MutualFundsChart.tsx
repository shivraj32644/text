import { IP2PReturn } from '@corpcare/shared/api';
import {
  formatIfNumberIsNotValid,
  compactInrFormatter,
  compactNumberTwoDecimalFormatter,
} from '@corpcare/web/ui';
import { FunctionComponent } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';

export const MutualFundsChart = ({
  chartData,
  categoryAverage,
}: {
  chartData?: IP2PReturn;
  categoryAverage?: IP2PReturn | null;
}) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-brand  rounded-lg rounded-bl-none">
          <p className="text-white p-1 font-normal">{`${label} ${compactInrFormatter?.format(
            payload[0]?.payload?.value
          )} ${compactInrFormatter.format(payload[0]?.payload?.value2)}
          `}</p>
        </div>
      );
    }

    return null;
  };

  const CustomizedDot: FunctionComponent<any> = (props: any) => {
    const { cx, cy } = props;

    return (
      <svg
        x={cx - 10}
        y={cy - 10}
        width="20"
        height="20"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx="8.46735"
          cy="8.29088"
          rx="8.46735"
          ry="8.23228"
          fill="#C5A265"
        />
        <ellipse
          cx="8.46758"
          cy="8.29186"
          rx="4.48271"
          ry="4.35827"
          fill="white"
        />
      </svg>
    );
  };

  const chartDataRef = [
    {
      name: '1M',
      value:
        formatIfNumberIsNotValid(chartData?.month_1) !== undefined
          ? formatIfNumberIsNotValid(chartData?.month_1)
          : +compactNumberTwoDecimalFormatter.format(chartData?.month_1 as any),

      value2:
        formatIfNumberIsNotValid(categoryAverage?.month_1) !== undefined
          ? formatIfNumberIsNotValid(categoryAverage?.month_1)
          : +compactNumberTwoDecimalFormatter.format(
              categoryAverage?.month_1 as any
            ),
    },
    {
      name: '3M',
      value:
        formatIfNumberIsNotValid(chartData?.month_3) !== undefined
          ? formatIfNumberIsNotValid(chartData?.month_3)
          : +compactNumberTwoDecimalFormatter.format(chartData?.month_3 as any),
      value2:
        formatIfNumberIsNotValid(categoryAverage?.month_3) !== undefined
          ? formatIfNumberIsNotValid(categoryAverage?.month_3)
          : +compactNumberTwoDecimalFormatter.format(
              categoryAverage?.month_3 as any
            ),
    },
    {
      name: '6M',
      value:
        formatIfNumberIsNotValid(chartData?.month_6) !== undefined
          ? formatIfNumberIsNotValid(chartData?.month_6)
          : +compactNumberTwoDecimalFormatter.format(chartData?.month_6 as any),
      value2:
        formatIfNumberIsNotValid(categoryAverage?.month_6) !== undefined
          ? formatIfNumberIsNotValid(categoryAverage?.month_6)
          : +compactNumberTwoDecimalFormatter.format(
              categoryAverage?.month_6 as any
            ),
    },
    {
      name: '1Y',
      value:
        formatIfNumberIsNotValid(chartData?.year_1) !== undefined
          ? formatIfNumberIsNotValid(chartData?.year_1)
          : +compactNumberTwoDecimalFormatter.format(chartData?.year_1 as any),
      value2:
        formatIfNumberIsNotValid(categoryAverage?.year_1) !== undefined
          ? formatIfNumberIsNotValid(categoryAverage?.year_1)
          : +compactNumberTwoDecimalFormatter.format(
              categoryAverage?.year_1 as any
            ),
    },
    {
      name: '3Y',

      value:
        formatIfNumberIsNotValid(chartData?.year_3) !== undefined
          ? formatIfNumberIsNotValid(chartData?.year_3)
          : +compactNumberTwoDecimalFormatter.format(chartData?.year_3 as any),
      value2:
        formatIfNumberIsNotValid(categoryAverage?.year_3) !== undefined
          ? formatIfNumberIsNotValid(categoryAverage?.year_3)
          : +compactNumberTwoDecimalFormatter.format(
              categoryAverage?.year_3 as any
            ),
    },
    {
      name: '5Y',
      value:
        formatIfNumberIsNotValid(chartData?.year_5) !== undefined
          ? formatIfNumberIsNotValid(chartData?.year_5)
          : +compactNumberTwoDecimalFormatter.format(chartData?.year_5 as any),
      value2:
        formatIfNumberIsNotValid(categoryAverage?.year_5) !== undefined
          ? formatIfNumberIsNotValid(categoryAverage?.year_5)
          : +compactNumberTwoDecimalFormatter.format(
              categoryAverage?.year_5 as any
            ),
    },
    {
      name: 'Since inception',
      value:
        formatIfNumberIsNotValid(chartData?.inception) !== undefined
          ? formatIfNumberIsNotValid(chartData?.inception)
          : +compactNumberTwoDecimalFormatter.format(
              chartData?.inception as any
            ),
      value2:
        formatIfNumberIsNotValid(categoryAverage?.inception) !== undefined
          ? formatIfNumberIsNotValid(categoryAverage?.inception)
          : +compactNumberTwoDecimalFormatter.format(
              categoryAverage?.inception as any
            ),
    },
  ];
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <AreaChart
          data={chartDataRef}
          width={500}
          height={400}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="100%" stopColor="#c5a265" stopOpacity={0.2} />
              <stop
                offset="0%"
                stopColor="white"
                stopOpacity={0.1}
                opacity={0}
              />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tickMargin={17}
            interval="preserveStartEnd"
            style={{
              color: '#191919',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '17px',
              letterSpacing: '0.02em',
            }}
          />

          <Tooltip
            cursor={{ strokeWidth: 1, strokeDasharray: 10, stroke: '#555555' }}
            content={({ active, payload, label }) => (
              <CustomTooltip active={active} payload={payload} label={label} />
            )}
          />
          <CartesianGrid stroke="#F1ECE5" />

          <Area
            dataKey="value"
            strokeWidth={2}
            fillOpacity={1}
            strokeLinecap="round"
            style={{ strokeWidth: '2px' }}
            stroke="#c5a265"
            dot={false}
            legendType="none"
            fill="url(#colorValue)"
            activeDot={<CustomizedDot />}
          />

          <Area
            dataKey="value2"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
            activeDot={<CustomizedDot />}
            strokeLinecap="round"
            style={{ strokeWidth: '2px' }}
            stroke="#D17DA3"
            dot={false}
            legendType="none"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
