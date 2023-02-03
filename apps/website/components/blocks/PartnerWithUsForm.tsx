import {
  IFormData,
  normalizeCmsImage,
  useSubmitFormData,
} from '@corpcare/shared/api';
import { createYupSchema } from '../../utils/createYupSchema';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IPartnerWithUsForm } from '../../types/block';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Grid, Keyboard, Navigation } from 'swiper';
import { CustomToast, SpinnerIcon } from '@corpcare/web/ui';
import { toast } from 'react-hot-toast';

export function PartnerWithUsForm({ data }: { data: IPartnerWithUsForm }) {
  const [reachedEnd, setReachedEnd] = useState(false);
  const [reachedStart, setReachedStart] = useState(true);
  const { mutate, isLoading, isSuccess } = useSubmitFormData();
  const form = data?.partnerForm?.data?.attributes;

  const yupSchema = form?.inputs?.reduce(createYupSchema, {});
  const formSchema = yup.object().shape(yupSchema);
  type formFields = yup.InferType<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formFields>({
    resolver: yupResolver(formSchema),
  });

  const handleFormSubmit = (data: any) => {
    const payload: IFormData = {
      token: 'partner-with-us-form',
      formName: 'partner-with-us-form',
      data: data,
      formOrigin: 'partner-with-us',
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
    <div className="w-full relative">
      <div className="flex flex-col-reverse lg:flex-row w-full lg:min-w-[71.25rem] lg:h-[48.25rem] py-10 lg:py-24 lg:px-10 px-5 gap-x-14 gap-y-20 relative container mx-auto">
        <div className="w-full lg:min-w-[37.5rem] min-h-[40rem] z-10 rounded-lg overflow-hidden">
          <section className="w-full border rounded-lg bg-white  mb-12 lg:mb-8 ">
            {isSuccess ? (
              <h1 className="text-[#191919] tracking-[0.02em] text-lg lg:text-xl font-medium lg:!leading-[30px] bg-lighter py-4 lg:py-6 px-5 lg:px-8">
                Form Submitted
              </h1>
            ) : (
              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className={classNames(
                  'mx-auto p-5 lg:p-7',
                  isLoading ? 'animate-pulse' : ''
                )}
              >
                <div className="grid grid-cols-2 gap-6">
                  {form?.inputs?.map((input, index) => {
                    const name = input?.name;
                    return (
                      <label className="col-span-2" key={index}>
                        <span className="Label">{input?.label}</span>
                        <input
                          type={input?.type}
                          {...register(`${input?.name}`)}
                          placeholder={input?.placeholder}
                          className={classNames(
                            'Input',
                            errors && errors[`${name}`] && 'border-brandError'
                          )}
                        />

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
                      form?.button?.theme === 'secondary' && 'OutlineButton'
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
            )}
          </section>
        </div>
        <div className="z-10 w-full lg:min-w-[30rem]">
          <h2
            className="z-10 font-medium text-lg lg:text-xl tracking-[0.02em] text-brand uppercase overflow-hidden before:h-[2px] after:h-[2px] after:bg-brand 
           after:inline-block after:relative after:align-middle after:w-6
           before:bg-brand before:inline-block before:relative before:align-middle 
           before:w-6 before:right-2 after:left-2 p-4"
          >
            {data?.heading}
          </h2>
          <h1 className="z-10 font-medium text-2xl lg:text-4xl tracking-[0.02em] text-[#191919] mb-2 lg:mb-4 ">
            {data?.subheading}
          </h1>

          <div className="relative">
            <Swiper
              slidesPerView={1}
              grid={{
                rows: 1,
              }}
              keyboard={{
                enabled: true,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={{
                prevEl: '.prev',
                nextEl: '.next',
              }}
              onSlideChange={({ isBeginning, isEnd }) => {
                setReachedStart(isBeginning);
                setReachedEnd(isEnd);
              }}
              modules={[Keyboard, Grid, Navigation]}
              className="!pb-16 lg:w-[40rem] flex justify-center"
            >
              {data?.partnersCards?.map((partner, index) => {
                const authorImage = normalizeCmsImage(partner?.authorImage);
                return (
                  <SwiperSlide key={index}>
                    <div className="w-[85vw] lg:w-[30rem] relative self-start">
                      <div
                        className="relative border border-brandLight bg-white p-5 lg:p-10 mt-8 lg:mt-16"
                        key={index}
                      >
                        <svg
                          width="60"
                          height="46"
                          viewBox="0 0 60 46"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="absolute -top-6 right-6"
                        >
                          <path
                            d="M22.5 0.5L0 23V45.5H22.5V0.5ZM60 0.5L37.5 23V45.5H60V0.5Z"
                            fill="#C5A265"
                          />
                        </svg>

                        <div className="relative flex justify-between items-start flex-col mb-4">
                          <p className="text-base lg:text-lg font-normal tracking-[0.02em] lg:leading-7 text-lightGray mt-5">
                            {partner?.comment}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <img
                            src={authorImage?.url}
                            alt={authorImage?.alternativeText}
                            className="object-cover w-[60px] h-[60px]"
                          />
                          <div className="text-left">
                            <p className="text-base lg:text-lg font-normal lg:leading-7 tracking-[0.02em] text-[#191919] capitalize">
                              {partner?.authorName}
                            </p>
                            <p className="text-xs lg:text-sm font-normal lg:leading-5 tracking-[0.02em] text-lightGray">
                              {partner?.authorDesignation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <section className="flex justify-start gap-x-5 absolute w-full -bottom-8 z-10">
              <div
                className={`prev bg-brand p-2 border-2 rounded-md ${
                  reachedStart
                    ? 'bg-brandLight cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
              >
                <svg
                  width="22"
                  height="16"
                  viewBox="0 0 22 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 9C21.5523 9 22 8.55228 22 8C22 7.44772 21.5523 7 21 7L21 9ZM0.292892 7.2929C-0.0976315 7.68342 -0.0976314 8.31658 0.292893 8.70711L6.65686 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928933C7.68054 0.538409 7.04738 0.538409 6.65685 0.928933L0.292892 7.2929ZM21 7L1 7L1 9L21 9L21 7Z"
                    fill="white"
                  />
                </svg>
              </div>

              <div
                className={`next bg-brand p-2  border-2 rounded-md  ${
                  reachedEnd
                    ? 'bg-brandLight cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
              >
                <svg
                  width="22"
                  height="16"
                  viewBox="0 0 22 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 9C0.447715 9 -4.82823e-08 8.55228 0 8C4.82823e-08 7.44772 0.447715 7 1 7L1 9ZM21.7071 7.2929C22.0976 7.68342 22.0976 8.31658 21.7071 8.70711L15.3431 15.0711C14.9526 15.4616 14.3195 15.4616 13.9289 15.0711C13.5384 14.6805 13.5384 14.0474 13.9289 13.6569L19.5858 8L13.9289 2.34315C13.5384 1.95262 13.5384 1.31946 13.9289 0.928933C14.3195 0.538409 14.9526 0.538409 15.3431 0.928933L21.7071 7.2929ZM1 7L21 7L21 9L1 9L1 7Z"
                    fill="white"
                  />
                </svg>
              </div>
            </section>
          </div>
        </div>
        <div className="absolute z-0 top-0 right-0 w-full lg:w-[52.5rem] h-[48.25rem] bg-[#F1ECE5]"></div>
      </div>
      <div className="absolute z-0 top-0 right-0 w-[50vw] h-[48.25rem] bg-[#F1ECE5]"></div>
    </div>
  );
}
