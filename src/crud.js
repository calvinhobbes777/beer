const RandomBeerUrl = "https://api.punkapi.com/v2/beers/random";
const getBeerUrl = (page = null, items = null) =>
  `https://api.punkapi.com/v2/beers?page=${page}&per_page=${items}`;

export const getRandomBeer = () => {
  return fetch(RandomBeerUrl)
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const getBeer = (page, items) => {
  return fetch(getBeerUrl(page, items))
    .then(response => response.json())
    .catch(error => console.log(error));
};
