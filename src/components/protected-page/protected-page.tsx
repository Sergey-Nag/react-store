import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../hooks/use-auth";

export function ProtectedPage({ children }: PropsWithChildren) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate(ROUTES.LOGIN);
  }, [user]);

  return user && <>{children}</>;
}

