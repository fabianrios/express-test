const express = require('express');
const router = express.Router();
const validate = require('./validation');

const knex = require('../db/knex');
const userQueries = require('../db/queries.users');

router.get('/', (req, res, next) => {
  userQueries.getAllUsers((err, users) => {
    if (err) {
      res.status(500).json({
        status: 'error',
        data: err
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: users
      });
    }
  });
});

router.get('/:id',validate.validateUserResources, (req, res, next) => {
  const userID = parseInt(req.params.id);
  knex('users')
  .select('*')
  .where({
    id: userID
  })
  .then((users) => {
    res.status(200).json({
      status: 'success',
      data: users
    });
  })
  .catch((err) => {
    res.status(500).json({
      status: 'error',
      data: err
    });
  });
});

router.post('/',validate.validateUserResources, (req, res, next) => {
  const newUsername = req.body.username;
  const newEmail = req.body.email;
  const newPassword = req.body.password;
  const newImage = req.body.image;
  const newName = req.body.name;
  const newAdmin = req.body.admin;
  knex('users')
  .insert({
    username: newUsername,
    email: newEmail,
    password: newPassword,
    image: newImage,
    name: newName,
    admin: newAdmin
  })
  .returning('*')
  .then((user) => {
    res.status(201).json({
      status: 'success',
      data: user
    });
  })
  .catch((err) => {
    res.status(500).json({
      status: 'error',
      data: err
    });
  });
});

router.put('/:id',validate.validateUserResources, (req, res, next) => {
  const userID = parseInt(req.params.id);
  const updatedUsername = req.body.username;
  const updatedEmail = req.body.email;
  knex('users')
  .update({
    username: updatedUsername,
    email: updatedEmail
  })
  .where({
    id: userID
  })
  .returning('*')
  .then((user) => {
    res.status(200).json({
      status: 'success',
      data: user
    });
  })
  .catch((err) => {
    res.status(500).json({
      status: 'error',
      data: err
    });
  });
});

router.delete('/:id',validate.validateUserResources, (req, res, next) => {
  const userID = parseInt(req.params.id);
  knex('users')
  .del()
  .where({
    id: userID
  })
  .returning('*')
  .then((user) => {
    res.status(200).json({
      status: 'success',
      data: user
    });
  })
  .catch((err) => {
    res.status(500).json({
      status: 'error',
      data: err
    });
  });
});

module.exports = router;
