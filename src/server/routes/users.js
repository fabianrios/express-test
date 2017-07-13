const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

router.get('/', (req, res, next) => {
  knex('users').select('*')
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

router.get('/:id', (req, res, next) => {
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

router.post('/', (req, res, next) => {
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

module.exports = router;
