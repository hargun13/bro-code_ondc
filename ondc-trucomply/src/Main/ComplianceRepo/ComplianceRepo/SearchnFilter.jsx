import React from 'react';
import { IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const SearchnFilter = ({ setSearchQuery }) => {

  const handleInputChange = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <div className="flex items-center justify-center py-10">
        {/* SEARCH BAR */}
        <div className="flex border border-black rounded-xl padding-5" style={{ width: "80%" }}>
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            fullWidth="true"
            placeholder="Search"
            onChange={handleInputChange}
          />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default SearchnFilter;
