import React, { useState, useContext } from "react";
import Button from '@mui/material/Button';
import { Box } from "@mui/material";
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import { ChecklistContext } from './ChecklistContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: '#15181C',
  border: '1px solid ',
  boxShadow: 24,
  borderRadius: 5,
  color:'white',
  px: 4,
  py: 5
};

const Card = () => {
  const { prompt, checklistData, loading } = useContext(ChecklistContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
  const year = currentDate.getFullYear();

  // const checklistItems = checklistData.split(', ');

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Title: {prompt}</h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Date: {day}/{month}/{year}</p>
      <style>
        {`
          .checked label {
            text-decoration: line-through;
          }
        `}
      </style>
      <div>
        <Button variant='contained' onClick={handleOpen}>
          {loading ? <Box sx={{ display: 'flex' }}><CircularProgress color="inherit" /></Box> : 'Read'}
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h1 className="text-center text-2xl mb-10">Checklist for {prompt}</h1>
            <div className='overflow-y-scroll p-3 h-48'>
              <ul>
                {/* Map checklist items */}
                {checklistData.map((item, index) => (
                  <li key={index} className="mb-2">
                    <input type="checkbox" id={`check-${index}`} />
                    <label htmlFor={`check-${index}`} className="ms-2">{item.item}</label>
                  </li>
                ))}
                {/* {checklistData} */}
              </ul>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

const PrevChecklists = () => {

  return (
    <div className='p-5'>
      <h1 className='text-3xl font-bold my-4'>Previous Checklists</h1>
      <Card />
    </div>
  );
};

export default PrevChecklists;
