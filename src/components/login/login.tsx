import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EMAIL_REGEXP } from "../../constants/email-regexp";
import { useAuth } from "../../hooks/use-auth";
import { useDebounce } from "../../hooks/use-debounce";
import { LoadingButton } from "../loading-button/loading-button";
import {Notification } from '../notification/notification';

export function LoginComponent() {
  const { login, user, authError } = useAuth();
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const debouncedUsername = useDebounce(username, 200);

  const handleUsernameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(target.value);
  };

  const handleLogin = async () => {
    if (!username) return;
    setIsLoading(true);

    await login(username);

    setIsLoading(false);
  };

  useEffect(() => {
    if (user) {
      navigate('/catalog');
    }
  }, [user]);

  useEffect(() => {
    setIsValid(EMAIL_REGEXP.test(debouncedUsername));
  }, [debouncedUsername]);

  return (
    <div className="container h-100">
      { authError && <Notification alertStyle="danger">{authError?.message}</Notification> }
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-4">
          <div className="card p-3">
            <div className="form-group">
              <input 
                type="text" 
                onChange={handleUsernameChange}
                className="form-control"
                placeholder="Email"
              />
              <div className="d-grid pt-3">
                <LoadingButton
                  onClick={handleLogin}
                  loading={isLoading}
                  disabled={!isValid || isLoading}
                >
                  Submit
                </LoadingButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}