import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import axios from 'axios';
// , {useState, useEffect}

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', borderRadius:'100%' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius:'100%',
          border:'2px',
          boxShadow:'2px 2px 2px 2px rgba(0, 0, 0, 0.2)'
        }}
      >
        <Typography variant="h2" component="div" color="text.secondary" textAlign="center">
          {`${Math.round(props.value)}`}<br/><span className='text-lg'>Fitness Score</span>
        </Typography>
      </Box>
    </Box>
  );
}




const MainDash = () => {
  const progress = 69
  // const [userData, setUserData] = useState(null);
  // const [status, setStatus] = useState('');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('https://0313-2409-40c0-28-33dd-c481-44de-4015-4df9.ngrok-free.app/get');
  //       const result = response.data;

  //       if (result.status === 'success') {
  //         setUserData(result.data[0]);
  //         setStatus(result.status);
  //       } else {
  //         // Handle error status
  //         setStatus(result.status);
  //       }
  //     } catch (error) {
  //       // Handle fetch error
  //       console.error('Error fetching data:', error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);
  
  // console.log(userData)

  return (
    <div className='flex items-center justify-center w-full h-[86vh] p-8 bg-[#f7f7f7]'>
      {/* First Section */}
      <div className='w-[33%] h-full flex items-center justify-around flex-col '>

        <div className='flex items-center justify-center w-full match-height gap-4 my-2 h-[25%]'>
          <div className="bg-white p-4 rounded-md shadow-lg w-[70%] h-full my-2">
            <h3 className="text-2xl font-semibold mb-2">72 </h3>
            <p className='text-sm'>Resting Heart Rate (bpm)</p>
          </div>
        </div>


      </div>

      {/* Second Section with CircularProgressWithLabel */}
      <div className='w-[33%] h-full flex flex-col items-center justify-center' >
        <h1 className='text-5xl tracking-widest mb-10 font-extrabold'>User KPIs</h1>
        <CircularProgressWithLabel value={progress} size={250} />
      </div>

    </div>
  );
}

export default MainDash;
