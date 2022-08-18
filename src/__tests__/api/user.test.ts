import * as requestApi from "../../api/reqest";
import { loginUser } from "../../api/user";
import { BOOKS_API_BASE_URL } from "../../constants/books-api";
import { User } from "../../types/user";

describe('LoginUser', () => {
  const USER: User = {
    username: 'test',
    avatar: 'test',
    token: 'test',
  };

  it('Should make request to the signin endpoint api and receive a user data', async () => {
    const requestSpy = jest.spyOn(requestApi, 'request').mockReturnValue(Promise.resolve(USER));

    const username = 'test';

    const user = await loginUser(username);

    expect(requestSpy).toBeCalledWith(`${BOOKS_API_BASE_URL}/signin`, 'POST', { username });
    expect(user).toEqual(USER);
  });
});