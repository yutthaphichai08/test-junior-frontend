import React from "react";

interface SearchComponentProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchComponent;
