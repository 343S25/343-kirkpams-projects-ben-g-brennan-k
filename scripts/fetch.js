// Returns a raw JSON array of products
async function get_all_products() {
  let result = await fetch('https://dummyjson.com/products');
  let json = await result.json();
  return json;
}

// Filter the json array into useful information
function filter_json() {}

function update_grid(products) {
  // Get the grid and then put the items in
  let list = document.getElementById('grid-boxes');
  let template = document.getElementById('template');
  for (let i = 0; i < 18; i++) {
    let grid_item = template.content.cloneNode(true);
    grid_item.product_link.textcontent = "Test";
    list.appendChild(grid_item);
  }
}


(async function() {
  let products = await get_all_products();
  update_grid();
})();