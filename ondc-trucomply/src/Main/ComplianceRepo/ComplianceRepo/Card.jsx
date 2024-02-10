import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { CRContext } from '../CRContext';
import { Box } from "@mui/material";
import Modal from '@mui/material/Modal';

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
  color: 'white',
  px: 4,
  py: 5
};

const Card = ({ title, desc, category, date, penalties, firebase_storage_url }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { setTitle, setPdfURL } = useContext(CRContext);
  const handleLearnMore = () => {
    setPdfURL(firebase_storage_url);
    setTitle(title);
  };

  return (
    <div className="w-[50%] lg:max-w-full lg:flex p-10">

      <div className="w-full border-r border-b border-l border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded p-4 flex flex-col justify-between leading-normal shadow-2xl">
        <div className="mb-4">
          <div className="text-gray-900 font-bold text-xl mb-2">
            <span className='font-bold'>Title: </span> {title}
          </div>
          <p className="text-gray-700 text-base">
            <span className='font-bold'>Desc: </span> {desc}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <p className="text-gray-900 leading-none">
              <span className='font-bold'>Compliance Category: </span> {category}
            </p>
            <p className="text-gray-600">
              <span className='font-bold'>Enactment Date: </span> {date}
            </p>
          </div>
          <div>
            <Button onClick={handleOpen} variant='contained' style={{ marginRight: "10px" }}>Penalties</Button>

            <Link to='/crbot' onClick={handleLearnMore}><Button variant='contained'>Learn More</Button></Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Card;
