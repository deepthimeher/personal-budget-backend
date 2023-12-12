const express = require('express');
const router = express.Router();
const {getUserBudget,createorUpdateBudget,deleteBudget} = require('../controllers/budgetController.js');
router.route('/getuserbudget/:id').get(getUserBudget);
router.route('/createbudget').post(createorUpdateBudget);
router.route('/deleteBudget/:id').delete(deleteBudget);

module.exports = router;