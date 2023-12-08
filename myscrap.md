import express from 'express';
import { UserModel } from './models/models';

const api = express();
const router = express.Router();

const STATUS = {
  OK: 200,
  CREATED: 201,
  UPDATED: 203,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  DEFAULT_ERROR: 418,
  INTERNAL_SERVER_ERROR: 500,
};

router.get('/', async (req, res) => {
  console.log("Sua api esta rodando");
  return res.json("API rodando");
});

router.get('/users', async (req, res) => {
  const { page, limit } = req.query;

  const [users, total] = await Promise.all([
    UserModel.find().lean(),
    UserModel.count(),
  ]);

  return res.json({
    rows: users,
    page,
    limit,
    total,
  });
});

router.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  const user = await UserModel.findOne({ _id: id }).lean();

  if (!user) {
    // status e mensagem corretos
    res.status(STATUS.NOT_FOUND).json({ message: 'User not found' });
  }

  return res.status(STATUS.OK).json({ user });
});

router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { update } = req.body;

  // o metodo lean não traz junto o .save()
  const user = await UserModel.findOne({ _id: id });

  if (!user) {
    // status e mensagem corretos
    res.status(STATUS.NOT_FOUND).json({ message: 'User not found' });
  }

  user.name = update.name;

  await user.save();

  return res.sendStatus(STATUS.UPDATED);
});

api.use(router);

export default api;