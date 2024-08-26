"use client";
import { useState, useId } from "react";
import addRecall from "@/app/actions/addRecall";
import SubmitButton from "./SubmitButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { options } from "@/config/recallReasonType";
import * as dropdown from "@/config/recallDropDowns";
const animatedComponents = makeAnimated();
import { useFormState } from "react-dom";

const RecallAddForm = () => {
  const selectId = useId();
  const [formState, action] = useFormState(addRecall, { errors: {} });
  const [recallType, setRecallType] = useState("Voluntary");
  const [productLabel, setProductLabel] = useState("");
  const [overview, setOverview] = useState("");
  const [selectedReasonTypes, setSelectedReasonTypes] = useState([]); // Optional
  const [recallBizDate, setRecallBizDate] = useState(null);

  const handleBizDateChange = (date) => {
    console.log("date", date);
    console.log("recall type", recallType);
    setRecallBizDate(date);
  };

  const handleRecallTypeChange = (e) => {
    if (e.target.value === "Mandatory") {
      setRecallBizDate((dt) => "");
    }
    setRecallType(e.target.value);
  };
  const handleReasonTypeChange = (selected) => {
    setSelectedReasonTypes(selected); // Update state if needed
    console.log(selected);
  };

  return (
    <form action={action}>
      <h2 className="text-3xl text-center font-semibold mb-6">Add Recall</h2>

      <div className="mb-4">
        <label
          htmlFor="recall_type"
          className="block text-gray-700 font-bold mb-2"
        >
          Recall Type
        </label>
        {formState.errors.recall_type ? (
          <div className="p-2 bg-red-200 border border-red-400 rounded">
            {formState.errors.recall_type?.join(", ")}
          </div>
        ) : null}
        <select
          id="recall_type"
          name="recall_type"
          className={`border rounded w-full py-2 px-3 ${
            !!formState.errors.recall_type && "border border-red-400"
          }`}
          value={recallType}
          onChange={handleRecallTypeChange}
        >
          {dropdown.recallTypeOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {recallType === "Voluntary" && (
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Business Recall Date
          </label>
          {formState.errors.biz_recall_date ? (
            <div className="p-2 bg-red-200 border border-red-400 rounded">
              {formState.errors.biz_recall_date?.join(", ")}
            </div>
          ) : null}
          <DatePicker
            className={`border rounded w-full py-2 px-3 mb-2 ${
              !!formState.errors.biz_recall_date && "border border-red-400"
            }`}
            selected={recallBizDate || null}
            onChange={handleBizDateChange}
            dateFormat="M/dd/yyyy"
            placeholderText="Select a date"
            todayButton="Today"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Product Label
        </label>
        {formState.errors.product_label ? (
          <div className="p-2 bg-red-200 border border-red-400 rounded">
            {formState.errors.product_label?.join(", ")}
          </div>
        ) : null}
        <input
          type="text"
          id="product_label"
          name="product_label"
          className={`border rounded w-full py-2 px-3 mb-2 ${
            !!formState.errors.product_label && "border border-red-400"
          }`}
          placeholder="eg. Chicken Street Taco Kit"
          value={productLabel}
          onChange={(e) => setProductLabel(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Recall Reason Type
        </label>
        {formState.errors.recall_reason_types ? (
          <div className="p-2 bg-red-200 border border-red-400 rounded">
            {formState.errors.recall_reason_types?.join(", ")}
          </div>
        ) : null}
        <Select
          inputId={selectId}
          isMulti // Enable multi-selection
          closeMenuOnSelect={false}
          components={animatedComponents}
          options={options}
          value={selectedReasonTypes} // Pass selected options
          onChange={handleReasonTypeChange} // Handle selection changes
          className={
            !!formState.errors.recall_reason_types && "border border-red-400"
          }
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="overview"
          className="block text-gray-700 font-bold mb-2"
        >
          Recall Overview
        </label>
        {formState.errors.overview ? (
          <div className="p-2 bg-red-200 border border-red-400 rounded">
            {formState.errors.overview?.join(", ")}
          </div>
        ) : null}
        <textarea
          id="overview"
          name="overview"
          className={`border rounded w-full py-2 px-3 ${
            !!formState.errors.overview && "border border-red-400"
          }`}
          rows="4"
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Business Website
        </label>
        {formState.errors.website ? (
          <div className="p-2 bg-red-200 border border-red-400 rounded">
            {formState.errors.website?.join(", ")}
          </div>
        ) : null}
        <input
          type="text"
          id="biz_website"
          name="biz_website"
          className={`border rounded w-full py-2 px-3 mb-2  ${
            !!formState.errors.website && "border border-red-400"
          }`}
        />
      </div>

      <div>
        <input
          type="hidden"
          id="hid_biz_recall_date"
          name="hid_biz_recall_date"
          value={recallBizDate || ""}
        />
        <input
          type="hidden"
          id="hid_recall_reason_type"
          name="hid_recall_reason_type"
          value={JSON.stringify(selectedReasonTypes)}
        />
        {formState.errors._form ? (
          <div className="p-2 bg-red-200 border border-red-400 rounded mb-3">
            {formState.errors._form?.join(", ")}
          </div>
        ) : null}
        <SubmitButton />
      </div>
    </form>
  );
};
export default RecallAddForm;
