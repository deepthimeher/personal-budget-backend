const express = require('express');
const budgetData = require('../model/budgetmodel.js');

const getUserBudget = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Find the budget data for the specified user
      const budget = await budgetData.findOne({ user: userId });
  
      res.status(200).json({ data: budget });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
const createorUpdateBudget = async (req, res) => {
    try {
        const userbudget = await budgetData.findOne({user:req.body.user});
        if(!userbudget){
            const createUserBudget = await budgetData.create(req.body);
            return res.status(201).json({message:"Budget Created successfully",createUserBudget});
        }
        userbudgetexistingIndex = userbudget.monthlyBudgets.findIndex((items)=>
            items.month===req.body.monthlyBudgets[0].month && items.year===req.body.monthlyBudgets[0].year
        )
        if(userbudgetexistingIndex!=-1){
            userbudget.monthlyBudgets[userbudgetexistingIndex] = req.body.monthlyBudgets[0];
            const updatebudget = await userbudget.save();
            return res.status(202).json({message:'Budget data updated successfully',updatebudget});
        }
        else{
            userbudget.monthlyBudgets.push(req.body.monthlyBudgets[0]);
            const savebudget = await userbudget.save();
            return res.status(202).json({message:'Budget data updated successfully',savebudget});
        }
        } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  const deleteBudget = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Find and delete the user's budget data
      const deletedBudget = await budgetData.findOneAndDelete({ user: userId });
  
      if (!deletedBudget) {
        return res.status(404).json({ error: 'Budget data not found for the user' });
      }
  
      return res.status(200).json({ message: 'Budget data deleted successfully', data: deletedBudget });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
module.exports={getUserBudget,createorUpdateBudget,deleteBudget}