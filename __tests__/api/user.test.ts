import axios from "axios";
import { loginUser } from "../../src/api/user";
import { BOOKS_API_BASE_URL } from "../../src/constants/books-api";
import { User } from "../../src/types/user";

jest.mock('axios', () => ({
  post: jest.fn()
}));

describe('LoginUser', () => {
  const mockUser: User = {
    username: 'test@test.t',
    avatar: 'test',
    token: 'test',
  };

  beforeEach(() => {
    (axios.post as jest.Mock).mockResolvedValue({ data: mockUser });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should make request to the signin endpoint api and receive a user data', async () => {
    const username = 'test';

    const user = await loginUser(username);

    expect(axios.post).toHaveBeenCalledWith(`${BOOKS_API_BASE_URL}/signin`, { username });
    expect(user).toEqual(mockUser);
  });
});