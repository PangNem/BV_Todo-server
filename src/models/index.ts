import User, { associate as associateUser } from './user';
export * from './sequelize'; // import와 export를 동시에함
const db = {
  User
};

export type dbType = typeof db;

associateUser(db);
