import {
  CART_TYPE,
  ICart,
  useDeleteMfCartItem,
  useGetProfile,
} from '@corpcare/shared/api';
import { BlackCrossCircle, CustomToast, InrFormatter } from '@corpcare/web/ui';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
export const SIPCartSection = ({
  data,
  isLoading,
  can_number,
}: {
  data: ICart | undefined;
  isLoading: boolean;
  can_number: string | undefined;
}) => {
  const router = useRouter();
  const { mutate } = useDeleteMfCartItem();
  const { data: profile } = useGetProfile();
  const accountId = profile?.accounts?.[0]?.id || '';

  if (isLoading) {
    return (
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
    );
  }
  return (
    <section className="lg:p-8 rounded-lg lg:bg-white grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 min-h-full">
      {data && Object.keys(data).length !== 0 ? (
        <>
          <div className="space-y-8">
            {data?.cart_items?.map((item) => (
              <div key={item.id} className="Card p-0 overflow-hidden">
                <h5 className="bg-lighter px-5 lg:px-10 py-5 border-b text-base lg:text-lg flex">
                  <span className="flex-grow">{item?.mf_scheme_name}</span>
                  <BlackCrossCircle
                    className="text-white w-6 h-6 hover:cursor-pointer flex-shrink-0"
                    onClick={() => {
                      const cart_id = data?.id;
                      const mf_scheme_id = item?.mf_scheme;
                      const mf_cart_item_id = item?.id;
                      mutate(
                        { cart_id, accountId, mf_scheme_id, mf_cart_item_id },
                        {
                          onSuccess(data, variables, context) {
                            toast.custom((t) => (
                              <CustomToast
                                t={t}
                                message={
                                  data?.message ||
                                  'SuccessFully removed item from cart.'
                                }
                                type="success"
                              />
                            ));
                          },
                          onError(error: any) {
                            toast.custom((t) => (
                              <CustomToast
                                t={t}
                                message={
                                  error?.message ||
                                  'Failed to remove item to cart! Please try again.'
                                }
                                type="error"
                              />
                            ));
                          },
                        }
                      );
                    }}
                  />
                </h5>
                <div className="grid grid-cols-2 text-sm">
                  <div className="border-r px-5 lg:px-10 py-5">
                    <div className="text-lighterGray mb-1">Txn. Type</div>
                    <div className="text-darkGray">
                      {data?.transaction_type}
                    </div>
                  </div>
                  <div className="px-5 lg:px-10 py-5 text-sm">
                    <div className="text-lighterGray mb-1">AMC</div>
                    <div className="text-darkGray">
                      {item?.mf_scheme_amc_name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="Card overflow-hidden p-0 flex flex-col bg-white">
            <h3 className="bg-brandLight px-5 py-3 lg:p-6 text-sm lg:text-base">
              Order Summary
            </h3>

            <div className="lg:border-b">
              <table className="border-hidden">
                <thead>
                  <tr className="text-lightGray lg:text-base text-sm">
                    <th className="px-5 py-4 lg:py-5 lg:px-8 lg:border border-0">
                      Product
                    </th>
                    <th className="px-5 py-4 lg:py-5 lg:px-8 lg:border border-0">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.cart_items?.map((item) => (
                    <tr className="lg:text-base text-sm" key={item?.id}>
                      <td className="px-5 py-2 lg:py-5 lg:px-8 lg:border border-0">
                        {item?.mf_scheme_name}
                      </td>
                      <td className="px-5 py-2 lg:py-5 lg:px-8 lg:border border-0">
                        {InrFormatter.format(item?.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-semibold text-lightGray text-sm lg:text-base">
                    <td className="px-5 py-2 lg:py-5 lg:px-8 lg:border border-0">
                      Total
                    </td>
                    <td className="px-5 py-2 lg:py-5 lg:px-8 lg:border border-0">
                      {InrFormatter.format(data?.total_amount)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="mt-auto bg-lighter grid-cols-1 p-5 lg:p-8 border-t gap-6 text-sm  hidden lg:grid">
              <button
                className="Button py-4 uppercase"
                onClick={() =>
                  router.push({
                    pathname: '/mutual-funds/cart/transaction',
                    query: {
                      cart_id: data.id,
                      transaction_type: CART_TYPE.SIP,
                      can_number: can_number,
                    },
                  })
                }
              >
                Buy Now
              </button>
            </div>
          </div>
          <div className="mt-auto grid grid-cols-1 gap-6 text-sm lg:hidden mb-12">
            <button
              className="Button py-4 uppercase"
              onClick={() =>
                router.push({
                  pathname: '/mutual-funds/cart/transaction',
                  query: {
                    cart_id: data.id,
                    transaction_type: CART_TYPE.SIP,
                    can_number: can_number,
                  },
                })
              }
            >
              Buy Now
            </button>
          </div>
        </>
      ) : (
        <div className="bg-white py-5 px-4 lg:p-8 col-span-1 lg:col-span-2">
          <div className="flex flex-col items-center justify-center h-full">
            <section>
              <img src="/empty-add-to-cart.png" alt="corpcare_cart" />
            </section>
            <section className="flex flex-col items-center justify-center space-y-4 text-center">
              <p className="text-2xl font-medium text-lightGray">
                Your cart looks is empty!
              </p>
              <small className="text-base font-normal text-lightGray">
                Add some funds to your card by navigating to Mutual Funds.
              </small>
              <button
                className="Button uppercase py-3 px-5"
                onClick={() => router.push('/mutual-funds/all')}
              >
                BUY MUTUAL FUNDS
              </button>
            </section>
          </div>
        </div>
      )}
    </section>
  );
};
