import { request } from '../../api/reqest';
import { BOOKS_API_BASE_URL } from '../../constants/books-api';

const spyOnFetch = (responseData?: any) => {
  jest.spyOn(global, 'fetch').mockImplementation(
    jest.fn(() => 
      Promise.resolve({
        json: () => Promise.resolve(responseData)
      })
    ) as jest.Mock
  );
}

describe('Request', () => {
  it('Should make GET request without data to the url', async () => {
    spyOnFetch();

    await request(BOOKS_API_BASE_URL);

    expect(fetch).toBeCalledWith(BOOKS_API_BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: null,
    });
  });

  it('Should make POST request with body data to the url and recieve data', async () => {
    const responseDataMock = { hello: 'world' };
    spyOnFetch(responseDataMock);

    const requestDataMock = { data: 1 };
    const result = await request(BOOKS_API_BASE_URL, 'POST', requestDataMock);

    expect(fetch).toBeCalledWith(BOOKS_API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(requestDataMock),
    });

    expect(result).toEqual(responseDataMock);
  });
});