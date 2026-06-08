import { useEffect } from "react";

import Loading from "../../components/Alert/Loading";
import { useAuth } from "../../context/AuthContext";

function Logout() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return <Loading />;
}

export default Logout;
