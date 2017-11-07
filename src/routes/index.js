const express = require('express');
const router = express.Router();
const request = require('request');

const { mailchimp } = require('../config/mailchimp');
const mailchimpUrl = 'https://us17.api.mailchimp.com/3.0';
const mailchimpEndpoint = `/lists/${mailchimp.listId}/members`;

router.route('/')
  .get((req, res, next) => {
    res.render('main/home', {
      message: req.flash('success')
    });
  })
  .post((req, res, next) => {
    const { email } = req.body;
    request({
      url: mailchimpUrl + mailchimpEndpoint,
      method: 'POST',
      headers: {
        'Authorization': `randomUser ${mailchimp.apiKey}`,
        'Content-Type': 'application/json'
      },
      json: {
        'email_address': email,
        'status': "subscribed"
      }
    }, function (err, response, body) {
      if (err) { console.log(err); }
      else {
        req.flash('success', 'You are subscribed');
        res.redirect('/');
      }
    });
  });

module.exports = router;
