import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';

class Todo extends Model {
  public readonly id!: number;
  public title!: string;
  public done!: boolean;
}

Todo.init(
  {
    nickname: {
      type: DataTypes.STRING(20)
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
