export const DashboardRatingProfile = ({ rating }) => {
  return (
    <>
      <h4 className="font-medium px-5">Rating Profile</h4>
      <section className="flex justify-between items-center mt-2 px-5 mb-4">
        <div className="font-normal text-sm ">
          <p className="text-lightGray">Current Value</p>
          <p className="text-black mt-1">Rs. {Math.round(rating.currentVal)}</p>
        </div>
        <div className="font-normal text-sm ">
          <p className="text-lightGray">Exposure</p>
          <p className="text-black mt-1">Rs. {Math.round(rating.exposure)}</p>
        </div>
      </section>
      <section className="overflow-y-auto px-5 h-[400px] border-t-2 border-light">
        <section className="h-full w-full">
          {rating.chartData.map((_data) => (
            <div key={_data.name} className="mt-5">
              <p className="flex text-lighterGray uppercase text-xs mb-1">
                <span className="flex-grow">{_data.name}</span>
                <span>{_data.exposure.toPrecision(3)}%</span>
              </p>

              <div className="Progress">
                <span
                  className="ProgressValue"
                  style={{ width: `${_data.exposure.toPrecision(2)}%` }}
                />
              </div>
            </div>
          ))}
        </section>
      </section>
    </>
  );
};
