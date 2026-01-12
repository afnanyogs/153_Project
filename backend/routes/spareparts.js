const express = require('express');
const router = express.Router();
const sparepartController = require('../controllers/spareparts');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.get('/', sparepartController.getAllSpareparts);
router.get('/:id', sparepartController.getSparepartById);
router.post('/', verifyToken, isAdmin, sparepartController.createSparepart);
router.put('/:id', verifyToken, isAdmin, sparepartController.updateSparepart);
router.delete('/:id', verifyToken, isAdmin, sparepartController.deleteSparepart);

module.exports = router;
