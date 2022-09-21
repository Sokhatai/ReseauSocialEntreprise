const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');



router.post('/', auth, multer, postCtrl.createPost);

router.get('/', auth, postCtrl.getAllPost);

router.get('/:id', auth, postCtrl.getOnePost);

router.put('/:id', auth, multer, postCtrl.modifyPost);

router.delete('/:id', auth, postCtrl.deletePost);

router.post('/:id/like', auth, postCtrl.likeStatus);

module.exports = router;