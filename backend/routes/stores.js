const express = require('express');
const router = express.Router();
const storeController = require('../controllers/stores');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.get('/', storeController.getAllStores);
router.get('/:id', storeController.getStoreById);
router.post('/', verifyToken, isAdmin, storeController.createStore);
router.put('/:id', verifyToken, isAdmin, storeController.updateStore);
router.delete('/:id', verifyToken, isAdmin, storeController.deleteStore);

module.exports = router;
