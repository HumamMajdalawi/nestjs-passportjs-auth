module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'nest',
  entities: [
    // process.env.NODE_ENV === 'test'
    //   ? 'src/**/*.entity.ts'
    // :
    'dist/**/*.entity.js',
  ],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'dist/migrations',
  },
  synchronize: false,
  migrationsTableName: 'migrations_typeorm',
  migrationsRun: false,
};
