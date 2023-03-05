const apiUrl = "https://restcountries.com/v3.1/all";

const countriesContainer = document.getElementById("countries");
const searchBox = document.getElementById("search-box");
const searchBtn = document.getElementById("search-btn");

async function getCountries() {
    try {
        const response = await fetch(apiUrl);
        const countries = await response.json();
        return countries;
    } catch (error) {
        console.log(error);
    }
}

function displayCountries(countries) {
    countriesContainer.innerHTML = "";

    countries.forEach((country) => {
        const countryDiv = document.createElement("div");
        countryDiv.classList.add("country", "col-4");

        const countryFlag = document.createElement("img");
        countryFlag.src = country.flags.svg;
        countryFlag.alt = `Flag of ${country.name.common}`;

        const countryName = document.createElement("h2");
        countryName.textContent = country.name.common;

        const countryDetails = document.createElement("div");
        countryDetails.classList.add("details");

        const countryCapital = document.createElement("p");
        countryCapital.innerHTML = `<strong>Capital:</strong> ${country.capital?.[0] || "N/A"}`;

        const countryCurrency = document.createElement("p");
        countryCurrency.innerHTML = `<strong>Currency:</strong> ${Object.values(country.currencies)?.[0]?.name}`;

        const countryContinent = document.createElement("p");
        countryContinent.innerHTML = `<strong>Continent:</strong> ${country.region || "N/A"}`;

        const countryDetailsList = document.createElement("ul");
        const countryLanguages = document.createElement("li");
        countryLanguages.innerHTML = `<strong>Languages:</strong> ${Object.values(country.languages).join(", ")}`;

        countryDetailsList.appendChild(countryLanguages);
        countryDetails.appendChild(countryCapital);
        countryDetails.appendChild(countryCurrency);
        countryDetails.appendChild(countryContinent);
        countryDetails.appendChild(countryDetailsList);
        countryDiv.appendChild(countryFlag);
        countryDiv.appendChild(countryName);
        countryDiv.appendChild(countryDetails);

        countriesContainer.appendChild(countryDiv);
    });
}

async function searchCountries(query) {
    const countries = await getCountries();
    const filteredCountries = countries.filter((country) => {
        const name = country.name.common.toLowerCase();
        return name.includes(query.toLowerCase());
    });
    displayCountries(filteredCountries);
}

searchBtn.addEventListener("click", () => {
    searchCountries(searchBox.value);
});

searchBox.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchCountries(searchBox.value);
    }
});

getCountries().then((countries) => {
    displayCountries(countries);
});