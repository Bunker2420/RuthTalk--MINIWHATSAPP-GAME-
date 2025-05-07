const express = require('express');
const AppError = require('../Middleware/Error');
const router = express.Router();
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    req.flash("error", "Please login first.");
    res.redirect("/login");
  }
  
router.get('/',isLoggedIn,async(req,res)=>{
    try
    {
        res.render('Games/game.ejs');
    }
    catch(err)
    {
        console.log(err);
        throw new AppError(404,err.message)
    }
});

router.get('/rock-paper-scissors',isLoggedIn,async(req,res)=>{
   try
    {
        res.render('Games/rockpaperscissor.ejs');
    }
    catch(err)
    {
        console.log(err);
        throw new AppError(404,err.message)
    }
});

router.get('/number-guess',isLoggedIn,async(req,res)=>{  
    try
    {
        res.render('Games/number.ejs');
    }
    catch(err)
    {
        console.log(err);
        throw new AppError(404,err.message)
    }
});

router.get('/dino-run',isLoggedIn,async(req,res)=>{
  
    try
    {
        res.render('Games/dino.ejs');
    }
    catch(err)
    {
        console.log(err);
        throw new AppError(404,err.message)
    }
});

router.get('/tic-tac-toe',isLoggedIn,async(req,res)=>{
    try
    {
        res.render('Games/TicTacToe.ejs');
    }
    catch(err)
    {
        console.log(err);
        throw new AppError(404,err.message)
    }
});

module.exports = router;