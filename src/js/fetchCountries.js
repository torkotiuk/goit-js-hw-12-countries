// --- API ---
const BASE_URL = `https://restcountries.eu/rest/v2/name/`;

function fetchCountries(inputData) {
  return fetch(`${BASE_URL}${inputData}`)
    .then(response => response.json())
    .catch(catchError);
}
// function fetchCountries(inputData) {
//   return fetch(`${BASE_URL}${inputData}`)
//     .then(response => {
//       if (response.status === '404') {
//         throw new Error();
//       }
//       return response.json();
//     })
//     .catch(catchError);
// }
// --- --- ---

export default { fetchCountries };

function catchError() {
  error({
    text: 'Enter smth to find your country!',
    delay: 2000,
  });
}
