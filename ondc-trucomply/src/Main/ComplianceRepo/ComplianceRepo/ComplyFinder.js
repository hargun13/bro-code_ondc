import React, { useEffect, useState } from 'react';
import SearchnFilter from './SearchnFilter';
import Card from './Card';

const ComplyFinder = () => {
  const [compliances, setCompliances] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get_data');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setCompliances(data); // Set the fetched data in state
      console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <div className='bg-gradient-to-r from-blue-600 to-blue-200 text-white font-extrabold'>
        <p className="text-4xl px-10 pb-5 pt-5 text-center">ComplyFinder</p>
        <p className="text-normal italic px-10 pb-5 text-center">Look Up your compliances and ask anything</p>
      </div>

      <SearchnFilter />
      
      <div className="flex flex-wrap justify-center">
        {/* Map through compliances and render a Card component for each */}
        {compliances.map((compliance, index) => (
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
    </div>
  );
};

export default ComplyFinder;
