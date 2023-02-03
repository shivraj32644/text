import {
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  Cell,
  LabelList,
  BarChart,
} from 'recharts';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classNames from 'classnames';
import ReactSelect from 'react-select';
import { useEffect, useMemo, useState } from 'react';

import { CustomToast, FundPerformanceAnalysisModal } from '../../index';

import {
  useFundPerformanceAnalysis,
  useGetMutualFundCodes,
} from '../../../../../shared/api/src/index';
import { compactInrFormatter, compactNumberFormatter } from '../../index';
import { toast } from 'react-hot-toast';

const formSchema = yup.object({
  invested_amount: yup.string().label('Invested Amount'),
  return_period: yup.number().label('Return Period'),
  is_cwi_check: yup.boolean(),
  fund_code_first: yup.string(),
  fund_code_second: yup.string(),
  fund_code_third: yup.string(),
});

interface IPerformanceAnalayis {
  invested_amount: number | undefined;
  return_period: number;
  is_cwi_check: boolean;
  fund_code_first: string;
  fund_code_second: string;
  fund_code_third: string;
}
interface IData {
  benchmarkMktValue?: number;
  benchmarkName?: string;
  benchmarkReturns?: number;
  fundCode?: string;
  mktValue?: number;
  returns?: number;
  name?: string;
  originalbenchmarkReturns?: number;
  originalReturns?: number;
  benchmarkMarketValue?: number;
  marketValue?: number;
}

