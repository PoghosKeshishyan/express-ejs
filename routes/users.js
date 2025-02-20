const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { home_page, edit_user_page, add_user_page, add_user, edit_user, remove_user } = require('../controllers/users');

router.get('/', home_page);
router.get('/add/user', add_user_page);
router.get('/edit/user/:id', edit_user_page);
router.post('/add/user', upload.single('image'), add_user);
router.post('/edit/user/:id', upload.single('image'), edit_user);
router.delete('/remove/user/:id', remove_user);

module.exports = router;