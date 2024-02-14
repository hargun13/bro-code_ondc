import React, { useEffect, useState } from 'react';
import SearchnFilter from './SearchnFilter';
import Card from './Card';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/material";


const ComplyFinder = () => {
  const [compliances, setCompliances] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://ondc-backend.onrender.com/get_data');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setCompliances(data); // Set the fetched data in state
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('Error fetching data:', error);
    }
  };

  // Filter compliances based on search query
  const filteredCompliances = compliances.filter(compliance =>
    compliance.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className='bg-gradient-to-r from-blue-600 to-blue-200 text-white font-extrabold'>
        <p className="text-4xl px-10 pb-5 pt-5 text-center">ComplyFinder</p>
        <p className="text-normal italic px-10 pb-5 text-center">Look Up your compliances and ask anything</p>
      </div>

      <SearchnFilter setSearchQuery={setSearchQuery} />
      
      {loading ? <Box sx={{ display: 'flex' }} style={{alignItems:"center", justifyContent:"center"}}><CircularProgress color="inherit" /></Box> : 
      <div className="flex flex-wrap justify-center">
        {/* Map through filtered compliances and render a Card component for each */}
        {filteredCompliances.map((compliance, index) => (
          <Card 
            key={index} 
            title={compliance.title} 
            desc={compliance.description} 
            category={compliance.serial_number} 
            date={compliance.date} 
            penalties={compliance.penalty} 
            firebase_storage_url={compliance.firebase_storage_url} // Pass penalties to the Card component
          />
        ))}
      </div>
      }
    </div>
  );
};

export default ComplyFinder;
