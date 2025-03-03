export async function findAll() {
  return fetch('http://localhost:3000/product')
    .then((response) => response.json())
    .catch((error) => console.error('Error: ', error));
}
