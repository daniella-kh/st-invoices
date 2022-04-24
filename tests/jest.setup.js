const mockKnex = require( 'mock-knex' );
const mysql = require( '../db/mysql-connections' ).sqlDb( 'test' );

jest.mock( 'redis', () => jest.requireActual( 'redis-mock' ) );

mockKnex.mock( mysql );
