import { useState } from "react";
import "./style.css";

const AddTransForm = (props) => {
  const { onSubmitFunc } = props;
  const initialFormInputs = {
    inputTitle: "",
    inputAmount: "",
    inputCategory: "Expense",
    inputPayType: "Cash",
  };
  const [inpFormData, setInpFormData] = useState(initialFormInputs);

  const doUpdateInputForm = (e, { inputName }) => {
    const value = e.target.value;
    setInpFormData((prevState) => ({
      ...prevState,
      [inputName]: value,
    }));
  };

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0"); // Ensures 2-digit format
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const doAddTransData = (e) => {
    e.preventDefault();
    // console.log(e.target);
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
    // console.log(formValues);
    formValues.date = getCurrentDate();
    // console.log("formValues", formValues);
    onSubmitFunc(formValues)
    // if (1===10) onSubmitFunc(formValues)
  };

  return (
    <form className="add-trans-form" onSubmit={doAddTransData}>
      <div className="add-trans-input-box">
        <label htmlFor="add-title">TITLE</label>
        <input
          type="text"
          id="add-title"
          className="add-trans-input"
          name="title"
          value={inpFormData.inputTitle}
          onChange={(e) => doUpdateInputForm(e, { inputName: "inputTitle" })}
          placeholder="Enter Title"
          required
        />
      </div>
      <div className="add-trans-input-box">
        <label htmlFor="add-amount">AMOUNT</label>
        <input
          type="number"
          min="0"
          step="any"
          id="add-amount"
          className="add-trans-input"
          name="amount"
          value={inpFormData.inputAmount}
          onChange={(e) => doUpdateInputForm(e, { inputName: "inputAmount" })}
          placeholder="Enter Amount"
          required
        />
      </div>
      <div className="add-trans-input-box">
        <label htmlFor="add-category">CATEGORY</label>
        <select
          id="add-category"
          className="add-cat-select"
          name="category"
          value={inpFormData.inputCategory}
          onChange={(e) => doUpdateInputForm(e, { inputName: "inputCategory" })}
        >
          <option className="add-cat-option" value="Income">
            Income
          </option>
          <option className="add-cat-option" value="Expense">
            Expense
          </option>
        </select>
      </div>
      <div className="add-trans-input-box">
        <label htmlFor="add-type">PAYMENT TYPE</label>
        <select
          id="add-type"
          className="add-type-select"
          name="payment_method"
          value={inpFormData.inputPayType}
          onChange={(e) => doUpdateInputForm(e, { inputName: "inputPayType" })}
        >
          <option className="add-type-option" value="Cash">
            Cash
          </option>
          <option className="add-type-option" value="Online">
            Online
          </option>
          <option className="add-type-option" value="Card">
            Card
          </option>
        </select>
      </div>
      <input type="submit" className="add-trans-submit-btn" value="Add" />
    </form>
  );
};

export default AddTransForm;
