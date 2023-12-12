const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserData',
      required: false,
    },
    monthlyBudgets: [
      {
        month: {
          type: String,
        },
        year: {
          type: Number,
        },
        budgetData: [
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
const budgetData = mongoose.model("BudgetData", budgetSchema);
module.exports = budgetData;