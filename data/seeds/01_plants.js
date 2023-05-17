exports.seed = function (knex) {
  return knex("plants")
    .truncate()
    .then(function () {
      return knex("plants").insert([
        { name: "basil", family: "Lamiaceae", purchased: 1 },
        { name: "Meyer lemon tree", family: "Rutaceae", purchased: 0 },
        { name: "avocado tree", family: "Lauraceae", purchased: 0 },
      ]);
    });
};
