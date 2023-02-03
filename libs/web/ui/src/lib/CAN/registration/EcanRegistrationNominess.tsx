import { DustbinIcon, SpinnerIcon } from '@corpcare/web/ui';
import classNames from 'classnames';
const special = ['1', '2', '3', '4', '5'];
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { IOptions, relationshipNomineesOptions } from '@corpcare/shared/api';
import ReactSelect from 'react-select';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';

function is18orOlder(dateString: string) {
  const dob = new Date(dateString);
  const dobPlus18 = new Date(
    dob.getFullYear() + 18,
    dob.getMonth(),
    dob.getDate()
  );
  return dobPlus18.valueOf() <= Date.now();
}

const ecanRegistrationNomineeFormSchema = yup.object().shape({
  nomination_option: yup.string().label('Nomination Option').required(),
  nominee_form: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().label('Name').required(),
        relation: yup.string().label('Relation').required(),
        percentage: yup
          .string()
          .label('Percentage')
          .required()
          .max(3, 'No more than 3 characters.'),
        dob: yup.string().label('Date of birth').required().nullable(),
        guardian_name: yup.string().when('dob', {
          is: (val) => !is18orOlder(val),
          then: yup.string().label('Guardian Name').required(),
        }),
        guardian_relation: yup.string().when('dob', {
          is: (val) => !is18orOlder(val),
          then: yup.string().label('Guardian Relation').required(),
        }),
        guardian_dob: yup.string().when('dob', {
          is: (val) => !is18orOlder(val),
          then: yup.string().label('Guardian Date of Birth').required(),
        }),
      })
    )
    .when('nomination_option', {
      is: 'Y',
      then: yup.array().min(1, 'Please Enter atleast one Nominee Details'),
    }),
});

