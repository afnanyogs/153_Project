const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.use(verifyToken);
router.use(isAdmin);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
