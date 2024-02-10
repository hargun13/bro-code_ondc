import React from "react";
import ConsultantCard from "./ConsultantCard";
import ConsultantData from "./ConsultantData.json";

const Consultant = () => {
  return (
    <div className="">
      <h1 className="text-4xl text-center py-3 font-bold text-[#1976d2]">
        Find Consultants
      </h1>
      <div className="grid grid-cols-4 gap-10 p-10">
        {ConsultantData.map((consultant) => (
          <ConsultantCard
            key={consultant.id}
            name={consultant.name}
            specialization={consultant.specialization}
            description={consultant.description}
            tags={consultant.tags}
            url={consultant.url}
          />
        ))}
      </div>
    </div>
  );
};

export default Consultant;
