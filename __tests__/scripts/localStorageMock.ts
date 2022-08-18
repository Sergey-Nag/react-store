test.skip('localStorageMock', () => undefined)

const localStorageMock = (function() {
  let store: Record<string, any> = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: any) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    }
  };
}());

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

export {};