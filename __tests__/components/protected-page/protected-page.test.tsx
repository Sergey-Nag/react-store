import { render, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedPage } from "../../../src/components/protected-page/protected-page";
import { USER_LOCAL_STATE_KEY } from "../../../src/constants/user";
import { AuthProvider } from "../../../src/hooks/use-auth";

const renderWithAuthProviderAndRouter = () =>
  render(
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<ProtectedPage><div>Catalog</div></ProtectedPage>} />
          <Route path="/login" element={<div>Login</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );

describe('Protected page', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('Should render nested component if user exists', () => {
    localStorage.setItem(
      USER_LOCAL_STATE_KEY, 
      JSON.stringify({
        avatar: 'test',
        username: 'test@test.t',
        token: 'test'
      })
    );

    renderWithAuthProviderAndRouter();

    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });

  it('Should redirect to the login page if user doesn\'t exist', () => {
    renderWithAuthProviderAndRouter();

    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});