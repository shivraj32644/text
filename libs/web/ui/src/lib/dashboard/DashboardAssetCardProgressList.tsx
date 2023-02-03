import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import { ReactNode } from 'react';

export function DashboardAssetCardProgressList({
  data,
}: {
  data: { name: string; percentage: number; hoverContent?: ReactNode }[];
}) {
  return (
    <div className="px-4">
      {data.map((value) => (
        <div key={value.name} className="my-5">
          <p className="flex text-lighterGray uppercase text-xs mb-1">
            <span className="flex-grow">{value.name}</span>
            <span>{value.percentage.toFixed(2)}%</span>
          </p>

          {value?.hoverContent ? (
            <Tooltip
              placement="top"
              overlay={value?.hoverContent || <></>}
              arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
              overlayStyle={{
                border: 5,
                borderRadius: 10,
                backgroundColor: 'white',
                opacity: 1,
                boxShadow: '0px 10px 30px -12px #8078a0',
              }}
              overlayInnerStyle={{
                border: 5,
                backgroundColor: 'white',
                borderRadius: 10,
              }}
            >
              <div className="Progress">
                <span
                  className="ProgressValue"
                  style={{ width: `${value.percentage}%` }}
                />
              </div>
            </Tooltip>
          ) : (
            <div className="Progress">
              <span
                className="ProgressValue"
                style={{ width: `${value.percentage}%` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
