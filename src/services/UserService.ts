import UserModel from '../models/User';

export default class UserService {
  createUser (user: { nickname: string; }) {
    return UserModel.create({ nickname: user.nickname });
  }
}
