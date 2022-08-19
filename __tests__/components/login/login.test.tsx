import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginComponent } from "../../../src/components/login/login";
import { AuthProvider } from "../../../src/hooks/use-auth";

const mockAuthState = {
  user: null,
  login: jest.fn(() => Promise.resolve()),
  logout: jest.fn()
}

const renderWithAuthProviderAndRouter = () =>
  render(
    <AuthProvider value={mockAuthState}>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginComponent />} />
          <Route path='/catalog' element={<div>Catalog</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );

describe('Login', () => {
  it('Should render login component', () => {
    const { asFragment } = renderWithAuthProviderAndRouter();

    expect(asFragment()).toMatchSnapshot();
  });

  describe('The Submit button shold be desabled with values', () => {
    it.each(['', '123', 'asd@', 'asd@asd.'])('"%s"', (value) => {
      renderWithAuthProviderAndRouter();

      const usernameInput = screen.getByRole('textbox');

      fireEvent.change(usernameInput, { target : { value }});

      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  it('The Submit button should be enabled with correct email', async () => {
    renderWithAuthProviderAndRouter();

    const usernameInput = screen.getByRole('textbox');

    fireEvent.change(usernameInput, { target : { value: 'test@test.tt' }});
    
    await waitFor(() => expect(screen.getByRole('button')).toBeEnabled());
  });

  it(`After the submit button is pressed, it must be in the loading state during the api request.
  After success request should redirect to the catalog page`, async () => {
    renderWithAuthProviderAndRouter();
    fireEvent.change(
      screen.getByRole('textbox'), 
      { target : { value: 'test@test.tt' }}
    );
    
    const submitButton = screen.getByRole('button');
    await waitFor(() => expect(submitButton).toBeEnabled());

    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(submitButton.textContent).toBe('Loading');
    expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument();

    await waitFor(async () => expect(await screen.findByText('Catalog')).toBeInTheDocument());
  });

  it('Should redirect to the catalog page immediately if the user exists in local storage', () => {
    localStorage.getItem = jest.fn(() => JSON.stringify({ username: 'test', token: 'test' }));

    renderWithAuthProviderAndRouter();

    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });
});