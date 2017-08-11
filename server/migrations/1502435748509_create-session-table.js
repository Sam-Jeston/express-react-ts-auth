const { Client } = require('pg')
const { dbCreds } = require('../dist/config/db')
const client = new Client(dbCreds())

exports.up = async () => {
  await client.connect()
  await client.query(`
    CREATE TABLE sessions (
      id UUID PRIMARY KEY,
      expiry timestamp with time zone NOT NULL,
      "userId" integer NOT NULL,
      deactivated BOOLEAN NOT NULL DEFAULT false,
      "createdAt" timestamp with time zone NOT NULL
    );

    ALTER TABLE sessions OWNER TO postgres;
    ALTER TABLE ONLY sessions ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES users(id);
  `)

  await client.end()
};

exports.down = async () => {
  await client.connect()
  await client.query(`
    DROP TABLE sessions;
  `)

  await client.end()
};
