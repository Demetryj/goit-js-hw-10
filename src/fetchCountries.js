export const fetchCountries = async function (name) {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  );

  if (!response.ok) {
    throw new Error(response.status);
  }

  const data = response.json();
  return data;
};

// export const fetchCountries = function (name) {
//   return fetch(
//     `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// };
