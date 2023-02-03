module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', ''),
      user: env('DATABASE_USERNAME', ''),
      password: env('DATABASE_PASSWORD', ''),
      schema: env('DATABASE_SCHEMA', 'public'), // Not required
      ssl: env('DATABASE_SSL', false),
    },
    options: {
      autoMigration: true, // this option is required in dbs other than sqlite so that tables can be created autuomatically
    },
    useNullAsDefault: true,
  },
});
