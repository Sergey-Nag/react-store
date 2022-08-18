import axios from 'axios';
import { request } from '../../api/reqest';
import { BOOKS_API_BASE_URL } from '../../constants/books-api';


jest.mock('axios');

(axios as unknown as jest.Mock).mockReturnValue({});

describe('Request', () => {

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should make GET request without data to the url', async () => {
    await request(BOOKS_API_BASE_URL);

    expect(axios).toBeCalledWith({
      url: BOOKS_API_BASE_URL,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      data: undefined
    });
  });

  it('Should make POST request with body data to the url and recieve data', async () => {
    const responseDataMock = { hello: 'world' };
    (axios as unknown as jest.Mock).mockResolvedValue({data: responseDataMock});

    const requestDataMock = { data: 1 };
    const result = await request(BOOKS_API_BASE_URL, 'POST', requestDataMock);

    expect(axios).toHaveBeenCalledWith({
      url: BOOKS_API_BASE_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      data: requestDataMock,
    });

    expect(result).toEqual(responseDataMock);
  });
});