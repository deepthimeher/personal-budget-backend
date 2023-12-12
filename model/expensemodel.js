const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserData',
      required: false,
    },
    monthlyExpenses: [
      {
        month: {
          type: String,
        },
        year: {
          type: Number,
        },
        expenseData: [
          {
            category: {
              type: String,
            },
            amount: {
              type: String,
            },
          },
        ],
      },
    ],
  });
const expenseData = mongoose.model("ExpenseData", expenseSchema);
module.exports = expenseData;