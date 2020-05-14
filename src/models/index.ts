import Todo from './user';
export * from './sequelize'; // import와 export를 동시에함
const db = {
  Todo
};

export type dbType = typeof db;
