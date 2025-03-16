import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";

const SearchBar = ({ onSearch }) => {
  const [inputData, setInputData] = useState("");

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setInputData(e.target.value);
  };
  const searchUser = (event) => {
    event.preventDefault();

    console.log("검색어:", inputData);

    if (inputData.trim() && onSearch) {
      onSearch(inputData.trim());
    }
  };

  return (
    <form
      className="flex w-full max-w-md mx-auto space-x-2 p-2"
      onSubmit={searchUser}
    >
      <input
        type="text"
        value={inputData}
        onChange={handleInputChange}
        placeholder="GitHub 사용자명 입력"
        className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
      <PrimaryButton type="submit">Search</PrimaryButton>
    </form>
  );
};

export default SearchBar;
