import classnames from 'classnames';
import { ReactElement, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthenticatedDashboardLayout } from '../../components/AuthenticatedDashboardLayout';

import {
  RoundSuccessCircleIcon,
  CANValidationSuccessCard,
  CANValidationCANFolioValidate,
  CANValidationPRNValidate,
  CANValidationCANValidate,
  CANValidationBankValidate,
} from '@corpcare/web/ui';
import { DashboardHead } from '../../components/DashboardHead';

const canValidation = [
  {
    title: 'Validate CAN',
  },
  {
    title: 'Validate Bank',
  },
  {
    title: 'Validate PRN',
  },
  {
    title: 'Validate CAN Folio',
  },
];

export default function KycVerification() {
  const [currentTabIndex, setCurrentTabIndex] = useState(1);
  const router = useRouter();
  const [isCANValidated, setIsCANValidated] = useState<boolean>(false);
  const [isBankValidated, setIsBankValidated] = useState<boolean>(false);
  const [isPRNValidated, setIsPRNValidated] = useState<boolean>(false);
  const [isCANFolioValidated, setIsCANFolioValidated] =
    useState<boolean>(false);

  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium">CAN Validation</h2>
        <div className="text-xs text-lightGray">
          <Link href="/profile">
            <a>My Profile </a>
          </Link>
          &gt;
          <Link href="/profile/can-validation">
            <a> CAN Validation</a>
          </Link>
        </div>
      </DashboardHead>
      <div className="flex flex-grow overflow-hidden">
        <section className="max-w-[300px] w-full bg-white h-full p-8 pb-16 overflow-y-auto flex flex-shrink-0 flex-col flex-grow">
          <ol className="overflow-hidden mt-2 flex-grow">
            {canValidation.map((_epay, _epayIdx) => (
              <li
                key={_epay.title}
                className={classnames(
                  _epayIdx !== canValidation.length - 1 ? 'pb-10' : '',
                  'relative'
                )}
              >
                {_epayIdx !== canValidation.length - 1 ? (
                  <div
                    className={classnames(
                      `-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full`,
                      _epayIdx + 1 === currentTabIndex
                        ? 'bg-brand'
                        : 'bg-brandLight'
                    )}
                  />
                ) : null}
                <div className="relative flex items-start group">
                  <span className="h-9 flex items-center">
                    <span
                      className={classnames(
                        `relative z-10 w-8 h-8 flex items-center justify-center rounded text-white`,
                        _epayIdx + 1 === currentTabIndex
                          ? 'bg-brand'
                          : 'bg-brandLight'
                      )}
                    >
                      {_epayIdx + 1}
                    </span>
                  </span>
                  <section className="flex justify-between self-center w-full items-center ">
                    <span className="text-base font-medium tracking-wide text-lightGray ml-4">
                      {_epay.title}
                    </span>
                    {_epayIdx + 1 <= currentTabIndex && (
                      <RoundSuccessCircleIcon className="text-green-600 w-6 h-6" />
                    )}
                  </section>
                </div>
              </li>
            ))}
          </ol>
          <button
            className="uppercase OutlineButton w-full"
            onClick={() => router.push('/profile')}
          >
            go to my profile
          </button>
        </section>
        <div className="overflow-y-auto w-full">
          <div className="mx-8 mb-10">
            {currentTabIndex === 1 && (
              <CANValidationCANValidate setIsOpen={setIsCANValidated} />
            )}
            {currentTabIndex === 2 && (
              <CANValidationBankValidate setIsOpen={setIsBankValidated} />
            )}
            {currentTabIndex === 3 && (
              <CANValidationPRNValidate setIsOpen={setIsPRNValidated} />
            )}
            {currentTabIndex === 4 && (
              <CANValidationCANFolioValidate
                setIsOpen={setIsCANFolioValidated}
              />
            )}
          </div>
        </div>
        <CANValidationSuccessCard
          setIsOpen={setIsCANValidated}
          isOpen={isCANValidated}
          title={'VALIDATION'}
          cardTitle={'Thank You!'}
          cardSubTitle={'The CAN Validation is Successful.'}
          btnText={'Validate BANK NOW'}
          handleButtonClick={() => {
            setIsCANValidated(false);
            setCurrentTabIndex(currentTabIndex + 1);
          }}
        />
        <CANValidationSuccessCard
          setIsOpen={setIsBankValidated}
          isOpen={isBankValidated}
          title={'VALIDATION'}
          cardTitle={'Thank You!'}
          cardSubTitle={'The Bank Validation is Successful.'}
          btnText={'Validate PRN NOW'}
          handleButtonClick={() => {
            setIsBankValidated(false);
            setCurrentTabIndex(currentTabIndex + 1);
          }}
        />
        <CANValidationSuccessCard
          setIsOpen={setIsPRNValidated}
          isOpen={isPRNValidated}
          title={'VALIDATION'}
          cardTitle={'Thank You!'}
          cardSubTitle={'The PRN Validation is Successful.'}
          btnText={'Validate CAN Folio NOW'}
          handleButtonClick={() => {
            setIsPRNValidated(false);
            setCurrentTabIndex(currentTabIndex + 1);
          }}
        />
        <CANValidationSuccessCard
          setIsOpen={setIsCANFolioValidated}
          isOpen={isCANFolioValidated}
          title={'VALIDATION'}
          cardTitle={'Thank You!'}
          cardSubTitle={'The CAN Folio Validation is Successful.'}
          btnText={'EXPLORE MUTUAL FUNDS'}
          handleButtonClick={() => {
            setIsCANFolioValidated(false);
            router.push('/mutual-funds/all');
          }}
        />
      </div>
    </div>
  );
}

KycVerification.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
