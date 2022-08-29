import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginComponent } from "../../../src/components/login/login";
import { USER_LOCAL_STATE_KEY } from "../../../src/constants/user";
import { AuthProvider } from "../../../src/hooks/use-auth";
import { loginUser } from '../../../src/api/user';
import { NotificationsProvider } from "../../../src/hooks/use-notification";
import { NotificationsWrapper } from "../../../src/components/notifications-wrapper/notifications-wrapper";

jest.mock('../../../src/api/user', () => ({
  loginUser: jest.fn()
}));

describe('Login', () => {
  const mockUser = {
    avatar: 'test',
    username: 'test@test.t',
    token: 'test'
  };

  const renderWithAuthProviderAndRouter = () =>
    render(
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<LoginComponent />} />
            <Route path='/catalog' element={<div>Catalog</div>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    );

  const renderWithNotificationsAuthAndRouter = () => 
      render(
      <AuthProvider>
        <NotificationsProvider>
          <NotificationsWrapper />
            <BrowserRouter>
            <Routes>
              <Route index element={<LoginComponent />} />
              <Route path='/catalog' element={<div>Catalog</div>} />
            </Routes>
          </BrowserRouter>
        </NotificationsProvider>
      </AuthProvider>
      )

  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  it('Should render login component', () => {
    const { asFragment } = renderWithAuthProviderAndRouter();

    expect(asFragment()).toMatchSnapshot();
  });

  it('Should show error notification if request fails', async () => {
    (loginUser as jest.Mock).mockRejectedValue(new Error('Something went wrong'));

    renderWithNotificationsAuthAndRouter();

    fireEvent.change(
      screen.getByRole('textbox'), 
      { target : { value: 'test@test.tt' }}
    );
    
    const submitButton = screen.getByRole('button');

    await waitFor(() => expect(submitButton).toBeEnabled());

    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(submitButton).toBeEnabled();
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
    (loginUser as jest.Mock).mockResolvedValue(mockUser);

    renderWithAuthProviderAndRouter();

    fireEvent.change(
      screen.getByRole('textbox'), 
      { target : { value: 'test@test.tt' }}
    );
    
    const submitButton = screen.getByRole('button');
    await waitFor(() => expect(submitButton).toBeEnabled());

    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();

    await waitFor(async () => expect(await screen.findByText('Catalog')).toBeInTheDocument());
  });

  it('Should redirect to the catalog page immediately if the user exists in local storage', () => {
    localStorage.setItem(USER_LOCAL_STATE_KEY, JSON.stringify(mockUser));

    renderWithAuthProviderAndRouter();

    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });
});