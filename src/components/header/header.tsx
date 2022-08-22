import { useMemo } from "react";
import { GUEST_USER } from "../../constants/guest-user";
import { useAuth } from "../../hooks/use-auth";
import { DropdownButton } from "../dropdown-button/dropdown-button";
import './header.scss';

export function Header() {
  const { user, logout } = useAuth();
  const { username } = useMemo(() => user ?? GUEST_USER , [user]);

  const getUsernamePlaceholder = (username: string) => username.slice(0, 2);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container justify-content-end">
      <div className="d-flex align-items-baseline">
        <div className="avatar me-2">
          { getUsernamePlaceholder(username) }
        </div>
        <span className="fw-bold">{ username }</span>
        { user && 
          <DropdownButton className="ms-2">
            <button
              className="btn"
              onClick={logout}
            >
              Logout
            </button>
          </DropdownButton>
        }
      </div>
      </div>
    </nav>
  );
}