const serverPort = process.env.SERVER_PORT || 3000;

const dbServiceName = process.env.DB_SERVICE_NAME || 'db';
const dbPort = process.env.DB_PORT || 5432;
const dbUsername = process.env.DB_USERNAME || 'magister';
const dbPassword = process.env.DB_PASSWORD || 'topsecret';
const dbName = process.env.DB_NAME || 'academy';

const pgAdminLogin = process.env.PG_ADMIN_LOGIN || 'admin@admin.com';
const pgAdminPassword = process.env.PG_ADMIN_PASSWORD || 'pgadmin4';

export {
  serverPort,
  dbServiceName,
  dbPort,
  dbUsername,
  dbPassword,
  dbName,
  pgAdminLogin,
  pgAdminPassword,
};
