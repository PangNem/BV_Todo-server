import TodoModel from '../models/Todo';

export default class TodoService {
  createTodoItem (user: { title: string }) {
    return TodoModel.create({ title: user.title });
  }

  readTodoItems () {
    return TodoModel.findAll();
  }
}
