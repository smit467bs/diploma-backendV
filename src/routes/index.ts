import express from 'express';
import testRouter from './test.route';

const router = express.Router();

router.use('/test', testRouter);

export default router;
