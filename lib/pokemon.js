// TODO write your code here
const apiUrl = "https://pokeapi.co/api/v2/pokemon/"

const template = document.getElementById("cardTemplate");
console.log(template)
const infoTemplate = document.getElementById("infoTemplate");
const cardContainer = document.getElementById("cardsContainer");
const infoContainer = document.getElementById("infoContainer");

await fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.results);
    data.results.forEach((pokemon, index) => {
      console.log(pokemon);
      const name = pokemon.name;
      const clone = template.content.cloneNode(true);
      clone.querySelector("h2").innerText = name;
      clone.querySelector("a").href = pokemon.url;
      clone.querySelector("a").innerText = "Get Info";
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`;
      clone.querySelector("img").src = imageUrl;
      console.log(clone);
      cardContainer.appendChild(clone)
    })
  })

document.querySelectorAll("#cardsContainer .pokemon-card").forEach((card) => {
  card.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("TODO: Fetch data from the API");
    fetch(event.currentTarget.querySelector("a").href)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const infoClone = infoTemplate.content.cloneNode(true);
        infoClone.querySelector("h2").innerText = data.name;
        infoClone.querySelector("img").src = data.sprites.back_shiny;
        let abilityString = "";
        data.abilities.forEach((ability) => {
          console.log(ability.ability.name)
          abilityString += ability.ability.name + "<br>";
        })
        infoClone.querySelector(".pokemon-card-subtitle").innerHTML = abilityString;
        infoContainer.innerHTML = "";
        infoContainer.appendChild(infoClone);
      })

  })
})
