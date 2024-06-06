function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getPokemon(type, poke) {
  $.ajax({
    url: `https://pokeapi.co/api/v2/pokemon/${poke}`,
    method: "GET",
    cache: true,
  })
    .then(function (data) {
      $(`#${type} > img`).attr("src", data.sprites.front_default);
      $(`#${type} > img`).attr("alt", data.name);
      $(`#${type} > h3`).text(capitalize(data.name));

      const types = data.types;
      $(`#${type} > span`).remove();
      types.forEach(function (t) {
        $(`#${type}`).append(`<span class="pill">${capitalize(t.type.name)}</span>`);
      });
    })
    .then(function () {
      $("#starter > .container > .row > *").stop().animate({ opacity: 1, scale: 1 }, 200);
    });
}

function getLocations() {
  $.ajax({
    url: "https://pokeapi.co/api/v2/location?offset=417&limit=30",
    method: "GET",
    cache: true,
    success: function (response) {
      const locations = response.results;
      const colors = ["#228B22", "#1E90FF", "#8B4513"];
      var colorIndex = 0;

      locations.forEach(function (loc) {
        const location = $(`<li>${loc.name}</li>`)
          .attr("class", "loc-item")
          .css({ "background-color": colors[colorIndex], "border-radius": "8px", color: "white" });
        location.appendTo("#locations");

        colorIndex = (colorIndex + 1) % colors.length;
      });

      $("<li>and many more</li>").attr("class", "loc-item").appendTo("#locations");
    },
  });
}

$(document).ready(function () {
  $("#hero > *").hide().fadeIn(1500);

  const grassPoke = ["treecko", "grovyle", "sceptile"];
  const firePoke = ["torchic", "combusken", "blaziken"];
  const waterPoke = ["mudkip", "marshtomp", "swampert"];
  const duration = 200;
  var pokeIndex = 0;

  getPokemon("grass", grassPoke[pokeIndex]);
  getPokemon("fire", firePoke[pokeIndex]);
  getPokemon("water", waterPoke[pokeIndex]);
  getLocations();

  $("#starter > *").hide().fadeIn(2000);

  $("#evolve").on("click", function () {
    if (pokeIndex === 1) {
      $(this).text("Back to not evolved");
    } else {
      $(this).text("Evolve");
    }

    pokeIndex = (pokeIndex + 1) % 3;

    $("#starter > .container > .row > *")
      .stop()
      .animate({ opacity: 0, scale: 0.95 }, duration, function () {
        getPokemon("grass", grassPoke[pokeIndex]);
        getPokemon("fire", firePoke[pokeIndex]);
        getPokemon("water", waterPoke[pokeIndex]);
      });
  });
});
