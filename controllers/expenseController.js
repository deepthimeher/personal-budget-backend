const express = require('express');
const expenseData = require('../model/expensemodel.js');

const getexpenseBudget = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Find the budget data for the specified user
      const expense = await expenseData.findOne({ user: userId });
  
      res.status(200).json({ data: expense });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
const createorUpdateExpense = async (req, res) => {
    try {
        const userexpense = await expenseData.findOne({user:req.body.user});
        if(!userexpense){
            const createUserExpense = await expenseData.create(req.body);
            return res.status(201).json({message:"Expense Created successfully",createUserExpense});
        }
        userexpenseexistingIndex = userexpense.monthlyExpenses.findIndex((items)=>
            items.month===req.body.monthlyExpenses[0].month && items.year===req.body.monthlyExpenses[0].year
        )
        if(userexpenseexistingIndex!=-1){
            userexpense.monthlyExpenses[userexpenseexistingIndex] = req.body.monthlyExpenses[0];
            const updateexpense = await userexpense.save();
            return res.status(202).json({message:'Expense data updated successfully',updateexpense});
        }
        else{
            userexpense.monthlyExpenses.push(req.body.monthlyExpenses[0]);
            const saveExpense = await userexpense.save();
            return res.status(202).json({message:'Expense data updated successfully',saveExpense});
        }
        } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  const deleteExpense = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Find and delete the user's budget data
      const deletedExpense = await expenseData.findOneAndDelete({ user: userId });
  
      if (!deletedExpense) {
        return res.status(404).json({ error: 'Expense data not found for the user' });
      }
  
      return res.status(200).json({ message: 'Expense data deleted successfully', data: deletedExpense });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
module.exports={getexpenseBudget,createorUpdateExpense,deleteExpense}