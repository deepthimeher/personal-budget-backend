const express = require('express');
const router = express.Router();
const {getexpenseBudget,createorUpdateExpense,deleteExpense} = require('../controllers/expenseController.js');
router.route('/getuserexpense/:id').get(getexpenseBudget);
router.route('/createexpense').post(createorUpdateExpense);
router.route('/deleteexpense/:id').delete(deleteExpense);

module.exports = router;