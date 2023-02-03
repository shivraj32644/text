import { TriangleDownIcon } from '@corpcare/web/ui';

export const MarketUpdateGlobal = () => {
  return (
    <section>
      <p className="text-black text-sm lg:text-base font-medium mb-2">
        Market Update - Global
      </p>
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((_, idx) => (
          <section className="grid grid-cols-4" key={idx}>
            <p className="col-span-3 text-sm text-lightGray font-medium space-x-4">
              <span className="text-black text-sm lg:text-base">
                S&P BSE Sensex
              </span>
              <span>58,644.12</span>
            </p>
            <p className="col-span-2 text-sm text-black font-medium space-x-4 flex">
              <span>38.7</span>
              <span className="flex">
                <TriangleDownIcon className="text-brandError mr-1 w-3 lg:w-4 h-4" />
                -0.07%
              </span>
            </p>
          </section>
        ))}
      </div>
    </section>
  );
};