export const EcanRegistrationNominess = ({
  onSubmit,
  goBack,
  data,
  isLoading,
}: {
  onSubmit: (data: any, isDirty: boolean) => Promise<void>;
  goBack: () => void;
  data: any;
  isLoading: boolean;
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(ecanRegistrationNomineeFormSchema),
  });
  const nomination_option = watch('nomination_option');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'nominee_form',
  });

  useEffect(() => {
    if (data?.data?.data?.nominees)
      reset({
        nominee_form: data.data.data.nominees,
        nomination_option: data.data.data.nominees?.length ? 'Y' : 'N',
      });
  }, [reset, data]);

  const handleFormSubmit = (formData) => {
    // append form to field array
    if (nomination_option === 'N') {
      const data = [];
      onSubmit({ nominees: data }, isDirty);
    } else {
      if (
        watch('nominee_form')?.reduce((n, { percentage }) => {
          return n + Number(percentage);
        }, 0) !== 100
      ) {
        watch('nominee_form')?.map((item, index) =>
          setError(`nominee_form.${index}.percentage`, {
            type: 'custom',
            message: 'Please enter a percentage value that adds up to 100.',
          })
        );

        return;
      }
      const data = formData?.nominee_form;
      const dataReference = data?.map(
        ({ guardian_dob, guardian_relation, guardian_name, ...item }) => {
          if (is18orOlder(item?.dob)) {
            return { ...item };
          }
          return {
            ...item,
            guardian_dob,
            guardian_relation,
            guardian_name,
          };
        }
      );
      onSubmit({ nominees: dataReference }, isDirty);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="text-lightGray text-xl font-medium mt-8">Nominees</div>
      <div className="mt-3 mx-auto rounded-lg lg:p-8 lg:bg-white">
        <div className="border-[1px] border-light mb-4 lg:mb-8 bg-white rounded-lg">
          <div className="text-lightGray font-normal text-sm border-b-[1px] border-light rounded-t rounded-b-none px-5 lg:px-7 py-3 bg-lighter">
            Add a Nominee
          </div>
          <div className="mx-auto p-5 lg:p-7">
            <div className="grid grid-cols-2 gap-5 lg:gap-6">
              <label className="col-span-2">
                <span className="Label">Nomination Option</span>
                <Controller
                  control={control}
                  name={'nomination_option'}
                  render={({ field: { value, onChange, name, ref } }) => {
                    return (
                      <ReactSelect
                        placeholder={
                          <div className="text-sm text-lighterGray">Select</div>
                        }
                        options={[
                          { label: 'Yes - I wish to Nominate', value: 'Y' },
                          {
                            label: 'No - I do not wish to Nominate',
                            value: 'N',
                          },
                        ]}
                        value={[
                          { label: 'Yes - I wish to Nominate', value: 'Y' },
                          {
                            label: 'No - I do not wish to Nominate',
                            value: 'N',
                          },
                        ].find((c) => c.value === value)}
                        onChange={(e: IOptions) => {
                          onChange(e.value);
                        }}
                        name={name}
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
                              : errors['nomination_option']
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
                <span className="FieldError">
                  {errors['nomination_option']?.message}
                </span>
              </label>
            </div>
          </div>
        </div>
        {nomination_option === 'Y' &&
          fields.map((field, index) => (
            <div
              className="border-[1px] border-light mt-4 lg:mt-8 bg-white rounded-md"
              key={index}
            >
              <div className="text-lightGray font-normal text-lg lg:text-sm border-b-[1px] border-light rounded-t rounded-b-none px-5 lg:px-7 py-3 bg-lighter flex justify-between items-center">
                Nominee&nbsp;{special[index]}
                {index !== 0 && (
                  <DustbinIcon
                    className="w-5 h-5 lg:w-6 lg:h-6 text-brand hover:cursor-pointer"
                    onClick={() => {
                      remove(index);
                    }}
                  />
                )}
              </div>
              <div className="mx-auto p-5 lg:p-7">
                <div className="grid grid-cols-2 gap-5 lg:gap-6">
                  <label className="lg:col-span-1 col-span-2">
                    <span className="Label">Name of Nominee</span>
                    <input
                      {...register(`nominee_form.${index}.name`)}
                      key={field.id}
                      type="text"
                      placeholder="Enter your Nominee"
                      className={classNames(
                        'Input',
                        errors['nominee_form']?.[index]?.name &&
                          'border-brandError'
                      )}
                    />
                    <span className="FieldError">
                      {errors['nominee_form']?.[index]?.name?.message}
                    </span>
                  </label>
                  <label className="lg:col-span-1 col-span-2">
                    <span className="Label">Relation</span>
                    <input
                      {...register(`nominee_form.${index}.relation`)}
                      key={field.id}
                      type="text"
                      placeholder="Enter your Nominee Relation"
                      className={classNames(
                        'Input',
                        errors['nominee_form']?.[index]?.relation &&
                          'border-brandError'
                      )}
                    />
                    <span className="FieldError">
                      {errors['nominee_form']?.[index]?.relation?.message}
                    </span>
                  </label>
                  <label className="lg:col-span-1 col-span-2">
                    <span className="Label">Percent(%)</span>
                    <input
                      {...register(`nominee_form.${index}.percentage`)}
                      key={field.id}
                      type="text"
                      placeholder="Enter your Percentage"
                      className={classNames(
                        'Input',
                        errors['nominee_form']?.[index]?.percentage &&
                          'border-brandError'
                      )}
                    />
                    <span className="FieldError">
                      {errors['nominee_form']?.[index]?.percentage?.message}
                    </span>
                  </label>
                  <label className="lg:col-span-1 col-span-2">
                    <span className="Label">Date Of Birth</span>

                    <Controller
                      control={control}
                      name={`nominee_form.${index}.dob`}
                      key={field.id}
                      render={({ field: { value, onChange, name, ref } }) => {
                        return (
                          <DatePicker
                            selected={value ? new Date(value) : null}
                            onChange={(val) =>
                              val
                                ? onChange(dayjs(val).format('YYYY-MM-DD'))
                                : onChange(null)
                            }
                            className={classNames(
                              'Input',
                              errors['nominee_form']?.[index]?.dob &&
                                'border-brandError'
                            )}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            placeholderText="Date of Birth"
                          />
                        );
                      }}
                    />
                    <span className="FieldError">
                      {errors['nominee_form']?.[index]?.dob?.message}
                    </span>
                  </label>
                  {!is18orOlder(watch(`nominee_form.${index}.dob`)) && (
                    <label className="lg:col-span-1 col-span-2">
                      <span className="Label">Guardian Name</span>
                      <input
                        {...register(`nominee_form.${index}.guardian_name`)}
                        key={field.id}
                        type="text"
                        placeholder="Enter Guardian Name"
                        className={classNames(
                          'Input',
                          errors['nominee_form']?.[index]?.guardian_name &&
                            'border-brandError'
                        )}
                      />
                      <span className="FieldError">
                        {
                          errors['nominee_form']?.[index]?.guardian_name
                            ?.message
                        }
                      </span>
                    </label>
                  )}
                  {!is18orOlder(watch(`nominee_form.${index}.dob`)) && (
                    <label className="lg:col-span-1 col-span-2">
                      <span className="Label">Guardian Relation</span>
                      <Controller
                        control={control}
                        name={`nominee_form.${index}.guardian_relation`}
                        key={field.id}
                        render={({ field: { value, onChange, name, ref } }) => {
                          return (
                            <ReactSelect
                              placeholder={
                                <div className="text-sm text-lighterGray">
                                  Select
                                </div>
                              }
                              key={field.id}
                              options={relationshipNomineesOptions}
                              value={relationshipNomineesOptions.find(
                                (c) => c.value === value
                              )}
                              onChange={(e: IOptions) => {
                                onChange(e.value);
                              }}
                              name={name}
                              styles={{
                                control: (base, state) => ({
                                  ...base,
                                  padding: '2px',
                                  '@media only screen and (min-width: 1024px)':
                                    {
                                      padding: '6px',
                                    },
                                  boxShadow: state.isFocused ? 'none' : 'none',
                                  borderColor: state.isFocused
                                    ? '#C5A265'
                                    : errors['nominee_form']?.[index]
                                        ?.guardian_relation
                                    ? '#F56B63'
                                    : base.borderColor,
                                  borderRadius: '4px',
                                  '&:hover': {
                                    boxShadow: state.isFocused
                                      ? '#C5A265'
                                      : 'none',
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
                                    backgroundColor: state.isFocused
                                      ? '#EADDC7'
                                      : '',
                                    color: '#555',
                                  },
                                }),
                              }}
                            />
                          );
                        }}
                      />
                      <span className="FieldError">
                        {
                          errors['nominee_form']?.[index]?.guardian_relation
                            ?.message
                        }
                      </span>
                    </label>
                  )}
                  {!is18orOlder(watch(`nominee_form.${index}.dob`)) && (
                    <label className="lg:col-span-1 col-span-2">
                      <span className="Label">Guardian Date of Birth</span>
                      <Controller
                        control={control}
                        name={`nominee_form.${index}.guardian_dob`}
                        key={field.id}
                        render={({ field: { value, onChange, name, ref } }) => {
                          return (
                            <DatePicker
                              selected={value ? new Date(value) : null}
                              onChange={(val) =>
                                val
                                  ? onChange(dayjs(val).format('YYYY-MM-DD'))
                                  : onChange(null)
                              }
                              className={classNames(
                                'Input',
                                errors['nominee_form']?.[index]?.guardian_dob &&
                                  'border-brandError'
                              )}
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              placeholderText="Date of Birth"
                              maxDate={
                                new Date(
                                  new Date().getFullYear() - 18,
                                  new Date().getMonth(),
                                  new Date().getDate()
                                )
                              }
                            />
                          );
                        }}
                      />
                      <span className="FieldError">
                        {errors['nominee_form']?.[index]?.guardian_dob?.message}
                      </span>
                    </label>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      {nomination_option === 'Y' && (
        <span
          className={classNames(
            'OutlineButton col-span-2 uppercase max-w-[160px] lg:max-w-[228px] w-full mt-6 inline-flex justify-center cursor-pointer',
            fields.length >= 4 ? 'hidden' : ''
          )}
          onClick={() => append({})}
        >
          Add nominee
        </span>
      )}
      {!!errors['nominee_form']?.message && (
        <span className="FieldError">{errors['nominee_form'].message}</span>
      )}
      <section className="lg:mt-6 mt-5 gap-5 lg:gap-6 flex items-center">
        <button
          className="OutlineButton col-span-2 uppercase max-w-[160px] lg:max-w-[228px] w-full"
          onClick={goBack}
          type="button"
        >
          Prev
        </button>
        <button
          className="Button col-span-2 uppercase max-w-[160px] lg:max-w-[228px] w-full"
          disabled={isLoading}
          type="submit"
        >
          Next
          {isLoading && (
            <SpinnerIcon className="w-6 h-6 text-white animate-spin fill-brand inline-flex ml-2" />
          )}
        </button>
      </section>
    </form>
  );
};
