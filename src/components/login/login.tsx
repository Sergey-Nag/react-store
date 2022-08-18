import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EMAIL_REGEXP } from "../../constants/email-regexp";
import { useAuth } from "../../hooks/use-auth";
import { useDebounce } from "../../hooks/use-debounce";

export function LoginComponent() {
  const { login, user } = useAuth();
  const [username, setUsername] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const debouncedUsername = useDebounce(username, 200);

  const handleUsernameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(target.value);
  };

  const handleLogin = async () => {
    if (!username) return;

    await login(username);
  };

  useEffect(() => {
    if (user) navigate('/catalog');
  }, [user]);

  useEffect(() => {
    setIsValid(EMAIL_REGEXP.test(debouncedUsername));
  }, [debouncedUsername]);

  return (
    <div>
      <input type="text" onChange={handleUsernameChange} />
      <button
        onClick={handleLogin}
        disabled={!isValid}
      >
        Submit
      </button>
    </div>
  );
}