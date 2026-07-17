import pool from './src/db/dbConfig';
pool
  .query('SELECT 1')
  .then(() => {
    console.log('DB SUCCESS');
    process.exit(0);
  })
  .catch((e) => {
    console.error('DB ERROR', e);
    process.exit(1);
  });
