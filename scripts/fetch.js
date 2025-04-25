// Returns a raw JSON array of products
async function get_all_products() {
  let result = await fetch('https://dummyjson.com/products');
  let json = await result.json();
  return json;
}

// Filter the json array into useful information 
function filter_json(){

}

function update_grid(products) {
// TODO get the grid and then put the items in
// TODO create html <template>
}


(async function() {
  let products = await get_all_products();
  
  
})();