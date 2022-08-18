import { USER_LOCAL_STATE_KEY } from "../../constants/user"
import { User } from "../../types/user"
import { clearLocalStorageUser, getLocalStorageUser, setLocalStorageUser } from "../../utils/user"


describe('LocalStorage user state', () => {
  const USER: User = {
    username: 'test',
    avatar: 'test',
    token: 'test',
  };

  const stringifyUserObject = JSON.stringify(USER);

  describe('setLocalStoragetUser():', () => {
    it('Should set user data to the local storage', () => {
      jest
        .spyOn(Object.getPrototypeOf(global.localStorage), 'setItem')
        .mockImplementation(jest.fn());

      setLocalStorageUser(USER);
      
      expect(localStorage.setItem).toBeCalledWith(USER_LOCAL_STATE_KEY, stringifyUserObject);
    });
  })

  describe('getLocalStoragetUser():', () => {
    it('Should return the user data from the local storage as object', () => {
      jest
        .spyOn(Object.getPrototypeOf(global.localStorage), 'getItem')
        .mockReturnValue(stringifyUserObject);
      
      const user = getLocalStorageUser();
      
      expect(localStorage.getItem).toBeCalled();
      expect(user).toEqual(USER);
    });
    
    it('Should return null if user does not exist in the local storage', () => {
      jest
        .spyOn(Object.getPrototypeOf(global.localStorage), 'getItem')
        .mockReturnValue(null);
      
      const user = getLocalStorageUser();

      expect(localStorage.getItem).toBeCalled();
      expect(user).toBeNull();
    })
  });

  describe('clearLocalStorageUser():', () => {
    it('Should clear user data from the local storage', () => {
      jest
        .spyOn(Object.getPrototypeOf(global.localStorage), 'removeItem')
        .mockImplementation(jest.fn());

      clearLocalStorageUser();

      expect(localStorage.removeItem).toBeCalledWith(USER_LOCAL_STATE_KEY);
    });
  });
});