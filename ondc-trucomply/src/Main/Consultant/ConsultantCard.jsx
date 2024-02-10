import React from "react";
import { Link } from "react-router-dom";

const ConsultantCard = (props) => {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-6 pt-8">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={props.url}
          alt="consultant profile"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {props.name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {props.specialization}
        </span>
        <p className="text-sm text-gray-600 dark:text-gray-300 px-6 py-4">
          {props.description}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {props.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-900 bg-blue-200 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex mt-4 md:mt-6">
          <Link
            to={`/consult/${props.id}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Consult
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConsultantCard;
