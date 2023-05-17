exports.seed = function (knex) {
  return knex("plants")
    .truncate()
    .then(function () {
      return knex("plants").insert([
        { name: "basil", family: "Lamiaceae", purchased: true },
        { name: "Meyer lemon tree", family: "Rutaceae", purchased: false },
        { name: "avocado tree", family: "Lauraceae", purchased: 0 },
      ]);
    });
};
