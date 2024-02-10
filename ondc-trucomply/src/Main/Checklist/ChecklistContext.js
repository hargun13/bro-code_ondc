import React, { createContext, useState } from "react";

export const ChecklistContext = createContext();

export const ChecklistProvider = ({ children }) => {
  const [checklistData, setChecklistData] = useState();
  const [prompt, setPrompt] = useState("");

  return (
    <ChecklistContext.Provider value={{ checklistData, setChecklistData, prompt, setPrompt }}>
      {children}
    </ChecklistContext.Provider>
  );
};
