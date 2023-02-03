/* eslint-disable react/no-children-prop */
import {
  cmsApiInstance,
  IFormData,
  normalizeCmsImage,
  useSubmitFormData,
} from '@corpcare/shared/api';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Layout } from '../../components/blocks/Layout';
import { IFooter, IHeader } from '../../types/global';
import { IForm } from '../../types/shared';
import * as yup from 'yup';
import { IWebinarCard, IWebinars } from '../../types/block';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { yupResolver } from '@hookform/resolvers/yup';
import { createYupSchema } from '../../utils/createYupSchema';
import { Grid, Keyboard, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PreviousWebinarsCard } from '../../components/shared/PreviousWebinarsCard';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CustomToast, SpinnerIcon } from '@corpcare/web/ui';
import { toast } from 'react-hot-toast';
import remarkGfm from 'remark-gfm';

const WebinarSinglePage = ({
  global,
  pageData,
  form,
  previousWebinarsData,
}: {
  global: {
    header: IHeader;
    footer: IFooter;
  };
  pageData?: IWebinarCard;
  blocks?: any;
  form?: IForm;
  previousWebinarsData?: IWebinars[];
}) => {
  const speakerImage = normalizeCmsImage(
    pageData?.speaker?.data?.attributes?.image
  );

  const yepSchema = form?.inputs?.reduce(createYupSchema, {});
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
      token: 'webinar-register-form',
      formName: 'webinar-register-form',
      data: data,
      formOrigin: 'webinar-register',
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
  const heroImage = normalizeCmsImage(pageData?.heroImage);
  const router = useRouter();
  if (router?.isFallback) {
    <div className="flex items-center justify-center h-screen flex-col gap-2">
      <img className="max-h-14" src="/corpcare-logo-black.png" alt="" />
      <h1 className="text-center text-base lg:text-lg">Loading ....</h1>
    </div>;
  }
  return (
    <Layout global={global}>
      <div
        className="bg-cover bg-center bg-no-repeat bg-opacity-70 flex-1 h-full "
        style={{ backgroundImage: `url(${heroImage?.url})`, margin: 0 }}
      >
        <div className="flex flex-col container mx-auto space-y-5 lg:space-y-8 lg:px-10 px-5 py-8 lg:py-60">
          <Link href={`/webinar`}>
            <a>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                className="text-brand hover:text-brandDark cursor-pointer"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="32" height="32" rx="4" fill="currentColor" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22.1667 14.7144C22.3877 14.7144 22.5997 14.7972 22.7559 14.9445C22.9122 15.0918 23 15.2917 23 15.5C23 15.7083 22.9122 15.9082 22.7559 16.0555C22.5997 16.2028 22.3877 16.2856 22.1667 16.2856H10.8462L14.4242 19.6572C14.5806 19.8048 14.6685 20.0048 14.6685 20.2134C14.6685 20.422 14.5806 20.6221 14.4242 20.7696C14.2677 20.9171 14.0555 21 13.8342 21C13.613 21 13.4008 20.9171 13.2443 20.7696L8.2448 16.0562C8.1672 15.9832 8.10564 15.8965 8.06363 15.8011C8.02162 15.7056 8 15.6033 8 15.5C8 15.3967 8.02162 15.2944 8.06363 15.1989C8.10564 15.1035 8.1672 15.0168 8.2448 14.9438L13.2443 10.2304C13.4008 10.0829 13.613 10 13.8342 10C14.0555 10 14.2677 10.0829 14.4242 10.2304C14.5806 10.3779 14.6685 10.578 14.6685 10.7866C14.6685 10.9952 14.5806 11.1952 14.4242 11.3427L10.8462 14.7144H22.1667Z"
                  fill="white"
                />
              </svg>
            </a>
          </Link>
          <p className="text-[32px] lg:text-4xl tracking-[0.02em] lg:leading-[48px] font-semibold text-white max-w-[335px] lg:max-w-[577px] mr-auto">
            {pageData?.title}
          </p>
          <p className="max-w-fit text-lightGray tracking-[0.02em] font-normal text-sm lg:text-base flex items-center gap-3 lg:gap-4 py-3 px-4 lg:px-[18px] bg-lighter border rounded-[4px]">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.8453 2.22656V0H24.0875V2.22656H20.8632V0H19.1054V2.22656H15.8811V0H14.1233V2.22656H10.899V0H9.14121V2.22656H5.91697V0H4.15916V2.22656H0.00585938V29.9999H29.995V2.22656H25.8453ZM4.1591 3.98437V6.21094H5.91691V3.98437H9.14115V6.21094H10.899V3.98437H14.1233V6.21094H15.8811V3.98437H19.1053V6.21094H20.8631V3.98437H24.0874V6.21094H25.8452V3.98437H28.2371V9.75873H1.76367V3.98437H4.1591ZM1.76367 28.2421V11.5165H28.2372V28.2421H1.76367Z"
                fill="#C5A265"
              />
              <path
                d="M9.7832 21.3119V25.0882H13.5998L20.585 18.1031L16.7886 14.3066L9.7832 21.3119ZM11.541 23.3304V22.0401L12.176 21.4051L13.4865 22.7156L12.8717 23.3304H11.541ZM14.7294 21.4727L13.4189 20.1622L16.7886 16.7925L18.0991 18.103L14.7294 21.4727Z"
                fill="#C5A265"
              />
            </svg>
            <span
              suppressHydrationWarning
              className="text-[#191919] tracking-[0.02em] font-normal text-lg lg:text-xl"
            >
              {new Date(pageData?.Date as string).toLocaleDateString(
                undefined,
                {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                }
              )}
            </span>
          </p>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-6 gap-11 lg:p-10 p-5">
        <div className="col-span-6 lg:col-span-4 lg:order-1 order-2">
          <section className="border bg-white rounded-lg mb-8">
            <h1 className="text-[#191919] tracking-[0.02em] text-lg lg:text-xl font-medium lg:!leading-[30px] bg-lighter py-3 lg:py-6 px-5 lg:px-8 border-b">
              {pageData?.title}
            </h1>

            <div className="markdown-body !bg-white">
              <ReactMarkdown
                className="text-base lg:text-lg  text-[#555555] whitespace-pre-line p-5 lg:p-8"
                children={pageData?.Overview as string}
                remarkPlugins={[remarkGfm]}
                linkTarget="_blank"
              />
            </div>
            <p className="mb-5 lg:mb-10 mx-5 lg:mx-8 max-w-fit text-lightGray tracking-[0.02em] font-normal text-sm lg:text-base flex items-center gap-3 lg:gap-4 py-3 px-4 lg:px-[18px] bg-lighter border rounded-[4px]">
              <svg
                width="22"
                className="flex-shrink-0"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.4111 8.94928V1.49437H16.1751V0.389648H14.886V1.49437H12.2918V0.389648H11.0027V1.49437H8.40847V0.389648H7.11941V1.49437H4.52517V0.389648H3.23611V1.49437H0V16.9947H11.3202C12.3633 18.5699 14.1511 19.611 16.1777 19.611C19.3881 19.611 22 16.9992 22 13.7888C22 11.7739 20.971 9.99492 19.4111 8.94928ZM3.23606 2.78344V3.88812H4.52513V2.78344H7.11936V3.88812H8.40843V2.78344H11.0027V3.88812H12.2917V2.78344H14.886V3.88812H16.175V2.78344H18.122V4.94794H1.28906V2.78344H3.23606ZM1.28906 15.7057V6.23701H18.1221V8.30079C17.5137 8.08462 16.8593 7.9665 16.1777 7.9665C12.9673 7.9665 10.3555 10.5784 10.3555 13.7888C10.3555 14.4601 10.4701 15.1051 10.6801 15.7057H1.28906ZM16.1777 18.322C13.6781 18.322 11.6445 16.2884 11.6445 13.7888C11.6445 11.2891 13.6781 9.25556 16.1777 9.25556C18.6774 9.25556 20.7109 11.2891 20.7109 13.7888C20.7109 16.2884 18.6774 18.322 16.1777 18.322Z"
                  fill="#C5A265"
                />
                <path
                  d="M16.8223 13.1445V10.5127H15.5332V14.4336H19.4541V13.1445H16.8223Z"
                  fill="#C5A265"
                />
              </svg>
              <span
                suppressHydrationWarning
                className="text-lighterGray tracking-[0.02em] font-normal text-sm lg:text-base"
              >
                {new Date(pageData?.Date as string).toLocaleDateString(
                  undefined,
                  {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  }
                )}
              </span>
            </p>
          </section>
          <p className="text-[#191919] tracking-[0.02em] text-lg lg:text-xl lg:!leading-[30px] font-medium mb-4">
            Speaker
          </p>
          <section className="border bg-white rounded-lg mb-10 lg:mb-[60px]">
            <div className="flex items-center gap-2 bg-lighter p-5s lg:p-6 border-b">
              <img
                src={speakerImage?.url}
                alt={speakerImage?.alternativeText}
                className="object-cover w-11 h-11 rounded-[4px]"
              />
              <div className="flex flex-col gap-[2px]">
                <h2 className="text-[#191919] tracking-[0.02em] font-normal text-sm lg:text-base">
                  {pageData?.speaker?.data?.attributes?.name}
                </h2>
                <h3 className="text-lightGray tracking-[0.02em] font-normal text-sm">
                  {pageData?.speaker?.data?.attributes?.designation}
                </h3>
              </div>
            </div>

            <div className="markdown-body !bg-white">
              <ReactMarkdown
                className="text-lg lg:text-[1.25rem] text-[#555555]  p-5 lg:p-6"
                children={
                  pageData?.speaker?.data?.attributes?.description as string
                }
                remarkPlugins={[remarkGfm]}
                linkTarget="_blank"
              />
            </div>
          </section>
          <section className="border bg-white rounded-lg">
            <h1 className="text-[#191919] tracking-[0.02em] text-lg lg:text-xl font-medium lg:!leading-[30px] bg-lighter py-4 lg:py-6 px-5 lg:px-8 border-b">
              Highlights
            </h1>
            <div className="markdown-body !bg-white">
              <ReactMarkdown
                className="text-lg lg:text-[1.25rem] text-[#555555] p-5 lg:p-8"
                children={pageData?.Highlights as string}
                remarkPlugins={[remarkGfm]}
                linkTarget="_blank"
              />
            </div>
          </section>
        </div>
        <div className="lg:col-span-2 col-span-6 order-1 lg:order-2">
          <section className="border bg-white rounded-lg mb-12 lg:mb-8">
            <h1 className="text-[#191919] tracking-[0.02em] text-lg lg:text-xl font-medium lg:!leading-[30px] bg-lighter py-4 lg:py-6 px-5 lg:px-8 border-b">
              {form?.title}
            </h1>
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
          </section>
        </div>
      </div>
      <div className="container mx-auto p-5 lg:p-10">
        <h1 className="font-medium text-2xl lg:text-4xl tracking-[0.02em] text-[#191919] mb-5 lg:mb-10 text-left">
          Previous Webinars
        </h1>
        <Swiper
          slidesPerView={1}
          breakpoints={{
            1280: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 2,
            },
          }}
          grid={{
            rows: 1,
          }}
          keyboard={{
            enabled: true,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Keyboard, Grid, Pagination]}
          spaceBetween={52}
          className="!pb-16"
        >
          {previousWebinarsData?.map(({ attributes }, index) => {
            return (
              <SwiperSlide key={index}>
                <PreviousWebinarsCard data={attributes} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </Layout>
  );
};
//

export async function getStaticPaths() {
  try {
    const { data } = await cmsApiInstance.get<{
      data: any;
    }>('/webinars-data', {});

    const paths = data?.data?.map((item) => {
      return {
        params: { slug: item?.attributes?.slug },
      };
    });
    return {
      paths: paths,
      fallback: 'blocking', // See the "fallback" section below
    };
  } catch (error) {
    return { paths: [{ params: { slug: '' } }], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  try {
    const {
      data: { data: form },
    } = await cmsApiInstance.get(
      `/forms?&filters[$and][0][slug][$eq]=webinar-form&populate=deep,5`
    );
    const {
      data: { data },
    } = await cmsApiInstance.get(
      `/webinars-data?filters[slug]=${slug}&filters[$and][0][Upcoming][$eq]=true&populate=deep,5`
    );
    const {
      data: { data: previousWebinarsData },
    } = await cmsApiInstance.get(
      `/webinars-data?pagination[page]=${1}&populate=deep,5&pagination[pageSize]=${12}&pagination[withCount]=true&filters[$and][0][Upcoming][$eq]=false`
    );
    return {
      props: {
        pageData: data[0]?.attributes || null,
        previousWebinarsData: previousWebinarsData || null,
        form: form[0]?.attributes || null,
      },
      revalidate: 10, // In seconds
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/webinar',
        permanent: false,
      },
    };
  }
}
export default WebinarSinglePage;
