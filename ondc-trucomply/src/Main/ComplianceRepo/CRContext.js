import React, { createContext, useState } from "react";

export const CRContext = createContext();

export const CRProvider = ({ children }) => {
  const [pdfURL, setPdfURL] = useState("");
  const [title, setTitle ] = useState("");

  return (
    <CRContext.Provider value={{ pdfURL, setPdfURL,title, setTitle  }}>
      {children}
    </CRContext.Provider>
  );
};
