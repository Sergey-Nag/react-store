import { USER_LOCAL_STATE_KEY } from "../../src/constants/user"
import { User } from "../../src/types/user"
import { clearLocalStorageUser, getLocalStorageUser, setLocalStorageUser } from "../../src/utils/user"

describe('LocalStorage user state', () => {
  const mockUser: User = {
    username: 'test',
    avatar: 'test',
    token: 'test',
  };

  const stringifyMockUserObject = JSON.stringify(mockUser);

  describe('setLocalStoragetUser():', () => {
    it('Should set user data to the local storage', () => {
      localStorage.setItem = jest.fn();
      setLocalStorageUser(mockUser);
      
      expect(localStorage.setItem).toBeCalledWith(USER_LOCAL_STATE_KEY, stringifyMockUserObject);
    });
  })

  describe('getLocalStoragetUser():', () => {
    it('Should return the user data from the local storage as object', () => {   
      localStorage.getItem = jest.fn(() => stringifyMockUserObject);
      const user = getLocalStorageUser();
      
      expect(localStorage.getItem).toBeCalled();
      expect(user).toEqual(mockUser);
    });
    
    it('Should return null if user does not exist in the local storage', () => {
      localStorage.getItem = jest.fn(() => null);
      const user = getLocalStorageUser();

      expect(localStorage.getItem).toBeCalled();
      expect(user).toBeNull();
    })
  });

  describe('clearLocalStorageUser():', () => {
    it('Should clear user data from the local storage', () => {
      localStorage.removeItem = jest.fn();
      clearLocalStorageUser();

      expect(localStorage.removeItem).toHaveBeenCalledWith(USER_LOCAL_STATE_KEY);
    });
  });
});