document.addEventListener("DOMContentLoaded", () => {

    let contenedor = document.getElementById("contenedor");

    fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
    .then((response) => response.json())
    .then((data) => {

        let numPoke = 0;
        let numID = 0;

        data.results.forEach(element => {
            let pokemon = element.name;
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then((response) => response.json())
            .then((data) => {

                let pokeDiv = document.createElement("div");
                let srcimage = data.sprites.front_default;
                numPoke += 1;
                numID += 1;

                if (data.sprites.front_default === null) {
                    srcimage = 'signo.png';
                }

                pokeDiv.innerHTML = `
                <div class="card">
                    <img class="card-img-top" src="${srcimage}">
                    <div class="card-body position-relative">
                        <h6 class="card-title text-center">${pokemon} <span class="text-muted"> #${numPoke}</span></h6>
                        <div class="row" id="${numID}">
                        </div>
                    </div>
                </div>`;

                contenedor.appendChild(pokeDiv);
                let divTipo = document.getElementById(`${numID}`);

                data.types.forEach(element => {
                    divTipo.innerHTML += `
                    <div class="col">
                        <p class="border rounded-1 text-center position-absolute bottom-0 ${element.type.name}">${element.type.name}</p>
                    </div>`;
                });

            })

        });

    })

})
