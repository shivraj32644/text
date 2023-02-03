import type { SVGProps } from 'react';
import { compactNumberFormatter } from '../utils/currency';
function Circle({
  value = 100,
  strokeWidth = 1.2,
  ...restProps
}: SVGProps<SVGCircleElement> & {
  value?: number;
  strokeWidth?: number;
}) {
  const radius = 10 - strokeWidth / 2 - 0.1;
  const circ = 2 * Math.PI * radius;
  const strokevalue = ((100 - value) * circ) / 100;
  return (
    <circle
      r={radius}
      cx={10}
      cy={10}
      fill="transparent"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeDasharray={circ}
      strokeDashoffset={strokevalue}
      {...restProps}
    />
  );
}

function Text({ value }: { value: string }) {
  return (
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fontSize={4}
      fill="#555"
    >
      {value}
    </text>
  );
}

export function CircularProgress({
  value,
  strokeWidth = 1.5,
  ...restProps
}: SVGProps<SVGSVGElement> & {
  value: number;
  strokeWidth?: number;
}) {
  let percentage = Math.max(value, 0); // ensure greater than 0
  percentage = Math.min(value, 100); // ensure less than 100
  const percentageValue = Number(
    Math.round((percentage + 'e2') as any) + 'e-2'
  );
  return (
    <svg className="text-brandError" {...restProps} viewBox="0 0 20 20">
      <g transform="rotate(-90 10 10)">
        <Circle strokeWidth={strokeWidth} color="lightgrey" />
        <Circle
          strokeWidth={strokeWidth}
          value={percentage}
          className="transition-all duration-500"
        />
      </g>
      <Text value={`${percentageValue}%`} />
    </svg>
  );
}
