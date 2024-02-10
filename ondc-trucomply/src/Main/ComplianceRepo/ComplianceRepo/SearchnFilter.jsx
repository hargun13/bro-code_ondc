import React, { useState } from 'react';
//, useEffect
// import { useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Box, IconButton} from "@mui/material";
import InputBase from "@mui/material/InputBase";
//icons
import { FaFilter } from "react-icons/fa";
import SearchIcon from "@mui/icons-material/Search";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'white',
  border: '1px solid ',
  boxShadow: 24,
  borderRadius: 10,
  color:'black',
  px: 4,
  py: 5
};


const SearchnFilter = () => {

    
    const [open, setOpen] = useState(false);
    const handleFilterOpen = () => setOpen(true);
    const handleFilterClose = () => setOpen(false);

  return (
    <div>
        <Box display="flex" gap="8px" className="flex items-center justify-center py-10">
            {/* SEARCH BAR */}
            <Box display="flex" border="1px solid black" borderRadius="8px" padding="5px" style={{width:"80%"}}>

                <InputBase sx={{ ml: 2, flex: 1 }} fullWidth="true" placeholder="Search" />

                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>


                <IconButton onClick={handleFilterOpen} type="button" sx={{ p: 1 }}>
                    <FaFilter size={20}/>
                </IconButton>

                <Modal
                    open={open} onClose={handleFilterClose}
                    aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <h1 className=" text-center text-2xl mb-10">Filters</h1>

                        <div className="w-full flex flex-col items-start my-5 justify-start">

                            <div className='mb-4 w-full flex items-center justify-between'>
                                <p className=' text-lg'>Compliance Category</p>
                                <Box sx={{ minWidth: 120 }} style={{color:"white"}}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={age}
                                        label="Age"
                                        // onChange={handleChange}
                                        >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>

                            <div className='w-full flex items-center justify-between my-5'>
                                <p className='my-2 text-lg'>Enactment Year</p>
                                <InputBase sx={{ ml: 2 }}  placeholder="Search" />
                            </div>
                            
                        </div>

                        <Button variant="contained" className=" my-3 bg-[#4961e7] transition duration-300 hover:text-black px-5 py-2 rounded-full "
                        >Apply</Button>

                    </Box>

                </Modal>


                
            </Box>

        </Box>
    </div>
  )
}

export default SearchnFilter