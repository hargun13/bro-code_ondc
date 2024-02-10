import React, { useState, useContext } from "react";
//, useEffect , { useState }
// import { useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
import { Box } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { ChecklistContext } from './ChecklistContext';


const AddPrompt2Gen = () => {

  const {prompt, setPrompt} = useContext(ChecklistContext);
  const {checklistData, setChecklistData} = useContext(ChecklistContext);

  const handleGenerate = () => {
    fetch('http://localhost:5000/get_response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: prompt })
    })
    .then(response => response.json())
    .then(data => {
      setChecklistData(data.response);
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div>
        <Box display="flex" gap="8px" className="flex items-center justify-center py-10">
            {/* SEARCH BAR */}
            <Box display="flex" border="1px solid black" borderRadius="8px" padding="5px" style={{width:"80%"}}>

                <InputBase sx={{ ml: 2, flex: 1 }} fullWidth="true" placeholder="Enter Prompt to generate compliance checklist for whatever you need..." 
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                />

                <Button variant='contained' style={{textTransform:"capitalize"}} onClick={handleGenerate}>Generate</Button>

            </Box>

        </Box>
    </div>
  )
}

export default AddPrompt2Gen
