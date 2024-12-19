import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";

const LogoutButton = () => {
  const { logout } = useAuth();
  return (
    <Button onClick={logout} size={"sm"}>
      Logout
    </Button>
  );
};
export default LogoutButton;
