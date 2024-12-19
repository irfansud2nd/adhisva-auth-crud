import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
const Navbar = () => {
  return (
    <nav className="w-full h-fit xl:container xl:mx-auto py-2 px-2 flex justify-between items-center">
      <Link to={"/"}>
        <h1 className="text-2xl font-bold">Adhivasindo</h1>
      </Link>

      <h3 className="font-medium text-xl">Blog Site</h3>
      <SearchBar />
    </nav>
  );
};
export default Navbar;
