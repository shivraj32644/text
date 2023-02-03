import { IUnAssignedRM } from '@corpcare/shared/api';
import { ChevronCircleArrowIcon } from '@corpcare/web/ui';
import { Disclosure } from '@headlessui/react';
import classNames from 'classnames';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import ReactPaginate from 'react-paginate';

const columns = [
  { key: 'default_can_number', name: 'CAN' },
  { key: 'name', name: 'Name' },
  { key: 'account_type', name: 'Category' },
];

export function DashboardUnassignedRMs({
  data,
  setCurrentPage,
  currentPage,
  isLoading,
}: {
  data: IUnAssignedRM | undefined;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  isLoading: boolean;
}) {
  return (
    <div>
      <h3 className="font-medium text-xl lg:text-2xl text-lightGray mb-4">
        Unassigned RMs
      </h3>

      {isLoading ? (
        <div className="flex justify-center  items-center h-full">
          <div role="status" className="relative">
            <svg
              aria-hidden="true"
              className="mr-2 w-8 h-8 text-white animate-spin  fill-brand"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-x-auto hidden lg:block">
          <table className="border-hidden">
            <thead>
              <tr className="bg-brand text-white">
                {columns.map((column) => (
                  <th className="border-x-0 font-normal" key={column.key}>
                    {column.name}
                  </th>
                ))}

                <th className="border-x-0 font-normal">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white text-lightGray">
              {data?.count !== 0 || data?.items?.length === 0 ? (
                data?.items?.map((row) => (
                  <tr key={row?.id}>
                    {columns.map((column) => {
                      if (column?.key === 'account_type') {
                        return (
                          <td
                            className={classNames('border-x-0')}
                            key={column?.key}
                          >
                            {row?.account_type === 'individual'
                              ? 'Individual'
                              : 'Non Individual'}
                          </td>
                        );
                      }
                      return (
                        <td
                          className={classNames(
                            'border-x-0',
                            column?.key !== 'id' && 'capitalize'
                          )}
                          key={column?.key}
                        >
                          {row[column?.key] === null || row[column?.key] === ''
                            ? 'Not Available'
                            : row[column?.key]}
                        </td>
                      );
                    })}

                    <td className="border-x-0">
                      <Link href={`/clients/details/${row?.id}`}>
                        <a className="OutlineButton py-1 px-6 font-normal uppercase">
                          View
                        </a>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border-x-0">
                    <h3 className="text-left font-medium text-lg lg:text-xl text-lightGray ">
                      No Unassigned RMs Found
                    </h3>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {!isLoading && !!data?.count && (
            <ReactPaginate
              forcePage={currentPage - 1}
              onPageChange={({ selected }) => setCurrentPage(selected + 1)}
              pageCount={Math.ceil(data?.count / 10)}
              containerClassName="flex items-center my-4 gap-4 text-base lg:text-lg capitalize col-span-1 lg:col-span-2 lg:justify-end justify-between border-t px-4 pt-2"
              previousClassName={classNames(
                'px-4 py-2 bg-white rounded-md text-black',
                data?.previous === null
                  ? 'bg-brandLight cursor-not-allowed'
                  : 'hover:bg-brand cursor-pointer hover:text-white'
              )}
              nextClassName={classNames(
                'px-4 py-2 bg-white rounded-md text-black',
                data?.next === null
                  ? 'bg-brandLight cursor-not-allowed'
                  : 'hover:bg-brand cursor-pointer hover:text-white'
              )}
              previousLabel="previous"
              nextLabel="next"
              previousLinkClassName={classNames(
                data?.previous === null
                  ? 'hover:text-black cursor-not-allowed'
                  : 'hover:text-white'
              )}
              nextLinkClassName={classNames(
                data?.next === null
                  ? 'hover:text-black cursor-not-allowed'
                  : 'hover:text-white'
              )}
              pageClassName="lg:block hidden"
              breakLinkClassName="lg:block hidden"
              pageLinkClassName="bg-white rounded-md py-2 px-4 hover:bg-brand text-black hover:text-white lg:block hidden"
              activeLinkClassName="!bg-brand hover:!bg-white !text-white hover:!text-black"
            />
          )}
        </div>
      )}
      <section className="lg:hidden">
        {isLoading ? (
          <div className="flex justify-center  items-center h-full">
            <div role="status" className="relative">
              <svg
                aria-hidden="true"
                className="mr-2 w-8 h-8 text-white animate-spin  fill-brand"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : data?.count !== 0 || data?.items?.length === 0 ? (
          <>
            {data?.items?.map((row, idx) => (
              <div
                key={idx}
                className={classNames('bg-white rounded-lg divide-y mb-4')}
              >
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="py-3 px-5 flex justify-between items-center w-full">
                        <section className="flex flex-col items-start">
                          <p className="text-sm font-normal  text-left capitalize">
                            {row?.name}
                          </p>
                        </section>
                        <span
                          className={classNames(
                            'px-2 rounded-full  transition-transform',
                            open ? '-rotate-180' : ''
                          )}
                        >
                          <ChevronCircleArrowIcon className="w-5 h-5 flex-shrink-0" />
                        </span>
                      </Disclosure.Button>
                      <Disclosure.Panel className="flex flex-col divide-y">
                        {columns?.map((col, index) => (
                          <section
                            className="flex justify-between items-center py-3 px-5 text-sm gap-4"
                            key={index}
                          >
                            <p>{col?.name}</p>
                            {col?.key !== 'account_type' ? (
                              <p
                                className={classNames(
                                  'truncate',
                                  col.key !== 'id' && 'capitalize'
                                )}
                              >
                                {row[col?.key] === null || row[col?.key] === ''
                                  ? 'Not Available'
                                  : row[col?.key]}
                              </p>
                            ) : (
                              <p>
                                {row[col.key] === 'individual'
                                  ? 'Individual'
                                  : 'Non Individual'}
                              </p>
                            )}
                          </section>
                        ))}
                        <section className="py-3 px-5 cursor-pointer text-right text-sm">
                          <Link href={`/clients/details/${row.id}`}>
                            <a className="OutlineButton py-1 uppercase font-normal text-sm">
                              View
                            </a>
                          </Link>
                        </section>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            ))}
            {!isLoading && !!data?.count && (
              <ReactPaginate
                forcePage={currentPage - 1}
                onPageChange={({ selected }) => setCurrentPage(selected + 1)}
                pageCount={Math.ceil(data?.count / 10)}
                containerClassName="flex items-center my-4 gap-4 text-base lg:text-lg capitalize col-span-1 lg:col-span-2 lg:justify-end justify-between px-4 pt-2"
                previousClassName={classNames(
                  'px-4 py-2 bg-white rounded-md text-black',
                  data?.previous === null
                    ? 'bg-brandLight cursor-not-allowed'
                    : 'hover:bg-brand cursor-pointer hover:text-white'
                )}
                nextClassName={classNames(
                  'px-4 py-2 bg-white rounded-md text-black',
                  data?.next === null
                    ? 'bg-brandLight cursor-not-allowed'
                    : 'hover:bg-brand cursor-pointer hover:text-white'
                )}
                previousLabel="previous"
                nextLabel="next"
                previousLinkClassName={classNames(
                  data?.previous === null
                    ? 'hover:text-black cursor-not-allowed'
                    : 'hover:text-white'
                )}
                nextLinkClassName={classNames(
                  data?.next === null
                    ? 'hover:text-black cursor-not-allowed'
                    : 'hover:text-white'
                )}
                pageClassName="lg:block hidden"
                breakLinkClassName="lg:block hidden"
                pageLinkClassName="bg-white rounded-md py-2 px-4 hover:bg-brand text-black hover:text-white lg:block hidden"
                activeLinkClassName="!bg-brand hover:!bg-white !text-white hover:!text-black"
              />
            )}
          </>
        ) : (
          <h3 className="text-center font-medium text-lg lg:text-xl text-lightGray col-span-1 lg:col-span-2">
            No Unassigned RMs Found
          </h3>
        )}
      </section>
    </div>
  );
}
