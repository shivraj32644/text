import Link from 'next/link';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  BalanceIcon,
  FixedDepositCard,
  PdfIcon,
  WatchListIcon,
} from '@corpcare/web/ui';

export function FixedDepositsSpotlight() {
  // const { spotlightFixedDeposits } = useGetSpotlightFixedDeposits();
  const spotlightFixedDeposits = Array(5)
    .fill(null)
    .map(() => ({
      id: 'icicibankfd',
      logo: '/favicon.png',
      name: 'ICICI Bank FD',
      details: {
        interestRates: '2.90-5.40%',
        tenure: '1 yr - 10 yrs',
        lockIn: '12 months',
        minDeposit: '₹ 10,000',
        maxDeposit: '₹ 1 Crore',
        rating: 'AAA',
      },
      pdfDownloadUrl: '/fixed-deposits/fdId/download/pdf',
    }));

  return (
    <>
      <div className="flex mb-4">
        <h3 className="flex-grow font-medium text-2xl text-lightGray">
          FDs in Spotlight
        </h3>

        <Link href="/fixed-deposits/all">
          <a className="font-semibold text-lightGray uppercase group hover:text-black bottom">
            <span className="Button px-2 py-1 font-normal text-white mr-3 group-hover:bg-brandDark">
              &#10230;
            </span>
            Explore ALL
          </a>
        </Link>
      </div>

      <Swiper
        spaceBetween={32}
        slidesPerView={1}
        modules={[Pagination]}
        className="pb-10"
        pagination={{ clickable: true }}
      >
        {spotlightFixedDeposits.map((fd) => (
          <SwiperSlide key={fd.id}>
            <FixedDepositCard
              link={`/fixed-deposits/details/${fd.id}`}
              name={fd.name}
              details={fd.details}
              logo={fd.logo}
              actions={
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="OutlineButton uppercase font-normal py-[6px]"
                  >
                    Invest Now
                  </button>

                  <a className="OutlineButton p-2" href={fd.pdfDownloadUrl}>
                    <PdfIcon />
                  </a>

                  <a
                    title="Watchlist"
                    className="OutlineButton p-2"
                    href="/watchlist"
                  >
                    <WatchListIcon />
                  </a>

                  <a
                    title="Compare"
                    className="OutlineButton p-2"
                    href="/compare"
                  >
                    <BalanceIcon />
                  </a>
                </div>
              }
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
