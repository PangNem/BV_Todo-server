import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';

class Todo extends Model {
  public readonly id!: number;
  public title!: string;
  public done!: boolean;
}

Todo.init(
  {
    title: {
      type: DataTypes.STRING(30)
    }
  },
  {
    sequelize,
    modelName: 'Todo',
    tableName: 'todo',
    charset: 'utf8',
    collate: 'utf8_general_ci'
  }
);

export default Todo;
