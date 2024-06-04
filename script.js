function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getPokemon(poke) {
  // $.get(`https://pokeapi.co/api/v2/pokemon/${poke}`, function (data, status) {
  //   if (status === "success") {
  //     console.log(data);
  //     $(`#${poke} > img`).attr("src", data.sprites.front_default).hide().fadeIn(2000);
  //     $(`#${poke} > h3`).append(capitalize(data.name));
  //   } else {
  //     $(`#${poke}`).append("Cannot get data");
  //   }
  // });

  // ENABLE CACHING
  $.ajax({
    url: `https://pokeapi.co/api/v2/pokemon/${poke}`,
    method: "GET",
    cache: true,
    success: function (data) {
      // console.log(data);
      $(`#${poke} > img`).attr("src", data.sprites.front_default);
      $(`#${poke} > img`).attr("alt", data.name);
      $(`#${poke} > h3`).append(capitalize(data.name));
    },
  });
}

$(document).ready(function () {
  $("#hero > *").hide().fadeIn(1000);

  getPokemon("treecko");
  getPokemon("torchic");
  getPokemon("mudkip");
});
