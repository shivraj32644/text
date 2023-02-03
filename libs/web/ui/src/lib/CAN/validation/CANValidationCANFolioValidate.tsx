export const CANValidationCANFolioValidate = ({ setIsOpen }) => {
  return (
    <>
      <section className="text-lightGray text-xl font-medium mt-8">
        CAN Folio Validation
      </section>
      <div className="bg-white mt-3 mx-auto rounded-lg p-8">
        <div className="border-[1px] border-light">
          <section className="text-lightGray font-normal text-sm border-b-[1px] border-light rounded-t rounded-b-none px-7 py-3 bg-lighter">
            CAN Folio Validation
          </section>
          <form className="mx-auto p-7">
            <div className="grid grid-cols-2 gap-6">
              <label>
                <span className="Label">CAN</span>
                <input
                  name="can"
                  type="text"
                  placeholder="Enter your CAN"
                  className="Input"
                  required
                />
              </label>
              <label>
                <span className="Label">Folio</span>
                <select
                  name="folio"
                  placeholder="Choose Folio number"
                  className="Input"
                  required
                >
                  <option>None</option>
                </select>
              </label>
              <label>
                <span className="Label">Folio Check Digit</span>
                <input
                  name="folioCheckDigit "
                  type="text"
                  placeholder="Enter Folio Check Digit"
                  className="Input"
                  required
                />
              </label>
              <label>
                <span className="Label">Transaction Type</span>
                <input
                  name="transactionType "
                  type="text"
                  placeholder="Enter Transaction Type"
                  className="Input"
                  required
                />
              </label>
              <label>
                <span className="Label">Fund Code</span>
                <input
                  name="fundCode "
                  type="text"
                  placeholder="Enter Fund Code"
                  className="Input"
                  required
                />
              </label>
            </div>
          </form>
        </div>
        <button
          className="Button col-span-2 uppercase max-w-[228px] w-full mt-6 ml-4"
          onClick={() => setIsOpen(true)}
        >
          Validate
        </button>
      </div>
    </>
  );
};
