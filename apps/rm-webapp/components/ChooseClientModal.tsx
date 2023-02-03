import {
  BlackCrossCircle,
  ChevronCircleArrowIcon,
  CircularEclipse,
  SearchIcon,
} from '@corpcare/web/ui';
import { Dispatch, Fragment, SetStateAction, useState } from 'react';
import { useGetClientListData } from '@corpcare/shared/api';
import ReactPaginate from 'react-paginate';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { Disclosure, Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import debounce from 'lodash/debounce';
import { OnBoardingClientModal } from './OnBoardingClientModal';

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'can', name: 'CAN' },
  { key: 'name', name: 'Name' },
  // { key: 'category', name: 'Category' },
  { key: 'entity_type', name: 'Entity Type' },
];

export default function ChooseClientModal({
  isOpen,
  setIsOpen,
  pathName,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  pathName: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { data: clients, isLoading } = useGetClientListData(
    currentPage,
    searchTerm
  );
  const { handleSubmit, control } = useForm();

  const handleSearchTextChange = debounce((text: string) => {
    setSearchTerm(text);
  }, 600);
  const handleFormSubit = (data) => {
    //
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="flex justify-between border-b border-brandLight bg-lighter px-5 py-3 lg:px-10 lg:py-4">
                    <p className="font-medium text-lg lg:text-xl text-lightGray">
                      Choose Client
                    </p>
                    <BlackCrossCircle
                      className="h-6 w-6 hover:cursor-pointer text-white"
                      onClick={() => setIsOpen(false)}
                    />
                  </Dialog.Title>
                  <div className="p-4 pb-8 lg:p-8 h-full lg:pb-16 overflow-y-auto">
                    <form
                      className="mb-6 flex justify-between"
                      onSubmit={handleSubmit(handleFormSubit)}
                    >
                      <div className="relative">
                        <Controller
                          control={control}
                          name="search"
                          render={({
                            field: { onChange, onBlur, value, name, ref },
                            fieldState: { isTouched, isDirty, error },
                            formState,
                          }) => (
                            <input
                              className="Input max-w-xs border-brand mr-4 pr-10"
                              placeholder="Search Clients"
                              value={value}
                              onChange={(event) => {
                                onChange(event?.target?.value);
                                handleSearchTextChange(event?.target?.value);
                              }}
                              name={name}
                            />
                          )}
                        />

                        <SearchIcon className="absolute top-3 right-2 flex items-center lg:w-6 w-4 lg:h-6 h-4 text-lightGray lg:pr-2" />
                      </div>

                      <div
                        className="Button uppercase cursor-pointer self-center"
                        onClick={() => setIsModalOpen(true)}
                      >
                        onboard client
                      </div>
                    </form>

                    <div className="bg-white rounded-lg border overflow-x-auto hidden lg:block">
                      <table className="border-hidden">
                        <thead>
                          <tr className="bg-brand text-white">
                            {columns.map((column) => (
                              <th
                                className="border-x-0 font-normal"
                                key={column.key}
                              >
                                {column.name}
                              </th>
                            ))}

                            <th className="border-x-0 font-normal">Action</th>
                            <th className="border-x-0 font-normal"></th>
                          </tr>
                        </thead>

                        <tbody className="bg-white text-lightGray">
                          {clients?.results?.length === 0 ? (
                            <tr>
                              <td className="border-x-0">No Clients Found</td>
                            </tr>
                          ) : (
                            clients?.results?.map((row, index) => (
                              <tr key={row.id}>
                                {columns.map((column) => (
                                  <td
                                    className="border-x-0 capitalize"
                                    key={column.key}
                                  >
                                    {row[column?.key]}
                                  </td>
                                ))}

                                <td className="border-x-0 py-2">
                                  <button
                                    onClick={() => {
                                      router.push({
                                        pathname: pathName,
                                        query: {
                                          client_id: row?.id,
                                        },
                                      });
                                      setIsOpen(false);
                                    }}
                                  >
                                    <a className="OutlineButton py-1 uppercase font-normal">
                                      Select
                                    </a>
                                  </button>
                                </td>
                                <td className="border-x-0 py-2">
                                  <CircularEclipse className="text-brand" />
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                      {!isLoading && !!clients?.count && (
                        <ReactPaginate
                          forcePage={currentPage - 1}
                          onPageChange={({ selected }) =>
                            setCurrentPage(selected + 1)
                          }
                          pageCount={Math.ceil(clients?.count / 10)}
                          containerClassName="flex items-center my-4 gap-4 text-base lg:text-lg capitalize col-span-1 lg:col-span-2 lg:justify-end justify-between border-t px-4 pt-2"
                          previousClassName={classNames(
                            'px-4 py-2 bg-white rounded-md text-black',
                            clients?.previous === null
                              ? 'bg-brandLight cursor-not-allowed'
                              : 'hover:bg-brand cursor-pointer hover:text-white'
                          )}
                          nextClassName={classNames(
                            'px-4 py-2 bg-white rounded-md text-black',
                            clients?.next === null
                              ? 'bg-brandLight cursor-not-allowed'
                              : 'hover:bg-brand cursor-pointer hover:text-white'
                          )}
                          previousLabel="previous"
                          nextLabel="next"
                          previousLinkClassName={classNames(
                            clients?.previous === null
                              ? 'hover:text-black cursor-not-allowed'
                              : 'hover:text-white'
                          )}
                          nextLinkClassName={classNames(
                            clients?.next === null
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
                    <section className="lg:hidden">
                      {clients?.results?.length !== 0 ? (
                        <>
                          {clients?.results?.map((client, idx) => (
                            <div
                              key={idx}
                              className={classNames(
                                'bg-white rounded-lg divide-y mb-4'
                              )}
                            >
                              <Disclosure>
                                {({ open }) => (
                                  <>
                                    <Disclosure.Button className="py-3 px-5 flex justify-between items-center w-full">
                                      <section className="flex items-center gap-4">
                                        <p className="text-sm font-normal  text-left">
                                          {client?.id}
                                        </p>

                                        <CircularEclipse className="text-brand" />
                                      </section>
                                      <span
                                        className={classNames(
                                          'px-2 rounded-full  transition-transform',
                                          open ? '-rotate-180' : ''
                                        )}
                                      >
                                        <ChevronCircleArrowIcon className="w-5 h-5" />
                                      </span>
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="flex flex-col divide-y">
                                      {columns.map((col, index) => (
                                        <section
                                          className="flex justify-between items-center py-3 px-5 "
                                          key={index}
                                        >
                                          <p>{col?.name}</p>
                                          <p className="capitalize">
                                            {client[col?.key]}
                                          </p>
                                        </section>
                                      ))}
                                      <section className="flex gap-5 py-3 px-5 items-center justify-between">
                                        <p>Actions</p>
                                        <button
                                          onClick={() => {
                                            router.push({
                                              pathname: pathName,
                                              query: {
                                                client_id: client?.id,
                                              },
                                            });
                                            setIsOpen(false);
                                          }}
                                        >
                                          <a className="OutlineButton py-1 uppercase font-normal">
                                            Select
                                          </a>
                                        </button>
                                      </section>
                                    </Disclosure.Panel>
                                  </>
                                )}
                              </Disclosure>
                            </div>
                          ))}
                          {!isLoading && !!clients?.count && (
                            <ReactPaginate
                              forcePage={currentPage - 1}
                              onPageChange={({ selected }) =>
                                setCurrentPage(selected + 1)
                              }
                              pageCount={Math.ceil(clients?.count / 10)}
                              containerClassName="flex items-center my-4 gap-4 text-base lg:text-lg capitalize col-span-1 lg:col-span-2 lg:justify-center justify-between"
                              previousClassName={classNames(
                                'px-4 py-2 bg-white rounded-md text-black',
                                clients?.previous === null
                                  ? 'bg-brandLight cursor-not-allowed'
                                  : 'hover:bg-brand cursor-pointer hover:text-white'
                              )}
                              nextClassName={classNames(
                                'px-4 py-2 bg-white rounded-md text-black',
                                clients?.next === null
                                  ? 'bg-brandLight cursor-not-allowed'
                                  : 'hover:bg-brand cursor-pointer hover:text-white'
                              )}
                              previousLabel="previous"
                              nextLabel="next"
                              previousLinkClassName={classNames(
                                clients?.previous === null
                                  ? 'hover:text-black cursor-not-allowed'
                                  : 'hover:text-white'
                              )}
                              nextLinkClassName={classNames(
                                clients?.next === null
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
                          No Clients Found
                        </h3>
                      )}
                    </section>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <OnBoardingClientModal setIsOpen={setIsModalOpen} isOpen={isModalOpen} />
    </>
  );
}
