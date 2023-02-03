import { AuthenticatedDashboardLayout } from '../../../../components/AuthenticatedDashboardLayout';
import { DashboardHead } from '../../../../components/DashboardHead';
import Link from 'next/link';
import { ReactElement, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import classNames from 'classnames';
import { NextRouter, useRouter } from 'next/router';
import {
  IRoleType,
  relationshipManagerFormSchema,
  RelationshipManagerUpdateFields,
  roleTypeOptions,
  useDeleteRelationshipManagerDetails,
  useGetRelationshipManagerDetails,
  useUpdateRelationshipManagerDetails,
} from '@corpcare/shared/api';
import { CustomToast } from '@corpcare/web/ui';
import { toast } from 'react-hot-toast';

export const RMBasicDetailsForm = ({ profile }) => {
  const { mutate } = useUpdateRelationshipManagerDetails();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RelationshipManagerUpdateFields>({
    resolver: yupResolver(relationshipManagerFormSchema),
  });

  useEffect(() => {
    reset({
      ...profile,
      mobile: profile?.mobile?.split('+91 ')[1],
    });
  }, [reset, profile]);

  const handleFormSubmit = (data: RelationshipManagerUpdateFields) => {
    const relationshipId = profile?.id;
    mutate(
      { data, relationshipId },
      {
        onSuccess(data, variables, context) {
          //
        },
        onError(error: any) {
          toast.custom((t) => (
            <CustomToast
              t={t}
              message={
                error?.message || 'Something went wrong! Please try again.'
              }
              type="error"
            />
          ));
        },
      }
    );
  };

  return (
    <div className="border border-light w-full bg-white">
      <section className="text-lightGray font-normal text-lg lg:text-sm border-b border-light rounded-t rounded-b-none px-4 lg:px-7 py-3 bg-lighter">
        Basic Details
      </section>
      <form
        className="mx-auto p-5 lg:p-7"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="grid grid-cols-2 gap-6">
          <label className="lg:col-span-1 col-span-2">
            <span className="Label">First Name</span>
            <input
              {...register('first_name')}
              placeholder="Enter your first Name"
              className={classNames(
                'Input',
                errors.first_name && 'border-brandError'
              )}
            />

            <span className="FieldError">{errors.first_name?.message}</span>
          </label>
          <label className="lg:col-span-1 col-span-2">
            <span className="Label">Last Name</span>
            <input
              {...register('last_name')}
              placeholder="Enter your Name"
              className={classNames(
                'Input',
                errors.last_name && 'border-brandError'
              )}
            />

            <span className="FieldError">{errors.last_name?.message}</span>
          </label>
          <label className="lg:col-span-1 col-span-2">
            <span className="Label">Email-id</span>
            <input
              {...register('email')}
              placeholder="Enter your Email-id"
              className={classNames(
                'Input',
                errors.email && 'border-brandError'
              )}
            />

            <span className="FieldError">{errors.email?.message}</span>
          </label>
          <label className="lg:col-span-1 col-span-2">
            <span className="Label">Mobile Number</span>
            <input
              {...register('mobile')}
              placeholder="Enter your Mobile Number"
              className={classNames(
                'Input',
                errors.mobile && 'border-brandError'
              )}
            />

            <span className="FieldError">{errors.mobile?.message}</span>
          </label>
          <label className="lg:col-span-1 col-span-2">
            <span className="Label">Role</span>
            <Controller
              control={control}
              name="role_type"
              render={({ field: { value, onChange, name, ref } }) => {
                return (
                  <ReactSelect
                    placeholder={
                      <div className="text-sm text-lighterGray">
                        Select your Role
                      </div>
                    }
                    options={roleTypeOptions}
                    value={roleTypeOptions.find((c) => c.value === value)}
                    onChange={(e: IRoleType) => {
                      onChange(e.value);
                    }}
                    name={name}
                    isSearchable={false}
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        padding: '2px',
                        '@media only screen and (min-width: 1024px)': {
                          padding: '6px',
                        },
                        boxShadow: state.isFocused ? 'none' : 'none',
                        borderColor: state.isFocused
                          ? '#C5A265'
                          : errors.role_type
                          ? '#F56B63'
                          : base.borderColor,
                        borderRadius: '4px',
                        '&:hover': {
                          boxShadow: state.isFocused ? '#C5A265' : 'none',
                          borderColor: state.isFocused
                            ? '#C5A265'
                            : base.borderColor,
                        },
                      }),
                      singleValue: (base, state) => ({
                        ...base,
                        color: '#555',
                        fontSize: '0.875rem' /* 14px */,
                        lineHeight: '1.25rem' /* 20px */,
                        letterSpacing: '0.02em',
                      }),
                      option: (base, state) => ({
                        ...base,
                        fontSize: '16px',
                        backgroundColor: state.isSelected
                          ? '#C5A265'
                          : state.isFocused
                          ? '#EADDC7'
                          : '',
                        color: state.isSelected ? 'white' : '#555',
                        '&:hover': {
                          backgroundColor: state.isFocused ? '#EADDC7' : '',
                          color: '#555',
                        },
                      }),
                    }}
                  />
                );
              }}
            />
          </label>
          <label className="lg:col-span-1 col-span-2">
            <span className="Label">EUIN/RIA</span>
            <input
              {...register('euin_ria')}
              placeholder="Enter your EUIN/RIA"
              className={classNames(
                'Input',
                errors.euin_ria && 'border-brandError'
              )}
            />

            <span className="FieldError">{errors.euin_ria?.message}</span>
          </label>
          <button
            className="Button col-span-2 uppercase lg:text-base text-sm"
            type="submit"
          >
            update details
          </button>
        </div>
      </form>
    </div>
  );
};
export const RMGeneratePasswordForm = () => {
  return (
    <div className="border border-light w-full bg-white">
      <section className="text-lightGray font-normal text-lg lg:text-sm border-b border-light rounded-t rounded-b-none px-4 lg:px-7 py-3 bg-lighter">
        Generate Password
      </section>
      <form className="mx-auto p-5 lg:p-7">
        <div className="grid grid-cols-2 gap-6">
          <label className="col-span-2">
            <span className="Label">Entity Type</span>
            <select
              placeholder="Select entity type"
              className={classNames('Input')}
            >
              <option value="advisory">Advisory</option>
              <option value="distributor">Distributor</option>
            </select>
          </label>
          <button className="Button col-span-2 uppercase lg:text-base text-sm">
            GENERATE & MAIL PASSWORD
          </button>
        </div>
      </form>
    </div>
  );
};
export default function EditRMProfile() {
  const router = useRouter() as NextRouter;
  const { data } = useGetRelationshipManagerDetails(
    router?.query?.rmId as string
  );
  const { mutate } = useDeleteRelationshipManagerDetails();

  const handleProfileDeleteSubmit = () => {
    if (!data) return;
    const relationshipId = data?.id;
    mutate(relationshipId, {
      onSuccess(data, variables, context) {
        router.push('/relationship-managers');
      },
      onError(error: any) {
        toast.custom((t) => (
          <CustomToast
            t={t}
            message={
              error?.message || 'Something went wrong! Please try again.'
            }
            type="error"
          />
        ));
      },
    });
  };
  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium">Relationship Managers</h2>
        <Link href="/">
          <a className="text-xs text-lightGray">
            {/* Relationship Managers > Karan Singh Rawat */}
          </a>
        </Link>
      </DashboardHead>
      <div className="flex-grow overflow-y-auto p-4 lg:p-8 pb-5 lg:pb-16 ">
        <section className="Card flex items-center justify-between bg-lighter flex-wrap lg:gap-0 gap-4 ">
          <div className="flex items-center gap-4 flex-wrap">
            <Link href="/relationship-managers">
              <a className="OutlineButton px-2 py-1 font-bold group-hover:bg-brandDark">
                &#10229; {/* left arrow */}
              </a>
            </Link>

            <h2 className="text-lg lg:text-xl text-lightGray font-medium tracking-wide">
              Karan Singh Rawat
            </h2>
            <button className="border border-brandLight rounded uppercase w-28 font-normal text-sm text-lightGray py-1 px-4">
              SALES
            </button>
          </div>
          <button
            className="OutlineButton uppercase text-[#C72B2B] bg-[#FFEAEA] border-[#C72B2B] hover:bg-[#C72B2B] lg:text-base text-sm"
            onClick={handleProfileDeleteSubmit}
          >
            DELETE RM
          </button>
        </section>
        <section className="lg:Card overflow-hidden lg:p-8 mt-4 lg:mt-8 lg:space-y-8 space-y-4">
          <RMBasicDetailsForm profile={data} />
          <RMGeneratePasswordForm />
        </section>
      </div>
    </div>
  );
}

EditRMProfile.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
