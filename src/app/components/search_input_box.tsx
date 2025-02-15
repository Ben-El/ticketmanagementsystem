import React from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 300px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SearchInputBox = ({ setSearchInput }: { setSearchInput: (value: string) => void }) => (
    <Input
        type="text"
        placeholder="Search by title or description..."
        onChange={({ target }) => setSearchInput(target.value)}
    />
);


export default SearchInputBox;
