import { createYupSchema } from '../../utils/createYupSchema';
import classNames from 'classnames';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IForm } from '../../types/shared';
import { CustomToast, SpinnerIcon } from '@corpcare/web/ui';
import { toast } from 'react-hot-toast';
import { IFormData, useSubmitFormData } from '@corpcare/shared/api';

export default function FormModal({
  form,
  isOpen,
  closeModal,
}: {
  form?: IForm;
  isOpen: boolean;
  closeModal: () => void;
}) {
  const yupSchema = form?.inputs?.reduce(createYupSchema, {});
  const formSchema = yup.object().shape(yupSchema);
  type formFields = yup.InferType<typeof formSchema>;
  const { mutate, isLoading, isSuccess } = useSubmitFormData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formFields>({
    resolver: yupResolver(formSchema),
  });

  const handleFormSubmit = (data: any) => {
    const payload: IFormData = {
      token: 'query-support-form',
      formName: 'query-support-form',
      data: data,
      formOrigin: 'query-support',
    };
    mutate(payload, {
      onSuccess() {
        toast.custom((t) => (
          <CustomToast
            t={t}
            message={'Successfully Submitted Details'}
            type="success"
          />
        ));
      },
      onError(err: any) {
        toast.custom((t) => (
          <CustomToast
            t={t}
            message={'Something went wrong! Please try again.'}
            type="error"
          />
        ));
      },
    });
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={closeModal}>
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

          <div className="max-w-full fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full h-[100vh] lg:w-[48.75rem] lg:h-[40rem] overflow-scroll transform  bg-white  lg:p-6 text-left rounded-md align-middle shadow-xl transition-all">
                  <div className="flex relative">
                    <Dialog.Title
                      as="h3"
                      className="text-[1.75rem]  lg:text-4xl font-medium tracking-[0.02em] leading-10 p-5 lg:px-0 lg:mr-5"
                    >
                      {form?.title}
                    </Dialog.Title>
                    <span
                      className="absolute top-1 lg:-top-2 right-2 cursor-pointer"
                      onClick={closeModal}
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="16"
                          cy="16"
                          r="15"
                          fill="white"
                          stroke="#191919"
                          strokeWidth="2"
                        />
                        <line
                          x1="1"
                          y1="-1"
                          x2="16.7881"
                          y2="-1"
                          transform="matrix(0.682563 0.730827 -0.682563 0.730827 10 10)"
                          stroke="#191919"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <line
                          x1="1"
                          y1="-1"
                          x2="16.7881"
                          y2="-1"
                          transform="matrix(0.682563 -0.730827 0.682563 0.730827 10.8594 23)"
                          stroke="#191919"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </div>

                  <section className="w-full rounded-lg bg-white  mb-12 lg:mb-8 ">
                    <form
                      onSubmit={handleSubmit(handleFormSubmit)}
                      className={classNames(
                        'mx-auto p-5 lg:p-7',
                        isLoading ? 'animate-pulse' : ''
                      )}
                    >
                      <div className="flex flex-col lg:grid grid-cols-2 gap-6">
                        {form?.inputs?.map((input, index) => {
                          const name = input?.name || '';

                          return (
                            <label
                              className={classNames(
                                `col-span-${
                                  name === 'email' || name === 'phone'
                                    ? '1'
                                    : '2'
                                }`
                              )}
                              key={index}
                            >
                              <span className="Label">{input?.label}</span>
                              {input?.type === 'textarea' ? (
                                <textarea
                                  {...register(`${input?.name}`)}
                                  placeholder={input?.placeholder}
                                  className={classNames(
                                    'Input border-black',
                                    errors &&
                                      errors[`${name}`] &&
                                      'border-brandError'
                                  )}
                                />
                              ) : (
                                <input
                                  type={input?.type}
                                  {...register(`${input?.name}`)}
                                  placeholder={input?.placeholder}
                                  className={classNames(
                                    'Input border-black',
                                    errors &&
                                      errors[`${name}`] &&
                                      'border-brandError'
                                  )}
                                />
                              )}

                              <span className="FieldError">
                                {!!errors[`${name}`]?.message &&
                                  errors[`${name}`].message}
                              </span>
                            </label>
                          );
                        })}

                        <button
                          className={classNames(
                            'Button col-span-2 uppercase',
                            form?.button?.theme === 'primary' && 'Button',
                            form?.button?.theme === 'secondary' &&
                              'OutlineButton'
                          )}
                          type="submit"
                          disabled={isLoading}
                        >
                          {form?.button?.label}
                          {isLoading && (
                            <SpinnerIcon className="w-6 h-6 text-white animate-spin fill-brand inline-flex ml-2" />
                          )}
                        </button>
                      </div>
                    </form>
                  </section>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
