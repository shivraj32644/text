import {
  IFormData,
  normalizeCmsImage,
  useSubmitFormData,
} from '@corpcare/shared/api';
import * as yup from 'yup';
import { createYupSchema } from '../../utils/createYupSchema';
import { IContactUsForm } from '../../types/block';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { CustomToast, SpinnerIcon } from '@corpcare/web/ui';
import { toast } from 'react-hot-toast';

export function ContactUsForm({ data }: { data: IContactUsForm }) {
  const image = normalizeCmsImage(data.image);
  const form = data?.formContactUs?.data?.attributes;

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
      token: 'contact-us-form',
      formName: 'contact-us-form',
      data: data,
      formOrigin: 'contact-us',
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
    <div className="bg-white relative">
      {data?.miscellaneousFigure?.map((item, index) => {
        const figure = normalizeCmsImage(item?.figure);

        return (
          <div
            key={index}
            className={classNames(
              'absolute',
              item?.alignment === 'Top-Left' && 'top-0 left-0',
              item?.alignment === 'Top-Right' && 'top-0 right-0',
              item?.alignment === 'Bottom-Left' && 'bottom-0 left-0',
              item?.alignment === 'Bottom-Right' && 'bottom-0 right-0',
              item?.alignment === 'Center-Left' && 'bottom-1/2 left-0',
              item?.alignment === 'Center-Right' && 'bottom-1/2 right-0'
            )}
          >
            <img
              src={figure?.url}
              alt={figure?.alternativeText}
              className="object-cover w-auto h-auto"
            />
          </div>
        );
      })}
      <div className="flex flex-col lg:flex-row container mx-auto gap-y-10 lg:p-10 p-5">
        <div className="flex-1 flex justify-start items-center ">
          <div
            style={{
              backgroundImage: `url(${image?.url})`,
              backgroundSize: 'cover',
            }}
            className="h-[29.375rem] w-full lg:h-[40.375rem] lg:w-[28.75rem] 
                    flex flex-col justify-end items-center
                    rounded-md
                    pb-10 "
          >
            <h2 className="w-[11.125rem] lg:w-auto text-2xl lg:text-[1.75rem] tracking-[0.02em] text-white text-center font-medium">
              {data?.heading}
            </h2>
            <h3 className="text-base lg:text-lg tracking-[0.02em] text-white text-center">
              {data?.subheading}
            </h3>
          </div>
        </div>
        <div className="flex-1">
          <div className="lg:col-span-1 col-span-4 order-1 lg:order-2">
            <section className="border bg-white rounded-lg mb-12 lg:mb-8">
              <h1 className="text-[#191919] tracking-[0.02em] text-lg lg:text-xl font-medium lg:!leading-[30px] bg-lighter py-4 lg:py-6 px-5 lg:px-8 border-b">
                {form?.title}
              </h1>
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
                          {input?.type === 'textarea' ? (
                            <textarea
                              {...register(`${input?.name}`)}
                              placeholder={input?.placeholder}
                              className={classNames(
                                'Input',
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
                                'Input',
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
        </div>
      </div>
    </div>
  );
}
