export const CANValidationCANValidate = ({ setIsOpen }) => {
  return (
    <>
      <section className="text-lightGray text-xl font-medium mt-8">
        CAN Validation
      </section>
      <div className="bg-white mt-3 mx-auto rounded-lg p-8">
        <div className="border-[1px] border-light">
          <section className="text-lightGray font-normal text-sm border-b-[1px] border-light rounded-t rounded-b-none px-7 py-3 bg-lighter">
            Validate CAN
          </section>
          <form className="mx-auto p-7">
            <div className="grid grid-cols-2 gap-6">
              <label>
                <span className="Label">CAN </span>
                <input
                  name="can"
                  type="text"
                  placeholder="Enter your CAN"
                  className="Input"
                  required
                />
              </label>
              <label>
                <span className="Label">PAN</span>
                <input
                  name="pan"
                  type="text"
                  placeholder="Enter PAN Details"
                  className="Input"
                  required
                />
              </label>
              <label>
                <span className="Label">Date of Birth</span>
                <input
                  name="dob"
                  type="date"
                  placeholder="Enter DOB"
                  className="Input"
                  required
                />
              </label>
              <label>
                <span className="Label">Email-id</span>
                <input
                  name="email"
                  type="text"
                  placeholder="Enter your email-id"
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
        <section className="w-48 mt-5 text-lightGray text-base font-normal">
          Don&lsquo;t Know CAN number ? Fetch Now
        </section>
      </div>
    </>
  );
};
