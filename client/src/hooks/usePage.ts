import { useSearchParams } from "react-router-dom";

const usePage = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  return Number(page);
};

export default usePage;
