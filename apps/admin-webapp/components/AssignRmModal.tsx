import {
  BlackCrossCircle,
  ChevronCircleArrowIcon,
  CustomToast,
  SearchIcon,
} from '@corpcare/web/ui';
import { Dispatch, Fragment, SetStateAction, useState } from 'react';
import {
  useAssignRelationshipManager,
  useGetRelationshipManagerList,
} from '@corpcare/shared/api';
import ReactPaginate from 'react-paginate';
import debounce from 'lodash/debounce';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { Disclosure, Dialog, Transition } from '@headlessui/react';
import AddNewRMModal from './AddNewRmModal';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const columns = [
  { key: 'name', name: 'Name' },
  { key: 'role_type', name: 'Role' },
  { key: 'clients', name: 'Total Clients' },
];

export default function AssignRmModal({
  isOpen,
  setIsOpen,
  rmType,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  rmType: 'Service' | 'Sales';
}) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { mutate } = useAssignRelationshipManager();
  const { data, isLoading } = useGetRelationshipManagerList(
    currentPage,
    searchTerm,
    rmType === 'Sales' ? 'sales' : 'service'
  );

  const { handleSubmit, control } = useForm();

  const handleSearchTextChange = debounce((text: string) => {
    setSearchTerm(text);
  }, 600);
  const handleFormSubit = (data) => {
    //
  };
  const router = useRouter();

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsOpen(false);
          }}
        >
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
                      Assign {rmType} RM
                    </p>
                    <BlackCrossCircle
                      className="h-6 w-6 hover:cursor-pointer text-white"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                    />
                  </Dialog.Title>
                  <div className="p-8 pb-16 overflow-y-auto">
                    <form
                      className="mb-4 flex"
                      onSubmit={handleSubmit(handleFormSubit)}
                    >
                      <div className="flex-grow flex justify-between">
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
                                placeholder={`Search ${rmType} RM`}
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
                      </div>

                      <button
                        className="Button uppercase"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Add new RM
                      </button>
                    </form>
                    <div className="bg-white rounded-lg border overflow-x-auto hidden lg:block">
                      <table className="border-hidden">
                        <thead>
                          <tr className="bg-brand text-white">
                            <th className="border-x-0 font-normal">ID</th>

                            {columns.map((column) => (
                              <th
                                className="border-x-0 font-normal"
                                key={column.key}
                              >
                                {column.name}
                              </th>
                            ))}

                            <th className="border-x-0 font-normal">Action</th>
                            <th className="border-x-0"></th>
                          </tr>
                        </thead>

                        <tbody className="bg-white text-lightGray">
                          {data?.results.length === 0 ? (
                            <tr>
                              <td className="border-x-0">
                                No Relationship Manager Found
                              </td>
                            </tr>
                          ) : (
                            data?.results?.map((row, idx) => {
                              return (
                                <tr key={row?.id + row?.name}>
                                  <td className="border-x-0">
                                    #&nbsp;{idx + 1}
                                  </td>

                                  {columns.map((column) => {
                                    return (
                                      <td
                                        className="border-x-0"
                                        key={column.key}
                                      >
                                        {column.key === 'role_type' ? (
                                          <>
                                            {row[column.key] === 'service'
                                              ? 'Service RM'
                                              : 'Sales RM'}
                                          </>
                                        ) : (
                                          row[column.key]
                                        )}
                                      </td>
                                    );
                                  })}

                                  <td className="border-x-0 py-2">
                                    <a
                                      className="OutlineButton py-1 uppercase font-normal cursor-pointer"
                                      onClick={() => {
                                        const client_id = router?.query
                                          ?.clientId as string;
                                        const rel_mgr_id = row?.id;
                                        const is_primary =
                                          rmType === 'Sales' ? false : true;
                                        mutate(
                                          { client_id, rel_mgr_id, is_primary },
                                          {
                                            onSuccess(data) {
                                              toast.custom((t) => (
                                                <CustomToast
                                                  t={t}
                                                  message={
                                                    data.message ||
                                                    'Successfully Assigned Relationship Manager.'
                                                  }
                                                  type="success"
                                                />
                                              ));
                                            },
                                            onError(err: Error) {
                                              toast.custom((t) => (
                                                <CustomToast
                                                  t={t}
                                                  message={
                                                    err.message ||
                                                    'Something went wrong! Please try again.'
                                                  }
                                                  type="error"
                                                />
                                              ));
                                            },
                                          }
                                        );
                                      }}
                                    >
                                      Assign
                                    </a>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                      {!isLoading && !!data?.count && (
                        <ReactPaginate
                          forcePage={currentPage - 1}
                          onPageChange={({ selected }) =>
                            setCurrentPage(selected + 1)
                          }
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
                    <section className="lg:hidden">
                      {data?.results?.length !== 0 ? (
                        <>
                          {data?.results?.map((rel, idx) => (
                            <div
                              key={idx}
                              className={classNames(
                                'bg-light rounded-lg divide-y mb-4'
                              )}
                            >
                              <Disclosure>
                                {({ open }) => (
                                  <>
                                    <Disclosure.Button className="py-3 px-5 flex justify-between items-center w-full">
                                      <section className="flex items-center gap-4">
                                        <p className="text-sm font-normal  text-left">
                                          {rel?.id}
                                        </p>
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
                                          <p>{rel[col?.key]}</p>
                                        </section>
                                      ))}
                                      <section className="flex gap-5 py-3 px-5 items-center justify-between">
                                        <p>Actions</p>
                                        <a className="OutlineButton py-1 uppercase font-normal">
                                          Assign
                                        </a>
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
                              onPageChange={({ selected }) =>
                                setCurrentPage(selected + 1)
                              }
                              pageCount={Math.ceil(data?.count / 10)}
                              containerClassName="flex items-center my-4 gap-4 text-base lg:text-lg capitalize col-span-1 lg:col-span-2 lg:justify-center justify-between"
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
                          No Relationship Manager Data Found
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
      <AddNewRMModal setIsOpen={setIsModalOpen} isOpen={isModalOpen} />
    </>
  );
}
