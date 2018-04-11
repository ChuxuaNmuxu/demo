import express from 'express';
// 我新增的api，用于连接到数据库
import * as api from './api.js';

var router = express.Router();

// 我新增的测试接口
router.get('/api/test', api.test)

router.post('/api/addtest', api.addtest)

export default router;