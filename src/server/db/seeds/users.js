
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({username: 'fabianrios', email: 'fabian.rios@trivago.com', password: '123456789', admin: false, image: 'http://placehold.it/300', name: 'Fabián Ríos'}),
        knex('users').insert({username: 'jury', email: 'jury.albach@trivago.com', password: '123456789', admin: false, image: 'http://placehold.it/300', name: 'Juri Albach'})
      ]);
    });
};
