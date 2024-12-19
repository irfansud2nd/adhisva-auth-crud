import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import usePage from "@/hooks/usePage";
import { CircleChevronRight, CircleChevronLeft } from "lucide-react";

type Props = {
  disableNext: boolean;
};

const Pagination = ({ disableNext }: Props) => {
  const pathname = useLocation().pathname;
  const page = usePage();
  return (
    <div className="my-2 flex items-center justify-end gap-x-2">
      <Button asChild={page > 1} disabled={page <= 1} size={"icon"}>
        <Link to={pathname + `?page=${Number(page) - 1}`}>
          <CircleChevronLeft />
        </Link>
      </Button>
      <p className="font-medium">Page: {page}</p>
      <Button asChild={!disableNext} disabled={disableNext} size={"icon"}>
        <Link to={pathname + `?page=${Number(page) + 1}`}>
          <CircleChevronRight />
        </Link>
      </Button>
    </div>
  );
};
export default Pagination;