export function DashboardFundPerformanceAnalysis() {
  const {
    getValues,
    watch,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm<IPerformanceAnalayis>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      invested_amount: 100000,
      return_period: 1,
      is_cwi_check: false,
      fund_code_first: '',
      fund_code_second: '',
      fund_code_third: '',
    },
  });
  const {
    mutate,
    isLoading: isFundPerformanceAnalysisLoading,
    data: fundPerformanceAnalysis,
  } = useFundPerformanceAnalysis();
  const [pageIndex, setPageIndex] = useState<number>(1);

  const [query, setQuery] = useState('');
  const { data: mutualFundCodes } = useGetMutualFundCodes(pageIndex, query);

  const [mfCodeData, setMfCodeData] = useState<
    { crisil_scheme_code?: string; plan_name?: string }[]
  >([]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (mutualFundCodes === undefined) return;
    const results = mutualFundCodes?.items as {
      crisil_scheme_code?: string;
      plan_name?: string;
    }[];
    setMfCodeData((prev) => [...prev, ...results]);
  }, [mutualFundCodes]);

  useEffect(() => {
    const handleFormValuesChange = () => {
      const values = getValues();
      const nav_date = 1579097420000; // static value;
      const {
        invested_amount,
        is_cwi_check,
        return_period,
        fund_code_first,
        fund_code_second,
        fund_code_third,
      } = values;
      const fund_code = [
        fund_code_first,
        fund_code_second,
        fund_code_third,
      ].filter((item) => item !== '');
      if (fund_code?.length !== 0) {
        mutate(
          { invested_amount, is_cwi_check, nav_date, return_period, fund_code },
          {
            onSuccess(data) {
              const isBenchmarkMktValueUndefined = data.some(
                (vendor) => !vendor['benchmarkMktValue']
              );
              const isMktValueUndefined = data.some(
                (vendor) => !vendor['mktValue']
              );
              if (
                isBenchmarkMktValueUndefined &&
                isMktValueUndefined &&
                is_cwi_check
              ) {
                setIsOpen(true);
                setMessage('Benchmark and Market Data Not Found');
              } else if (isMktValueUndefined && !is_cwi_check) {
                setIsOpen(true);
                setMessage('Market Data Not Found');
              } else if (isBenchmarkMktValueUndefined && is_cwi_check) {
                setIsOpen(true);
                setMessage('Benchmark Data Not Found');
              }
            },
            onError(err: any) {
              // toast(err.message || 'Something went wrong! Please try again.', {
              //   type: 'error',
              // });
              // setFormFieldErrors(err, setError);
              toast.custom((t) => (
                <CustomToast
                  t={t}
                  message={
                    err?.message || 'Something went wrong! Please try again.'
                  }
                  type="error"
                />
              ));
              console.error(err);
            },
          }
        );
      }
      reset({
        invested_amount: invested_amount,
        is_cwi_check: is_cwi_check,
        return_period: return_period,
        fund_code_first: fund_code_first,
        fund_code_second: fund_code_second,
        fund_code_third: fund_code_third,
      });
    };
    if (isDirty) {
      handleFormValuesChange();
    }
  }, [isDirty, mutate, getValues, reset]);

  const filterTags = [
    { name: '1M', value: 1 },
    { name: '3M', value: 3 },
    { name: '1Y', value: 12 },
    { name: '3Y', value: 36 },
    { name: '5Y', value: 60 },
    { name: '10Y', value: 120 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-5 rounded-lg">
          <p className="text-sm font-normal">
            {payload[0].payload.benchmarkName}
          </p>
          {watch('is_cwi_check') === true && (
            <>
              <p className="text-sm font-normal">
                {payload[0].payload.benchmarkMktValue}
              </p>
              <p
                className={classNames(
                  Math.sign(payload[0].payload.originalbenchmarkReturns) === -1
                    ? 'text-brandError'
                    : 'text-brand'
                )}
              >
                ({payload[0].payload.benchmarkReturns}%)
              </p>
            </>
          )}
          <p className="text-sm font-normal">{payload[0].payload.mktValue}</p>
          <p
            className={classNames(
              Math.sign(payload[0].payload.originalReturns) === -1
                ? 'text-brandError'
                : 'text-brand'
            )}
          >
            ({payload[0].payload.returns}%)
          </p>
        </div>
      );
    }

    return null;
  };

  const fundPerformanceAnalysisData: IData[] = useMemo(() => {
    const chartData: IData[] = [{ name: 'A' }, { name: 'B' }, { name: 'C' }];
    if (!isFundPerformanceAnalysisLoading && !!fundPerformanceAnalysis) {
      for (let i = 0; i < 3; i++) {
        if (
          fundPerformanceAnalysis[i] &&
          fundPerformanceAnalysis[i]?.benchmarkName !== null
        ) {
          fundPerformanceAnalysis[i].marketValue = compactInrFormatter.format(
            fundPerformanceAnalysis[i].mktValue
          );
          fundPerformanceAnalysis[i].mktValue = compactNumberFormatter
            .format(fundPerformanceAnalysis[i].mktValue)
            .replace(/([a-zA-Z ])/g, '');
          fundPerformanceAnalysis[i].benchmarkMarketValue =
            compactInrFormatter.format(
              fundPerformanceAnalysis[i].benchmarkMktValue
            );
          fundPerformanceAnalysis[i].benchmarkMktValue = compactNumberFormatter
            .format(fundPerformanceAnalysis[i].benchmarkMktValue)
            .replace(/([a-zA-Z ])/g, '');
          fundPerformanceAnalysis[i].originalReturns =
            fundPerformanceAnalysis[i].returns;
          fundPerformanceAnalysis[i].returns = Math.abs(
            fundPerformanceAnalysis[i].returns
          );
          fundPerformanceAnalysis[i].originalbenchmarkReturns =
            fundPerformanceAnalysis[i].benchmarkReturns;
          fundPerformanceAnalysis[i].benchmarkReturns = Math.abs(
            fundPerformanceAnalysis[i].benchmarkReturns
          );
          const targetIndex =
            getValues('fund_code_first') === fundPerformanceAnalysis[i].fundCode
              ? '0'
              : getValues('fund_code_second') ===
                fundPerformanceAnalysis[i].fundCode
              ? '1'
              : '2';
          chartData[targetIndex] = fundPerformanceAnalysis[i];
        } else if (
          fundPerformanceAnalysis[i] &&
          fundPerformanceAnalysis[i]?.benchmarkName === null
        ) {
          fundPerformanceAnalysis[i].marketValue = compactInrFormatter.format(
            fundPerformanceAnalysis[i].mktValue
          );
          fundPerformanceAnalysis[i].mktValue = compactNumberFormatter
            .format(fundPerformanceAnalysis[i].mktValue)
            .replace(/([a-zA-Z ])/g, '');
          fundPerformanceAnalysis[i].originalReturns =
            fundPerformanceAnalysis[i].returns;
          fundPerformanceAnalysis[i].returns = Math.abs(
            fundPerformanceAnalysis[i].returns
          );
          const targetIndex =
            getValues('fund_code_first') === fundPerformanceAnalysis[i].fundCode
              ? '0'
              : getValues('fund_code_second') ===
                fundPerformanceAnalysis[i].fundCode
              ? '1'
              : '2';

          chartData[targetIndex] = fundPerformanceAnalysis[i];
        }
      }
    }
    return chartData;
  }, [isFundPerformanceAnalysisLoading, fundPerformanceAnalysis, getValues]);

  const renderCustomizedLabel = (props) => {
    const { value } = props;
    return (
      <>
        {value === '₹0.00' ? (
          <text></text>
        ) : (
          <text {...props} dy={-4} className="lg:text-sm text-xs">
            {value}
          </text>
        )}
      </>
    );
  };

  return (
    <>
      <div
        className={classNames(
          'Card flex flex-col p-0 relative h-full',
          isFundPerformanceAnalysisLoading
            ? 'opacity-40 pointer-events-none'
            : ''
        )}
      >
        <section className="flex-grow">
          <section className="border-b border-brandLight px-3 py-4 ">
            <section className="flex justify-between items-center">
              <h3 className="text-sm lg:text-base font-medium">
                Fund Performance Analysis
              </h3>
              <input
                className="OutlineButton rounded px-3 py-1 hover:cursor-pointer lg:text-sm text-xs"
                type="button"
                onClick={() => {
                  reset({
                    invested_amount: 100000,
                    return_period: 1,
                    is_cwi_check: false,
                    fund_code_first: '',
                    fund_code_second: '',
                    fund_code_third: '',
                  });
                }}
                value="Reset"
              />
            </section>
            <section className="grid grid-cols-6 gap-2 mt-3 max-w-xs">
              {filterTags.map((_filter, idx) => {
                const return_period_value = Number(getValues('return_period'));
                return (
                  <label
                    key={idx}
                    htmlFor={_filter.name}
                    className={classNames(
                      return_period_value === _filter.value
                        ? 'bg-brand text-white'
                        : 'bg-[#DDDDDD] text-lighterGray',
                      'rounded-3xl px-3.5 py-0.5 text-xs lg:text-sm font-normal  text-center hover:cursor-pointer w-9 lg:w-11 active:bg-[#DDDDDD] active:text-lighterGray transition duration-300 ease flex justify-center items-center'
                    )}
                  >
                    <Controller
                      control={control}
                      name="return_period"
                      render={({ field: { value, onChange } }) => {
                        return (
                          <input
                            onChange={(e) => onChange(e.target.value)}
                            value={_filter.value}
                            type="radio"
                            className="fixed opacity-0 pointer-events-none"
                            id={_filter.name}
                            name="return_period"
                          />
                        );
                      }}
                    />

                    {_filter.name}
                  </label>
                );
              })}
            </section>
          </section>
          <section className="flex-col gap-4 mt-5 px-3 py-4 flex">
            <label className="text-xs  text-lighterGray font-normal lg:block hidden">
              Enter amount
            </label>
            <section className="flex justify-between gap-3 items-end">
              <div className="relative lg:w-[30%] w-[40%]">
                <label className="text-xs  text-lighterGray font-normal block lg:hidden">
                  Enter amount
                </label>
                <Controller
                  control={control}
                  name="invested_amount"
                  render={({ field: { value, onChange } }) => (
                    <input
                      onChange={(e) => onChange(e)}
                      id="invested_amount"
                      value={value}
                      placeholder="Enter amount"
                      className={classNames(
                        'outline-0 border-x-0 border-t-0 border-b border-brandLight focus:border-brandLight pl-4 lg:text-base text-xs w-full',
                        errors.invested_amount && 'border-brandError'
                      )}
                    />
                  )}
                />

                <span className="absolute left-0">₹</span>
              </div>
              <p className="text-xs  text-lighterGray font-normal lg:block hidden">
                Investment amount
              </p>
              <div className="flex flex-col gap-2">
                <p className="text-xs text-lighterGray font-normal lg:hidden block">
                  Investment amount
                </p>
                <label className="flex gap-2 items-center">
                  <Controller
                    control={control}
                    name="is_cwi_check"
                    render={({ field: { value, onChange } }) => {
                      return (
                        <input
                          onChange={(e) => onChange(e.target.checked)}
                          checked={value}
                          type="checkbox"
                          className="Input accent-brand !w-3"
                        />
                      );
                    }}
                  />
                  <p className="Label text-xs  mb-0">Compare with index</p>
                </label>
              </div>
            </section>
            <span className="text-xs font-normal text-lighterGray">
              {compactInrFormatter.format(watch('invested_amount') as number)}
              &nbsp; invested&nbsp;
              {watch('return_period')}
              &nbsp;months ago would have given a return of
            </span>
          </section>
          <div
            className={classNames(
              'text-xs font-normal text-center mt-2',
              !!watch('fund_code_first') ||
                !!watch('fund_code_second') ||
                !!watch('fund_code_third')
                ? 'hidden'
                : ''
            )}
          >
            Please select funds to analyze the performance of funds
          </div>
          <section
            className={classNames(
              !!watch('fund_code_first') ||
                !!watch('fund_code_second') ||
                !!watch('fund_code_third')
                ? ''
                : 'hidden',
              'px-3 py-4'
            )}
          >
            <div className="flex items-end w-full !h-[450px]">
              <ResponsiveContainer className="w-full h-full min-h-[400px]">
                <BarChart
                  width={100}
                  height={100}
                  barGap={12}
                  data={fundPerformanceAnalysisData}
                  margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
                  stackOffset="expand"
                >
                  <Tooltip
                    cursor={false}
                    content={({ active, payload, label }) => (
                      <CustomTooltip
                        active={active}
                        payload={payload}
                        label={label}
                      />
                    )}
                  />
                  <XAxis tick={false} fill="#d4d4d8" opacity="0.75" />
                  <Bar
                    dataKey="mktValue"
                    barSize={50}
                    stackId="a"
                    fill="#5C537C"
                    opacity="0.75"
                  ></Bar>
                  <Bar dataKey="returns" barSize={40} stackId="a">
                    {fundPerformanceAnalysisData?.map((_fpa, index) => {
                      return (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            Math.sign(_fpa?.originalReturns as number) === -1
                              ? '#EADF83'
                              : '#D1B27B'
                          }
                        />
                      );
                    })}
                    <LabelList
                      dataKey="marketValue"
                      content={renderCustomizedLabel}
                      position="top"
                    />
                  </Bar>

                  {watch('is_cwi_check') === true && (
                    <>
                      <Bar
                        dataKey="benchmarkMktValue"
                        barSize={50}
                        stackId="b"
                        fill="#5C537C"
                        opacity="0.75"
                      ></Bar>
                      <Bar dataKey="benchmarkReturns" barSize={40} stackId="b">
                        {fundPerformanceAnalysisData?.map((_fpa, index) => {
                          return (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                Math.sign(
                                  _fpa?.originalbenchmarkReturns as number
                                ) === -1
                                  ? '#EADF83'
                                  : '#D1B27B'
                              }
                            />
                          );
                        })}
                        <LabelList
                          dataKey="benchmarkMarketValue"
                          content={renderCustomizedLabel}
                          position="top"
                        />
                      </Bar>
                    </>
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 p-2">
          <Controller
            control={control}
            name="fund_code_first"
            render={({ field: { value, onChange, name } }) => (
              <>
                <ReactSelect
                  placeholder={<div className="text-xs">Select Fund</div>}
                  classNamePrefix="Input"
                  value={
                    mfCodeData
                      ?.map((_result) => ({
                        value: _result?.crisil_scheme_code,
                        label: _result?.plan_name,
                      }))
                      .find((c) => c.value === value) || ''
                  }
                  onChange={(e: any) => {
                    onChange(e ? e.value : '');
                  }}
                  options={mfCodeData
                    ?.map((_result) => ({
                      value: _result?.crisil_scheme_code,
                      label: _result?.plan_name,
                    }))
                    .filter(
                      (item) =>
                        item.value !== watch('fund_code_third') &&
                        item.value !== watch('fund_code_second')
                    )}
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
                        : base.borderColor,
                      '&:hover': {
                        boxShadow: state.isFocused ? '#C5A265' : 'none',
                        borderColor: state.isFocused
                          ? '#C5A265'
                          : base.borderColor,
                      },
                    }),
                    indicatorSeparator: (base, state) => ({
                      ...base,
                      display: 'none',
                    }),
                    dropdownIndicator: (base, state) => ({
                      ...base,
                      padding: '2px',
                    }),
                    option: (base, state) => ({
                      ...base,
                      fontSize: '12px',
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
                    valueContainer: (base, state) => ({
                      ...base,
                      padding: '2px',
                      fontSize: '12px',
                    }),
                  }}
                  name={name}
                  isSearchable
                  isClearable
                  menuPlacement="top"
                  onMenuScrollToBottom={() => setPageIndex(pageIndex + 1)}
                  onInputChange={(value) => {
                    setQuery(value);
                    setPageIndex(1);
                  }}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="fund_code_second"
            render={({ field: { value, onChange, name } }) => (
              <>
                <ReactSelect
                  placeholder={<div className="text-xs">Select Fund</div>}
                  classNamePrefix="Input"
                  value={
                    mfCodeData
                      ?.map((_result) => ({
                        value: _result?.crisil_scheme_code,
                        label: _result?.plan_name,
                      }))
                      .find((c) => c.value === value) || ''
                  }
                  onChange={(e: any) => {
                    onChange(e ? e.value : '');
                  }}
                  options={mfCodeData
                    ?.map((_result) => ({
                      value: _result?.crisil_scheme_code,
                      label: _result?.plan_name,
                    }))
                    .filter(
                      (item) =>
                        item.value !== watch('fund_code_first') &&
                        item.value !== watch('fund_code_third')
                    )}
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
                        : base.borderColor,
                      '&:hover': {
                        boxShadow: state.isFocused ? '#C5A265' : 'none',
                        borderColor: state.isFocused
                          ? '#C5A265'
                          : base.borderColor,
                      },
                    }),
                    indicatorSeparator: (base, state) => ({
                      ...base,
                      display: 'none',
                    }),
                    dropdownIndicator: (base, state) => ({
                      ...base,
                      padding: '2px',
                    }),
                    option: (base, state) => ({
                      ...base,
                      fontSize: '12px',
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
                    valueContainer: (base, state) => ({
                      ...base,
                      padding: '2px',
                      fontSize: '12px',
                    }),
                  }}
                  isSearchable
                  isClearable
                  menuPlacement="top"
                  onMenuScrollToBottom={() => setPageIndex(pageIndex + 1)}
                  onInputChange={(value) => {
                    setQuery(value);
                    setPageIndex(1);
                  }}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="fund_code_third"
            render={({ field: { value, onChange, name } }) => (
              <>
                <ReactSelect
                  placeholder={<div className="text-xs">Select Fund</div>}
                  classNamePrefix="Input"
                  value={
                    mfCodeData
                      ?.map((_result) => ({
                        value: _result?.crisil_scheme_code,
                        label: _result?.plan_name,
                      }))
                      .find((c) => c.value === value) || ''
                  }
                  onChange={(e: any) => {
                    onChange(e ? e.value : '');
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
                        : base.borderColor,
                      '&:hover': {
                        boxShadow: state.isFocused ? '#C5A265' : 'none',
                        borderColor: state.isFocused
                          ? '#C5A265'
                          : base.borderColor,
                      },
                    }),
                    indicatorSeparator: (base, state) => ({
                      ...base,
                      display: 'none',
                    }),
                    dropdownIndicator: (base, state) => ({
                      ...base,
                      padding: '2px',
                    }),
                    valueContainer: (base, state) => ({
                      ...base,
                      padding: '2px',
                      fontSize: '12px',
                    }),
                    option: (base, state) => ({
                      ...base,
                      fontSize: '12px',
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
                  options={mfCodeData
                    ?.map((_result) => ({
                      value: _result?.crisil_scheme_code,
                      label: _result?.plan_name,
                    }))
                    .filter(
                      (item) =>
                        item.value !== watch('fund_code_first') &&
                        item.value !== watch('fund_code_second')
                    )}
                  isSearchable
                  isClearable
                  menuPlacement="top"
                  onMenuScrollToBottom={() => setPageIndex(pageIndex + 1)}
                  onInputChange={(value) => {
                    setQuery(value);
                    setPageIndex(1);
                  }}
                />
              </>
            )}
          />
        </div>

        {isFundPerformanceAnalysisLoading && (
          <p className="text-lighterGray text-3xl absolute top-[50%] left-[40%]">
            Loading ...
          </p>
        )}
      </div>
      <FundPerformanceAnalysisModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        message={message}
        buttonLabel="okay"
      />
    </>
  );
}
