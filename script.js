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
});
