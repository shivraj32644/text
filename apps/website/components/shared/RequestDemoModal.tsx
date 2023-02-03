import classNames from 'classnames';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CustomToast, SpinnerIcon } from '@corpcare/web/ui';
import { toast } from 'react-hot-toast';
import {
  IFormData,
  useSubmitFormData,
  mobileField,
} from '@corpcare/shared/api';
import { NextRouter, useRouter } from 'next/router';

const requestDemoFormSchema = yup.object({
  name: yup.string().label('Name').required(),
  email: yup.string().email().label('Email').required(),
  phone: mobileField.label('Phone').required(),
  company: yup.string().label('Company').required(),
});
type requestDemoFields = yup.InferType<typeof requestDemoFormSchema>;

export default function RequestDemoModal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  const { mutate, isLoading, isSuccess } = useSubmitFormData();
  const router = useRouter() as NextRouter;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<requestDemoFields>({
    resolver: yupResolver(requestDemoFormSchema),
  });

  const handleFormSubmit = (data: any) => {
    const payload: IFormData = {
      token: 'request-demo-form',
      formName: 'request-demo-form',
      data: data,
      formOrigin: 'request-demo',
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
        closeModal();
        router.push('/thank-you');
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
        <Dialog as="div" className="relative z-40" onClose={closeModal}>
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
            <div className="flex min-h-full items-center justify-center lg:p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex relative flex-col items-start p-5 lg:p-7 w-full max-w-3xl transform overflow-y-auto lg:rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                  <div
                    className="cursor-pointer flex justify-end w-full"
                    onClick={closeModal}
                  >
                    <svg
                      className=" w-6 h-6 lg:w-8 lg:h-8"
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
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-[1.75rem] lg:text-4xl font-medium tracking-[0.02em] leading-10 mb-5 lg:mb-10"
                  >
                    Join India’s first corporate treasury management platform.
                  </Dialog.Title>

                  <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className={classNames(
                      'mx-auto w-full',
                      isLoading ? 'animate-pulse' : ''
                    )}
                  >
                    <div className="grid grid-cols-2 gap-6">
                      <label className="col-span-2">
                        <span className="Label">Name</span>
                        <input
                          {...register('name')}
                          type="text"
                          placeholder="Enter your Name"
                          className={classNames(
                            'Input',
                            errors?.name && 'border-brandError'
                          )}
                        />

                        <span className="FieldError">
                          {errors?.name?.message}
                        </span>
                      </label>

                      <label className="lg:col-span-1 col-span-2">
                        <span className="Label">Email</span>
                        <input
                          {...register('email')}
                          type="email"
                          placeholder="Enter your email"
                          className={classNames(
                            'Input',
                            errors.email && 'border-brandError'
                          )}
                        />

                        <span className="FieldError">
                          {errors.email?.message}
                        </span>
                      </label>
                      <label className="lg:col-span-1 col-span-2">
                        <span className="Label">Phone</span>
                        <input
                          {...register('phone')}
                          type="tel"
                          placeholder="Enter your phone"
                          className={classNames(
                            'Input',
                            errors?.phone && 'border-brandError'
                          )}
                        />

                        <span className="FieldError">
                          {errors?.phone?.message}
                        </span>
                      </label>
                      <label className="col-span-2">
                        <span className="Label">Company</span>
                        <input
                          {...register('company')}
                          type="text"
                          placeholder="Enter your Company Name"
                          className={classNames(
                            'Input',
                            errors?.company && 'border-brandError'
                          )}
                        />

                        <span className="FieldError">
                          {errors?.company?.message}
                        </span>
                      </label>
                      <button
                        className="Button uppercase col-span-2 "
                        disabled={isLoading}
                      >
                        Request a demo
                        {isLoading && (
                          <SpinnerIcon className="w-6 h-6 text-white animate-spin fill-brand inline-flex ml-2" />
                        )}
                      </button>
                      <div className="col-span-2 text-center text-lightGray text-sm lg:text-base">
                        By signing up you agree to our terms of use.
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
