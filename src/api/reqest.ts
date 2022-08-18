export const request = async <T>(url: string, method = 'GET', data?: any): Promise<T> => 
  await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: data ? JSON.stringify(data) : null,
  })
  .then<T>(data => data.json());