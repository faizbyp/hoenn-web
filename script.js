function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getPokemon(poke) {
  // ENABLE CACHING
  $.ajax({
    url: `https://pokeapi.co/api/v2/pokemon/${poke}`,
    method: "GET",
    cache: true,
    success: function (data) {
      $(`#${poke} > img`).attr("src", data.sprites.front_default);
      $(`#${poke} > img`).attr("alt", data.name);
      $(`#${poke} > h3`).append(capitalize(data.name));

      const types = data.types;
      console.log(types);
      types.forEach(function (t) {
        $(`#${poke}`).append(`<span class="pill">${capitalize(t.type.name)}</span>`);
      });
    },
  });
}

$(document).ready(function () {
  $("#hero > *").hide().fadeIn(1000);

  getPokemon("treecko");
  getPokemon("torchic");
  getPokemon("mudkip");

  $.ajax({
    url: "https://pokeapi.co/api/v2/location?offset=417&limit=30",
    method: "GET",
    cache: true,
    success: function (response) {
      console.log(response);
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
});
