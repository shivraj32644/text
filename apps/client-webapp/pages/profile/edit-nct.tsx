import {
  DashboardHead,
  AuthenticatedDashboardLayout,
} from '../../components/index';
import { ReactElement } from 'react';
import Link from 'next/link';

export default function EditNctDetails() {
  return (
    <>
      <div className="xl:overflow-hidden h-full flex flex-col">
        <DashboardHead>
          <h2 className="font-medium">NCT</h2>
          <div className="text-xs text-lightGray flex gap-1">
            <Link href="/profile/edit-nct">
              <a>Edit NCT</a>
            </Link>
          </div>
        </DashboardHead>

        <div className="flex-grow overflow-y-auto p-8 pb-16">
          <div className="Card flex items-center gap-4 mb-8">
            <Link href="/profile">
              <a className="OutlineButton px-2 py-1 font-bold group-hover:bg-brandDark">
                &#10229; {/* left arrow */}
              </a>
            </Link>
            <h2 className="text-xl text-lightGray flex-grow">
              CAN No: 01250452055
            </h2>
          </div>

          <div className="Card overflow-hidden p-0 mb-8">
            <div className="bg-white mt-3 mx-auto rounded-lg p-8">
              <div className="border-[1px] border-light">
                <section className="text-lightGray font-normal text-sm border-b-[1px] border-light rounded-t rounded-b-none px-7 py-3 bg-lighter">
                  Basic Details
                </section>
                <form className="mx-auto p-5 lg:p-7">
                  <div className="grid grid-cols-2 gap-6">
                    <label>
                      <span className="Label">Email-id</span>
                      <input
                        name="email"
                        type="text"
                        placeholder="Enter your Email"
                        className="Input"
                        required
                      />
                    </label>
                    <label>
                      <span className="Label">Mobile Number</span>
                      <input
                        name="mobile"
                        type="text"
                        placeholder="Re-Enter your Mobile Number"
                        className="Input"
                        required
                      />
                    </label>
                  </div>
                </form>
              </div>
              <div className="border-[1px] border-light mt-8">
                <section className="text-lightGray font-normal text-sm border-b-[1px] border-light rounded-t rounded-b-none px-7 py-3 bg-lighter">
                  Nominee Details
                </section>
                <form className="mx-auto p-5 lg:p-7">
                  <div className="grid grid-cols-2 gap-6">
                    <label>
                      <span className="Label">Name of Nominee</span>
                      <select
                        name="nameofNominee"
                        placeholder="Enter your Nominee"
                        className="Input"
                        required
                      >
                        <option>Ashok Kumar</option>
                      </select>
                    </label>
                    <label>
                      <span className="Label">Relationship</span>
                      <input
                        name="relationship"
                        type="text"
                        placeholder="Enter Relationship"
                        className="Input"
                        required
                      />
                    </label>
                    <label>
                      <span className="Label">Percent(%)</span>
                      <input
                        name="percent"
                        type="text"
                        placeholder="Enter Percent"
                        className="Input"
                        required
                      />
                    </label>
                    <label>
                      <span className="Label">Date Of Birth</span>
                      <input
                        name="dob"
                        type="date"
                        placeholder="Select Your Date Of Birth"
                        className="Input"
                        required
                      />
                    </label>
                  </div>
                </form>
              </div>
              <div className="border-[1px] border-light mt-8">
                <section className="text-lightGray font-normal text-sm border-b-[1px] border-light rounded-t rounded-b-none px-7 py-3 bg-lighter">
                  Bank Details
                </section>
                <form className="mx-auto p-5 lg:p-7">
                  <div className="grid grid-cols-2 gap-6">
                    <label>
                      <span className="Label">Bank A/c No.</span>
                      <input
                        name="bankAccountNumber"
                        type="text"
                        placeholder="Enter your Bank Account Number"
                        className="Input"
                        required
                      />
                    </label>
                    <label>
                      <span className="Label">Re- Enter Bank A/c No.</span>
                      <input
                        name="reBankAccountNumber"
                        type="text"
                        placeholder="Enter your Bank Account Number"
                        className="Input"
                        required
                      />
                    </label>
                    <label>
                      <span className="Label">Account Type</span>
                      <input
                        name="accountType"
                        type="text"
                        placeholder="Enter Account Type"
                        className="Input"
                        required
                      />
                    </label>
                    <label>
                      <span className="Label">Bank Name</span>
                      <input
                        name="bankName"
                        type="date"
                        placeholder="Enter Your Bank Name"
                        className="Input"
                        required
                      />
                    </label>
                    <label>
                      <span className="Label">MICR</span>
                      <input
                        name="micr"
                        type="text"
                        placeholder="Enter Your MICR"
                        className="Input"
                        required
                      />
                    </label>
                    <label>
                      <span className="Label">IFSC</span>
                      <input
                        name="ifsc"
                        type="text"
                        placeholder="Enter Your IFSC"
                        className="Input"
                        required
                      />
                    </label>
                  </div>
                </form>
              </div>
              <div className="border-[1px] border-light mt-8">
                <section className="text-lightGray font-normal text-sm border-b-[1px] border-light rounded-t rounded-b-none px-7 py-3 bg-lighter">
                  FATCA Details
                </section>
                <form className="mx-auto p-5 lg:p-7">
                  <div className="grid grid-cols-2 gap-6">
                    <label>
                      <span className="Label">Place of Birth</span>
                      <input
                        name="placeofBirth"
                        type="text"
                        placeholder="Enter your Place of Birth"
                        className="Input"
                        required
                      />
                    </label>
                    <label>
                      <span className="Label">Country of Birth</span>
                      <select
                        name="countryofBirth"
                        placeholder="Select your Country of Birth"
                        className="Input"
                        required
                      >
                        <option>None</option>
                      </select>
                    </label>
                    <label>
                      <span className="Label">Country of Citzenship</span>
                      <select
                        name="countryofCitzenship"
                        placeholder="Select your Country of Citzenship"
                        className="Input"
                        required
                      >
                        <option>None</option>
                      </select>
                    </label>
                    <label>
                      <span className="Label">Country of Nationality</span>
                      <select
                        name="countryofNationality"
                        placeholder="Select your Country of Nationality"
                        className="Input"
                        required
                      >
                        <option>None</option>
                      </select>
                    </label>
                    <label>
                      <span className="Label">Country of Tax Residency</span>
                      <select
                        name="countryofTaxResidency"
                        placeholder="Select your Country of Tax Residency"
                        className="Input"
                        required
                      >
                        <option>None</option>
                      </select>
                    </label>
                    <label>
                      <span className="Label">Tax Identification Types</span>
                      <select
                        name="taxIdentificationTypes"
                        placeholder="Select your Tax Identification Types"
                        className="Input"
                        required
                      >
                        <option>None</option>
                      </select>
                    </label>
                    <label className="col-span-2">
                      <span className="Label">Tax Identification Number</span>
                      <input
                        name="taxIdentificationNumber"
                        type="text"
                        placeholder="Enter your Tax Identification Number"
                        className="Input"
                        required
                      />
                    </label>
                  </div>
                </form>
              </div>
              <button className="Button col-span-2 uppercase  w-full mt-6">
                update details
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

EditNctDetails.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
