import React, { useState, useContext } from "react";
import axios from 'axios'
import { FormContext } from "./FormContext";


const AdditionalInfo = () => {

  const { formData, updateFormData } = useContext(FormContext);

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    updateFormData(name, value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post("http://localhost:5000/additional_data", formData);
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form class=" mx-auto grid md:grid-cols-2 md:gap-5 w-full px-8">
      
      <div class="relative z-0 w-full mb-6 ">
        <label
          for="purpose"
          class="block mb-2 text-sm font-medium text-gray-900"
        >
          Purpose of Account/Transaction
        </label>
        <input
          type="text"
          id="purpose"
          name="purpose"
          value={formData.purpose || ''}
          onChange={handleChange}
          class="block w-full py-2.5 px-4 text-sm text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter purpose"
        />
      </div>

      <div class="relative z-0 w-full mb-6">
        <label
          for="benificiary_details"
          class="block mb-2 text-sm font-medium text-gray-900"
        >
          Beneficiary Details (if applicable)
        </label>
        <textarea
          id="benificiary_details"
          name="benificiary_details"
          class="block w-full py-2.5 px-4 text-sm text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter beneficiary details"
          value={formData.benificiary_details || ''}
          onChange={handleChange}
        ></textarea>
      </div>

      <div class="relative z-0 w-full mb-6">
        <label
          for="tax_residency_status"
          class="block mb-2 text-sm font-medium text-gray-900"
        >
          Tax Residency Status
        </label>
        <select
          id="tax_residency_status"
          name="tax_residency_status"
          class="block w-full py-2.5 px-4 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={formData.tax_residency_status || ''}
          onChange={handleChange}
        >
          <option value="">Select tax residency status</option>
          <option value="resident">Resident</option>
          <option value="non-resident">Non-Resident</option>
        </select>
      </div>

      <div class="relative z-0 w-full mb-6">
        <label
          for="politically_exposed_person_status"
          class="block mb-2 text-sm font-medium text-gray-900"
        >
          Politically Exposed Person (PEP) Status
        </label>
        <select
          id="politically_exposed_person_status"
          name="politically_exposed_person_status"
          class="block w-full py-2.5 px-4 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={formData.politically_exposed_person_status || ''}
          onChange={handleChange}
        >
          <option value="">Select PEP status</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div class="relative z-0 w-full mb-6">
        <label
          for="declaration_of_financial_statment"
          class="block mb-2 text-sm font-medium text-gray-900"
        >
          Declaration of Financial Status and Investment Experience
        </label>
        <textarea
          id="declaration_of_financial_statment"
          name="declaration_of_financial_statment"
          class="block w-full py-2.5 px-4 text-sm text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter declaration"
          value={formData.declaration_of_financial_statment || ''}
          onChange={handleChange}
        ></textarea>
      </div>

      <div class="relative z-0 w-full mb-6">
        <label
          for="signature"
          class="block mb-2 text-sm font-medium text-gray-900"
        >
          Signature (if physical documentation is involved)
        </label>
        <input
          type="text"
          id="signature"
          name="signature"
          class="block w-full py-2.5 px-4 text-sm text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter signature"
          value={formData.signature || ''}
          onChange={handleChange}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        disabled={submitting}
      >
        {submitting ? "Saving..." : "Save"}
      </button>

    </form>
  );
};

export default AdditionalInfo;
