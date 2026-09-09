// ==========================================
// VIIKKOTEHTÄVÄ 3 - JAVASCRIPT
// ==========================================


// --- KOHTA A: Muuttujat ja console.log ---

const kurssi = "Johdatus sovelluskehitykseen";
let koulutuksenHinta = 79;

console.log("Kurssi:", kurssi);
console.log("Koulutuksen hinta:", koulutuksenHinta, "euroa");


// --- KOHTA B: Ehtolause if-else ---

if (koulutuksenHinta < 100) {
    console.log("Koulutuksen hinta on alle 100 euroa.");
} else {
    console.log("Koulutuksen hinta on 100 euroa tai enemmän.");
}


// --- KOHTA C: Funktio ja laskutoimitus ---

function laskeAlennettuHinta(hinta, alennusProsentti) {
    const alennus = hinta * (alennusProsentti / 100);
    const uusiHinta = hinta - alennus;

    return uusiHinta;
}

const alennettuHinta = laskeAlennettuHinta(koulutuksenHinta, 20);

console.log("Hinta 20 % alennuksen jälkeen:", alennettuHinta, "euroa");


// --- KOHTA D: Taulukko ja silmukka ---

const koulutukset = [
    "Digimarkkinointi",
    "Taloushallinto",
    "Tekoäly",
    "Yrittäjyys"
];

console.log("Koulutukset:");

koulutukset.forEach(function(koulutus) {
    console.log(koulutus);
});


// --- KOHTA E: Painikkeen toiminto ---

function naytaViesti() {
    alert("Tervetuloa tutustumaan verkkokoulutuksiin!");
}


// ==========================================
// VIIKKOTEHTÄVÄ 4 - API
// ==========================================

const haeNappi = document.getElementById("haeNappi");
const apiTulos = document.getElementById("apiTulos");

haeNappi.addEventListener("click", function() {

    apiTulos.innerText = "Haetaan tietoa...";

    const haut = [
        fetch("https://api.adviceslip.com/advice", { cache: "no-cache" }),
        fetch("https://api.adviceslip.com/advice", { cache: "no-cache" }),
        fetch("https://api.adviceslip.com/advice", { cache: "no-cache" })
    ];

    Promise.all(haut)

        .then(function(responses) {
            return Promise.all(
                responses.map(function(response) {
                    return response.json();
                })
            );
        })

        .then(function(data) {

            console.log("Rajapinnan vastaukset:", data);

            let lista = "<ol>";

            data.forEach(function(vastaus) {
                lista += "<li>" + vastaus.slip.advice + "</li>";
            });

            lista += "</ol>";

            apiTulos.innerHTML = lista;
        })

        .catch(function(error) {

            console.error("Virhe haussa:", error);

            apiTulos.innerText =
                "Tiedon hakeminen epäonnistui. Yritä uudelleen.";
        });
});