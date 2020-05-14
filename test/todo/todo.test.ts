import * as request from 'supertest';
import app from '../../src/app';
import sequelize from '../../src/models/sequelize';
import Todo from '../../src/models/Todo';

describe('user test', () => {
  let testTodoItemId: number;

  const testData = { title: '할일1' };

  beforeAll(async (done) => {
    await sequelize.sync();
    const testTodoItem = await Todo.create({ testData });

    testTodoItemId = testTodoItem.id;
    done();
  });

  afterAll(async (done) => {
    await Todo.destroy({ where: { id: testTodoItemId } });
    done();
  });

  describe('POST /todo', () => {
    const url = '/todo';

    describe('유저 생성 성공시', () => {
      test('유저 닉네임 반환', async () => {
        const response = await request(app).post(url).send(testData);

        expect(response.status).toBe(201);
        expect(response.body.data.title).toBe('할일1');
      });
    });
    describe('유저 생성 실패시', () => {
      test('형식에 맞지 않는 데이터 요청시 422 반환', async () => {
        const response = await request(app).post(url).send({ qwer: 'asdf' });

        expect(response.status).toBe(422);
      });
    });
  });

  describe('GET /todo', () => {
    const url = '/todo';

    describe('할일 목록 불러오기 성공 시', () => {
      test('목록 반환', async () => {
        const response = await request(app).get(url);

        expect(response.status).toBe(200);
      });
    });
  });
});
