const pg = require('pg')
pg.defaults.ssl = true;
const Sequelize = require('sequelize')
const pkg = require('../../package.json')
const dbName = process.env.NODE_ENV === 'test' ? `${pkg.name}-test` : pkg.name
const dbUrl = process.env.DATABASE_URL || `postgres://admin:guest@localhost:5432/${dbName}?ssl=true`
const client = new Sequelize(dbUrl, { logging: false, operatorsAliases: false })

module.exports = client

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => client.close())
}
