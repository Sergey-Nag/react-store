import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EMAIL_REGEXP } from "../../constants/email-regexp";
import { useAuth } from "../../hooks/use-auth";
import { useDebounce } from "../../hooks/use-debounce";

export function LoginComponent() {
  const { login, user } = useAuth();
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
    if (user) navigate('/catalog');
  }, [user]);

  useEffect(() => {
    setIsValid(EMAIL_REGEXP.test(debouncedUsername));
  }, [debouncedUsername]);

  return (
    <div className="container h-100">
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
                <button
                  onClick={handleLogin}
                  disabled={!isValid || isLoading}
                  className="btn btn-primary"
                >
                  { isLoading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> }
                  { isLoading ? 'Loading' : 'Submit' }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}