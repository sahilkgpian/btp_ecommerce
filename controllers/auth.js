const crypto=require('crypto');
const bcrypt=require('bcryptjs');
const nodemailer=require('nodemailer');
const sendgridTransport=require('nodemailer-sendgrid-transport');

const User = require('../models/user');

const transporter=nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key: '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'
  }
}));

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  const email=req.body.email;
  const password=req.body.password;
  User.findOne({email:email})
    .then(user => {
      if(!user){
        return res.redirect('/login');
      }
      bcrypt.compare(password,user.password)
      .then(doMatch=>{
        if(doMatch){
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save(err => {
            console.log(err);
             res.redirect('/');
      });
        }
        res.redirect('/login');
      })
      .catch(err=>{
        console.log(err);
        res.redirect('/login');
      });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/login');
          return transporter.sendMail({
            to: email,
            from: 'no-reply@twilio.com',
            subject: 'Signup succeeded!',
            html: '<h1>You successfully signed up!</h1>'
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};

exports.getReset = (req, res, next) => {
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    isAuthenticated: false
  });
};

exports.postReset=(req,res,next)=>{
    crypto.randomBytes(32,(err,buffer)=>{
      if(err){
        console.log(err);
        return res.redirect('/reset');
      }
      const token=buffer.toString('hex');
      User.findOne({email:req.body.email})
      .then(user=>{
        if(!user){
          return res.redirect('/reset');
        }
        user.resetToken=token;
        user.resetTokenExpiration=Date.now()+3600000;
        return user.save();
      })
      .then(result=>{
        res.redirect('/');
        transporter.sendMail({
          to: req.body.email,
          from: 'sahildas097@gmail.com',
          subject: 'Password Reset',
          html: `
             <p> You requested a password reset</p>
             <p> Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password</p>
          `
        });
      })
      .catch(err=>{
        console.log(err);
      });
    });
};

exports.getNewPassword=(req,res,next)=>{
  const token=req.params.token;
  User.findOne({resetToken:token,resetTokenExpiration:{$gt:Date.now()}})
    .then(user=>{
      res.render('auth/new-password',{
        path:'/new-password',
        pageTitle:'New Password',
        isAuthenticated: false,
        userId:user._id.toString()
      })
    })
    .catch(err=>{
      console.log(err);
    });
};