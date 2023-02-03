module.exports = ({ env }) => ({
  auth: {
    events: {
      onConnectionSuccess(e) {
        console.log(e.user, e.provider);
      },
      onConnectionError(e) {
        console.error(e.error, e.provider);
      },
    },
    options: {
      expiresIn: env('ADMIN_AUTH_EXPIRY', '7d'),
    },
    secret: env('ADMIN_JWT_SECRET', 'someSecretKey'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'someSecretKey'),
  },
  url: env('PUBLIC_ADMIN_URL', '/admin'),
  serveAdminPanel: env.bool('SERVE_ADMIN', true),
});
