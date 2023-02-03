import { Layout } from '../../components/blocks/Layout';
import BlockManager from '../../components/shared/BlockManager';
import ReactPaginate from 'react-paginate';
import classNames from 'classnames';
import InsightCard from '../../components/shared/InsightCard';
import { useGetInsight } from '@corpcare/shared/api';
import { useState } from 'react';

const Articles = ({ global }) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { data } = useGetInsight(pageNumber);
  return (
    <Layout global={global} seo={data?.blocks?.seo}>
      {data?.pageData?.Blocks?.length !== 0 && (
        <BlockManager blocks={data?.blocks?.Blocks} />
      )}
      <div className="container mx-auto lg:px-10 px-5 py-16 lg:py-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  place-items-center">
          {data?.pageData?.map(({ attributes, id }, index) => (
            <InsightCard data={attributes} key={id + index} />
          ))}
          {data?.pageData?.length === 0 && (
            <div className="shadow-lg rounded-md p-4 bg-brand w-96 m-auto place-content-center col-span-1 md:col-span-2 lg:col-span-3">
              <div className="w-full h-full text-center">
                <div className="flex h-full flex-col justify-between">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white m-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-white text-xl font-bold mt-4">
                    We couldn&apos;t find what your&apos;e looking for
                  </p>
                </div>
              </div>
            </div>
          )}
          <ReactPaginate
            onPageChange={({ selected }) => setPageNumber(selected + 1)}
            pageCount={data?.pagination?.pageCount}
            containerClassName="flex items-center my-4 gap-4 text-base lg:text-lg capitalize col-span-1 md:col-span-2 lg:col-span-3 lg:justify-end justify-between px-4 pt-2"
            previousClassName={classNames(
              'px-4 py-2 bg-white rounded-md text-black',
              pageNumber && pageNumber <= data?.pagination?.total
                ? 'bg-brandLight cursor-not-allowed'
                : 'hover:bg-brand cursor-pointer hover:text-white'
            )}
            nextClassName={classNames(
              'px-4 py-2 bg-white rounded-md text-black',
              pageNumber && pageNumber <= data?.pagination?.pageCount
                ? 'bg-brandLight cursor-not-allowed'
                : 'hover:bg-brand cursor-pointer hover:text-white'
            )}
            previousLabel="previous"
            nextLabel="next"
            previousLinkClassName={classNames(
              pageNumber && pageNumber <= data?.pagination?.total
                ? 'hover:text-black cursor-not-allowed'
                : 'hover:text-white'
            )}
            nextLinkClassName={classNames(
              pageNumber && pageNumber <= data?.pagination?.pageCount
                ? 'hover:text-black cursor-not-allowed'
                : 'hover:text-white'
            )}
            pageClassName="lg:block hidden"
            breakLinkClassName="lg:block hidden"
            pageLinkClassName="bg-white rounded-md py-2 px-4 hover:bg-brand text-black hover:text-white lg:block hidden"
            activeLinkClassName="!bg-brand hover:!bg-white !text-white hover:!text-black"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Articles;
