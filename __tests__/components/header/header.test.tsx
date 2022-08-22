import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from '../../../src/components/header/header';
import { USER_LOCAL_STATE_KEY } from '../../../src/constants/user';
import { AuthProvider, useAuth } from '../../../src/hooks/use-auth';
import { User } from '../../../src/types/user';

const mockAuthState: {
  user: User | null,
  login: jest.Mock,
  logout: jest.Mock,
} = {
  user: null,
  login: jest.fn(() => Promise.resolve()),
  logout: jest.fn()
}

const renderWithAuthProvider = (authState = mockAuthState) =>
  render(
    <AuthProvider value={authState}>
      <Header />
    </AuthProvider>
  );

describe('Header' , () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('Should render component with username and dropdown if user exists', () => {
    localStorage.setItem(
      USER_LOCAL_STATE_KEY, 
      JSON.stringify({
        avatar: 'test',
        username: 'test@test.t',
        token: 'test'
      })
    );

    const { asFragment } = renderWithAuthProvider();

    expect(asFragment()).toMatchSnapshot('with username');
  });

  it('Should render component with guest username and without dropdown if user doesn\'t exist', () => {
    const { asFragment } = renderWithAuthProvider();

    expect(asFragment()).toMatchSnapshot('with guest username');
  });

  it('Should logout current user clicking by logout button in the dropdown', () => {
    localStorage.setItem(
      USER_LOCAL_STATE_KEY, 
      JSON.stringify({
        avatar: 'test',
        username: 'test@test.t',
        token: 'test'
      })
    );

    renderWithAuthProvider();
    console.log(mockAuthState);
    
    fireEvent.click(screen.getByRole('menu'));
    fireEvent.click(screen.getByRole('menuitem'), { name: 'Logout'});
    
    expect(mockAuthState.logout).toHaveBeenCalled();
    // expect(mockAuthState.user).toBeNull();
  });
});