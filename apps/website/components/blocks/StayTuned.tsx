import {
  IFormData,
  normalizeCmsImage,
  useSubmitFormData,
} from '@corpcare/shared/api';
import { IStayTuned } from '../../types/block';
import classNames from 'classnames';
import { createYupSchema } from '../../utils/createYupSchema';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomToast, SpinnerIcon } from '@corpcare/web/ui';
import { toast } from 'react-hot-toast';

export function StayTuned({ data }: { data: IStayTuned }) {
  const image = normalizeCmsImage(data?.image);
  const inputs = [data?.searchBox];
  const yepSchema = inputs?.reduce(createYupSchema, {});
  const formSchema = yup.object().shape(yepSchema);
  type formFields = yup.InferType<typeof formSchema>;
  const { mutate, isLoading, isSuccess } = useSubmitFormData();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<formFields>({
    resolver: yupResolver(formSchema),
  });

  const handleFormSubmit = (data: any) => {
    const payload: IFormData = {
      token: 'stay-tuned-form',
      formName: 'stay-tuned-form',
      data: data,
      formOrigin: 'stay-tuned',
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
    <div
      className="max-h-[350px] h-[300px] bg-cover bg-center bg-no-repeat bg-opacity-70 flex-1 "
      style={{ backgroundImage: `url(${image?.url})` }}
    >
      <div className="container mx-auto px-5 lg:px-10 py-8 lg:py-[68px] justify-end lg:justify-center  flex flex-col space-y-6 lg:space-y-8">
        <p className="text-3xl lg:text-4xl tracking-[0.02em] lg:leading-[48px] font-semibold text-white mr-auto max-w-[295px] lg:max-w-[475px]">
          {data?.content}
        </p>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className={classNames('mr-auto', isLoading ? 'animate-pulse' : '')}
        >
          <div className="grid grid-cols-4 items-start">
            <label className="col-span-2">
              <input
                {...register(`${data?.searchBox?.name}`)}
                placeholder={data?.searchBox?.placeholder}
                className={classNames(
                  'Input !rounded-r-none',
                  errors &&
                    errors[`${data?.searchBox?.name}`] &&
                    'border-brandError'
                )}
              />
            </label>
            <button
              className={classNames(
                'Button col-span-2 uppercase h-full !rounded-l-none',
                data?.button?.theme === 'primary' && 'Button',
                data?.button?.theme === 'secondary' && 'OutlineButton'
              )}
              type="submit"
              disabled={isLoading}
            >
              {data?.button?.label}
              {isLoading && (
                <SpinnerIcon className="w-6 h-6 text-white animate-spin fill-brand inline-flex ml-2" />
              )}
            </button>
            <span className="FieldError">
              {!!errors[`${data?.searchBox?.name}`]?.message &&
                errors[`${data?.searchBox?.name}`].message}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
