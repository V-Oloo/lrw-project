/*
 * This allows you to proxy HTTP requests like `http.get('/api/stuff')` to another server/port.
 * This is especially useful during development to avoid CORS issues while using a local server.
 * For more details and options see: https://angular.io/guide/build#proxying-to-a-backend-server
 */
module.exports = {
  '/api': {
    target: 'http://localhost:3000',
    secure: false
  }
};
