import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { useState } from "react";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate(`/search/${value}`, { replace: true });
      }}
    >
      <Input
        type="text"
        placeholder="Search blog by title"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
};
export default SearchBar;
