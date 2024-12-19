import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MainSidebar from "../sidebar/MainSidebar";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full h-fit xl:container xl:mx-auto py-2 px-2 flex items-center">
      <Sheet>
        <SheetTrigger className="md:hidden mr-1" asChild>
          <Button size={"icon"} variant={"secondary"}>
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className="p-0 bg-slate-200" side={"left"}>
          <MainSidebar mobile />
        </SheetContent>
      </Sheet>

      <div className="flex items-center justify-between w-full">
        <Link to={"/"}>
          <h1 className="text-2xl font-bold">Adhivasindo</h1>
          <span className="text-sm md:hidden">Blog Site</span>
        </Link>

        <h3 className="font-medium text-xl max-md:hidden">Blog Site</h3>
        <SearchBar />
      </div>
    </nav>
  );
};
export default Navbar;
