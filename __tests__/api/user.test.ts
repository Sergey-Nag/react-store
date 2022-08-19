import { request } from "../../src/api/reqest";
import { loginUser } from "../../src/api/user";
import { BOOKS_API_BASE_URL } from "../../src/constants/books-api";
import { User } from "../../src/types/user";

jest.mock('../../src/api/reqest', () => ({
  request: jest.fn()
}));

describe('LoginUser', () => {
  const mockUser: User = {
    username: 'test',
    avatar: 'test',
    token: 'test',
  };

  beforeEach(() => {
    (request as jest.Mock).mockResolvedValue(mockUser);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should make request to the signin endpoint api and receive a user data', async () => {
    const username = 'test';

    const user = await loginUser(username);

    expect(request).toHaveBeenCalledWith(`${BOOKS_API_BASE_URL}/signin`, 'POST', { username });
    expect(user).toEqual(mockUser);
  });
});