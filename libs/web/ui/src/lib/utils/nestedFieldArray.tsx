import {
  indentiTypeOptions,
  IOptions,
} from '../../../../../shared/api/src/index';
import classNames from 'classnames';
import React from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import ReactSelect from 'react-select';

export const NestedArray = ({
  nestIndex,
  control,
  register,
  countryList,
  errors,
}) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `holder_form[${nestIndex}].tax_records`,
  });

  return (
    <div className="space-y-8">
      {!!errors?.holder_form?.[nestIndex]?.tax_records?.message && (
        <span className="FieldError">
          {errors?.holder_form?.[nestIndex]?.tax_records.message}
        </span>
      )}
      {fields.map((item, k) => {
        return (
          <div className="grid grid-cols-2 gap-5 lg:gap-6" key={k}>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Tax Country</span>
              <Controller
                control={control}
                name={`holder_form[${nestIndex}].tax_records[${k}].tax_country`}
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">Select</div>
                      }
                      options={countryList
                        ?.filter((item) => item.name === 'India')
                        ?.map((item) => {
                          return {
                            value: item.code,
                            label: item.name,
                          };
                        })}
                      value={countryList
                        ?.filter((item) => item.name === 'India')
                        ?.map((item) => {
                          return {
                            value: item.code,
                            label: item.name,
                          };
                        })
                        .find((c) => c.value === value)}
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
                            : errors.holder_form?.[nestIndex]?.tax_records?.[k]
                                ?.tax_country
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
                {
                  errors.holder_form?.[nestIndex]?.tax_records?.[k]?.tax_country
                    ?.message
                }
              </span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Tax Country Other</span>
              <Controller
                control={control}
                name={`holder_form[${nestIndex}].tax_records[${k}].tax_country_oth`}
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">Select</div>
                      }
                      options={countryList
                        ?.filter((item) => item.name === 'India')
                        ?.map((item) => {
                          return {
                            value: item.code,
                            label: item.name,
                          };
                        })}
                      value={countryList
                        ?.filter((item) => item.name === 'India')
                        ?.map((item) => {
                          return {
                            value: item.code,
                            label: item.name,
                          };
                        })
                        .find((c) => c.value === value)}
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
                            : errors.holder_form?.[nestIndex]?.tax_records?.[k]
                                ?.tax_country_oth
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
                {
                  errors.holder_form?.[nestIndex]?.tax_records?.[k]
                    ?.tax_country_oth?.message
                }
              </span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Tax Ref No.</span>
              <input
                {...register(
                  `holder_form[${nestIndex}].tax_records[${k}].tax_ref_no`
                )}
                type="text"
                placeholder="Enter your PAN/PEKRN"
                className={classNames(
                  'Input',
                  errors.holder_form?.[nestIndex]?.tax_records?.[k]
                    ?.tax_ref_no && 'border-brandError'
                )}
              />
              <span className="FieldError">
                {
                  errors.holder_form?.[nestIndex]?.tax_records?.[k]?.tax_ref_no
                    ?.message
                }
              </span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Identity Type</span>
              <Controller
                control={control}
                name={`holder_form[${nestIndex}].tax_records[${k}].identi_type`}
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">Select</div>
                      }
                      options={indentiTypeOptions?.map((item) => {
                        return {
                          value: item.value,
                          label: item.label,
                        };
                      })}
                      value={indentiTypeOptions
                        ?.map((item) => {
                          return {
                            value: item.value,
                            label: item.label,
                          };
                        })
                        .find((c) => c.value === value)}
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
                            : errors.holder_form?.[nestIndex]?.tax_records?.[k]
                                ?.identi_type
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
                {
                  errors.holder_form?.[nestIndex]?.tax_records?.[k]?.identi_type
                    ?.message
                }
              </span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Identity Type Other</span>
              <Controller
                control={control}
                name={`holder_form[${nestIndex}].tax_records[${k}].identi_type_oth`}
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">Select</div>
                      }
                      options={indentiTypeOptions?.map((item) => {
                        return {
                          value: item.value,
                          label: item.label,
                        };
                      })}
                      value={indentiTypeOptions
                        ?.map((item) => {
                          return {
                            value: item.value,
                            label: item.label,
                          };
                        })
                        .find((c) => c.value === value)}
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
                            : errors.holder_form?.[nestIndex]?.tax_records?.[k]
                                ?.identi_type_oth
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
                {
                  errors.holder_form?.[nestIndex]?.tax_records?.[k]
                    ?.identi_type_oth?.message
                }
              </span>
            </label>
            <span
              className={classNames(
                'OutlineButton col-span-2 uppercase max-w-[160px] lg:max-w-[228px] w-full mt-6 inline-flex justify-center cursor-pointer text-center'
              )}
              onClick={() => remove(k)}
            >
              Delete Tax Holders
            </span>
          </div>
        );
      })}
      <span
        className={classNames(
          'OutlineButton col-span-2 uppercase max-w-[160px] lg:max-w-[228px] w-full mt-6 inline-flex justify-center cursor-pointer text-center',
          fields.length >= 4 ? 'hidden' : ''
        )}
        onClick={() => append({})}
      >
        Add Tax Holders
      </span>
    </div>
  );
};
