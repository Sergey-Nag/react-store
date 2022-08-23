import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Header } from '../../../src/components/header/header';
import { GUEST_USER } from '../../../src/constants/guest-user';
import { USER_LOCAL_STATE_KEY } from '../../../src/constants/user';
import { AuthProvider } from '../../../src/hooks/use-auth';

describe('Header' , () => {
  const mockUser = {
    avatar: 'test',
    username: 'test@test.t',
    token: 'test'
  };
  
  const renderWithAuthProvider = () =>
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>
    );
  
  beforeEach(() => {
    localStorage.setItem(USER_LOCAL_STATE_KEY, JSON.stringify(mockUser));
  })

  afterEach(() => {
    localStorage.clear();
  });

  it('Should render component with username and dropdown if user exists', () => {
    const { asFragment } = renderWithAuthProvider();

    expect(asFragment()).toMatchSnapshot('with username');
  });

  it('Should render component with guest username and without dropdown if user doesn\'t exist', () => {
    localStorage.clear();

    const { asFragment } = renderWithAuthProvider();

    expect(asFragment()).toMatchSnapshot('with guest username');
  });

  it('Should logout current user clicking by logout button in the dropdown', async () => {
    renderWithAuthProvider();
    
    await waitFor(() => {expect(screen.getByText(mockUser.username)).toBeInTheDocument() });
    
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    const logoutItem = screen.getByRole('menuitem', { name: 'Logout'});
    
    fireEvent.click(logoutItem);
    
    await waitFor(() => {
      expect(screen.queryByText(mockUser.username)).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(GUEST_USER.username)).toBeInTheDocument();
    });
  });
});