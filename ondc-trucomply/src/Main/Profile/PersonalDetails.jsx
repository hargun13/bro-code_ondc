import React, { useState, useContext } from "react";
import axios from 'axios'
import data from "./data.json";
import { FormContext } from "./FormContext";



const PersonalDetails = () => {

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
      const response = await axios.post("http://localhost:5000/add_data", formData);
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full px-9 mb-5">
      <form class=" mx-auto w-full">
        <div class="grid md:grid-cols-3 md:gap-3 w-full">


          <div class="relative z-0 w-full mb-3 group">
            <input
              type="text" name="first_name" id="first_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" " required
              value={formData.first_name || ''}
              onChange={handleChange}
            />
            <label
              for="first_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First name
            </label>
          </div>


          <div class="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="middle_name"
              id="middle_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={formData.middle_name || ''}
              onChange={handleChange}
            />
            <label
              for="middle_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Middle name
            </label>
          </div>


          <div class="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="last_name"
              id="last_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={formData.last_name || ''}
              onChange={handleChange}
            />
            <label
              for="last_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last name
            </label>
          </div>
        </div>


        <div class="grid md:grid-cols-2 md:gap-3 w-full">
          <div class="relative z-0 w-full mb-3 group">
            <label
              htmlFor="date_of_birth"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="date_of_birth"
              name="date_of_birth"
              className="dark:bg-gray-50 border dark:border-gray-900 dark:text-gray-900 text-sm rounded-lg dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-900 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
              required
              value={formData.date_of_birth || ''}
              onChange={handleChange}
            />
          </div>


          <div class="relative z-0 w-full mb-3 group">
            <label
              for="gender"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Select your Gender
            </label>
            <select
              id="gender" name="gender"
              class="dark:bg-gray-50 border dark:border-gray-900 dark:text-gray-900 text-sm rounded-lg dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-900 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
              value={formData.gender || ''}
              onChange={handleChange}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </select>
          </div>

          <div class="relative z-0 w-full mb-3 group">
            <input
              type="email"
              name="email"
              id="email"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={formData.email || ''}
              onChange={handleChange}
            />
            <label
              for="email"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>

          <div class="relative z-0 w-full mb-3 group">
            <input
              type="email"
              name="alternate_email"
              id="alternate_email"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={formData.alternate_email || ''}
              onChange={handleChange}
            />
            <label
              for="alternate_email"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Alternate email address
            </label>
          </div>


          <div class="relative z-0 w-full mb-3 group">
            <input
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              name="Phone_number"
              id="Phone_number"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={formData.Phone_number || ''}
              onChange={handleChange}
            />
            <label
              for="Phone_number"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number (123-456-7890)
            </label>
          </div>


          <div class="relative z-0 w-full mb-3 group">
            <input
              type="text"
              name="occupation"
              id="occupation"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={formData.occupation || ''}
              onChange={handleChange}
            />
            <label
              for="occupation"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Occupation
            </label>
          </div>


          <div class="relative z-0 w-full mb-3 group">
            <label
              for="Nationality"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Select you Nationality
            </label>
            <select
              id="Nationality" name="Nationality"
              class="dark:bg-gray-50 border dark:border-gray-900 dark:text-gray-900 text-sm rounded-lg dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-900 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
              value={formData.Nationality || ''}
              onChange={handleChange}
            >
              <option>Select your country</option>
              {data.Nationalities.map((nationality) => (
                <option key={nationality} value={nationality}>
                  {nationality}
                </option>
              ))}
            </select>
          </div>


          <div class="relative z-0 w-full mb-3 group">
            <label
              for="marital_status"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Marital Status
            </label>
            <select
              id="marital_status" name="marital_status"
              class="dark:bg-gray-50 border dark:border-gray-900 dark:text-gray-900 text-sm rounded-lg dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-900 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
              value={formData.marital_status || ''}
              onChange={handleChange}
            >
              <option>Single</option>
              <option>Married</option>
              <option>Widowed</option>
              <option>Divorced</option>
              <option>Separated</option>
              <option>Civil Partnership </option>
              <option>Domestic Partnership </option>
              <option>Common-Law Marriage </option>
            </select>
          </div>


          <div class="relative z-0 w-full mb-3 group">
            <label
              for="educational_qualification"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Education
            </label>
            <select
              id="educational_qualification" name="educational_qualification"
              class="dark:bg-gray-50 border dark:border-gray-900 dark:text-gray-900 text-sm rounded-lg dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-900 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
              value={formData.educational_qualification || ''}
              onChange={handleChange}
            >
              <option>High School Diploma or Equivalent</option>
              <option>Associate's Degree (e.g., AA, AS)</option>
              <option>Bachelor's Degree (e.g., BA, BS)</option>
              <option>Master's Degree (e.g., MA, MS, MBA)</option>
              <option>Doctoral Degree (e.g., PhD, EdD, MD)</option>
              <option>Professional Degree (e.g., JD, MD, DDS)</option>
              <option>Some College, No Degree</option>
              <option>Other</option>
            </select>
          </div>


          <div class="relative z-0 w-full mb-3 group">
            <label
              for="income"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Income
            </label>
            <input
              type="number"
              id="income"
              name="income"
              class="block w-full py-2.5 px-4 text-sm text-gray-900 placeholder-gray-400 bg-white border border-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your income"
              // You can add additional attributes such as min, max, step, etc. as needed
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={submitting}
        >
          {submitting ? "Saving..." : "Save"}
        </button>

      </form>
    </div>
  );
};

export default PersonalDetails;
