function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

$(document).ready(function () {
  $("#hero > *").hide().fadeIn(1000);

  $.get("https://pokeapi.co/api/v2/pokemon/treecko", function (data, status) {
    if (status === "success") {
      console.log(data);
      $("#treecko > div > img").attr("src", data.sprites.front_default).hide().fadeIn(2000);
      $("#treecko > div > h2").append(capitalize(data.name));
    } else {
      $("#treecko").append("Cannot get data");
    }
  });
});
