const router = require('express').Router();
const testCtrl = require('../../controllers/demoCtrl');
const userCtrl = require('../../controllers/user');
// const auth = require('../../utils/auth');

const _method =  new testCtrl();
const _user  = new userCtrl();
router.get('/demo', _method.qw)
// router.post('/chat_save', _user.SaveChat )
module.exports = router;
