// Returns a raw JSON array of products
async function get_all_products() {
  let result = await fetch('https://dummyjson.com/products');
  let json = await result.json();
  return json;
}

async function search_json(e) {
  e.preventDefault();
  const q = document.querySelector('.form-control').value.trim();

  try {
    const res = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}`);
    const data = await res.json();

    // clear out old results
    document.getElementById('grid-boxes').innerHTML = '';

    // repopulate
    const results = filter_json_for_grid(data);
    update_grid(results);
  } catch (err) {
    console.error(err);
  }
}


// Filter the json array into useful information
function filter_json_for_grid(json) {
  return json.products.map(
      element => ({name: element.title, img_link: element.images[0]}));
}

function update_grid(products) {
  // Get the grid and then put the items in
  let list = document.getElementById('grid-boxes');
  let template = document.getElementById('template');

  const trimmedProducts = products.slice(0, 18);
  trimmedProducts.forEach(element => {
    let grid_item = template.content.cloneNode(true);

    // Update the product name here
    let product_name = element.name;
    let image_src = element.img_link;

    grid_item.querySelector('.product-name').innerHTML = product_name;
    grid_item.querySelector('img').src = image_src;
    grid_item.querySelector('img').alt = `An image of: ${product_name}`;

    list.appendChild(grid_item);
  });
}

document.getElementById('searchSubmitButton')
    .addEventListener('click', search_json);

(async function() {
  let all_products = await get_all_products();
  let display_products = filter_json_for_grid(all_products);
  update_grid(display_products);
})();