import { ReactElement } from 'react';
import {
  ProfileTabsLayout,
  AuthenticatedDashboardLayout,
  RemoveCANProfile,
  AddCANProfile,
} from '../../components/index';
import {
  useGetAccountCANsList,
  useGetAccountInfoData,
} from '@corpcare/shared/api';
import { BrandPlusAddIcon, ChevronCircleArrowIcon } from '@corpcare/web/ui';
import { Disclosure } from '@headlessui/react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { createRef, useMemo, useState } from 'react';

const CANPage = () => {
  const [isRemoveCANOpen, setIsRemoveCANOpen] = useState<boolean>(false);
  const [isAddCANOpen, setIsAddCANOpen] = useState<boolean>(false);
  const { data: account } = useGetAccountInfoData();
  const router = useRouter();
  const { data: cansList, isLoading } = useGetAccountCANsList();

  const refs = useMemo(() => {
    return (
      cansList?.items?.map(() => {
        return createRef<HTMLButtonElement>();
      }) ?? []
    );
  }, [cansList]);

  function handleClosingOthers(id?: string) {
    const otherRefs = refs.filter((ref) => {
      return ref.current?.getAttribute('data-id') !== id;
    });

    otherRefs.forEach((ref) => {
      const isOpen = ref.current?.getAttribute('data-open') === 'true';

      if (isOpen) {
        ref.current?.click();
      }
    });
  }
  return (
    <ProfileTabsLayout>
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
        <div className="relative">
          <div
            className={classNames(
              'lg:bg-white mt-6 lg:mt-8 flex lg:p-8 gap-4 lg:flex-row flex-col',
              account?.is_kyc_verified ? '' : 'opacity-20 pointer-events-none'
            )}
          >
            <div
              className={classNames(
                'Card p-0 overflow-hidden w-full lg:w-1/2 min-h-[240px]',
                cansList?.items?.length === 0 &&
                  'flex justify-center items-center'
              )}
            >
              {cansList?.items?.length === 0 ? (
                <h3 className="text-center font-medium text-lg lg:text-xl text-lightGray flex items-center justify-center h-full">
                  No CAN Registered
                </h3>
              ) : (
                cansList?.items?.map((item, index) => (
                  <Disclosure key={item?.id} as="div">
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={classNames(
                            'py-3 px-5 lg:px-10 flex justify-between items-center w-full',
                            !open && 'border-b'
                          )}
                          ref={refs[index]}
                          data-id={item?.id}
                          data-open={open}
                          onClick={() => handleClosingOthers(item?.id)}
                        >
                          <div className="flex items-center gap-4 flex-wrap">
                            <h4 className="bg-lighter  text-darkGray text-sm lg:text-base font-medium text-left truncate">
                              CAN - {item?.can_number}
                            </h4>
                            <p className="text-xs lg:text-sm font-normal tracking-[0.02em] text-white bg-brand rounded-lg px-3 py-1 capitalize">
                              {item?.status?.toLocaleLowerCase()}
                            </p>
                          </div>
                          <span
                            className={classNames(
                              'px-2 rounded-full  transition-transform flex',
                              open ? '-rotate-180' : ''
                            )}
                          >
                            <ChevronCircleArrowIcon className="w-5 h-5 flex-shrink-0" />
                          </span>
                        </Disclosure.Button>
                        <Disclosure.Panel className="flex flex-col divide-y">
                          <div className="lg:border-y px-5 lg:px-10 py-5 lg:bg-lighter uppercase text-center flex justify-around gap-2 pointer-events-none opacity-25">
                            <button
                              className="Button  uppercase w-full text-sm lg:text-base"
                              onClick={() => setIsRemoveCANOpen(true)}
                            >
                              remove can
                            </button>
                            <button
                              className="OutlineButton uppercase w-full text-sm lg:text-base"
                              onClick={() => router.push('/profile/edit-nct')}
                            >
                              modify can
                            </button>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))
              )}
            </div>
            <div className="Card border bg-lighter border-brandLight w-full lg:w-1/2  items-center justify-center flex-col gap-2 flex min-h-[240px]">
              <BrandPlusAddIcon
                onClick={() => setIsAddCANOpen(true)}
                className="hover:cursor-pointer text-white h-12 w-12 bg-brand rounded p-2"
              />
              <p className="text-2xl font-medium text-lightGray uppercase">
                ADD CAN
              </p>
            </div>
            <RemoveCANProfile
              isOpen={isRemoveCANOpen}
              setIsOpen={setIsRemoveCANOpen}
            />
            <AddCANProfile isOpen={isAddCANOpen} setIsOpen={setIsAddCANOpen} />
          </div>
          {!account?.is_kyc_verified && !isLoading ? (
            <div className="absolute inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <div className="w-full max-w-xs  transform overflow-hidden rounded-lg bg-white text-center align-middle shadow-xl transition-all">
                  <section className="flex flex-col py-6 px-20 gap-4">
                    <section className="text-2xl font-medium text-darkGray flex items-center flex-col">
                      Verify KYC to proceed further
                    </section>
                    <button
                      className="Button uppercase w-40 text-base font-semibold"
                      onClick={() =>
                        router.push({
                          pathname: '/profile/kyc-verification',
                          hash: 'basic-details',
                        })
                      }
                    >
                      VERIFY KYC
                    </button>
                  </section>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </ProfileTabsLayout>
  );
};

export default CANPage;

CANPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
