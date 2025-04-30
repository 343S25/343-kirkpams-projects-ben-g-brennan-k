// Returns a raw JSON array of products
async function get_all_products(test_mode = false) {
  console.log('Fetching all products');
  let url = 'https://dummyjson.com/products';
  // If we are in test mode, use the test data instead of the live API
  if (test_mode) {
    console.log('Locally');
    url = './local_products.json';
  }

  let result = await fetch(url);
  let json = await result.json();
  return json;
}

async function search_json(e) {
  e.preventDefault();
  const q = document.querySelector('.form-control').value.trim();

  let cached_search_unparsed = localStorage.getItem("cached_search");
  let cached_search = undefined;
  if (cached_search_unparsed != undefined){
    cached_search = JSON.parse(cached_search_unparsed);
  }

  // Don't refetch data we already have
  if (cached_search != undefined && q == cached_search.search_term) {
    console.log("Searching for an item (Locally)");
    document.getElementById('grid-boxes').innerHTML = '';
    update_grid(cached_search.result);
    // add ?search=q to the url
    const url = new URL(window.location.href);
    url.searchParams.set('search', q);
    window.history.pushState({}, '', url);
    return;
  }

  try {
    const res = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}`);
    console.log('Searching for an item (Fetch)')
    const data = await res.json();

    // clear out old results
    document.getElementById('grid-boxes').innerHTML = '';

    // repopulate
    const results = filter_json_for_grid(data);
    update_grid(results);

    // add ?search=q to the url
    const url = new URL(window.location.href);
    url.searchParams.set('search', q);
    window.history.pushState({}, '', url);

    // Cache the successful search
    cached_search = {search_term: q, result: results};
    localStorage.setItem("cached_search", (JSON.stringify(cached_search)))

    console.log(cached_search);
  } catch (err) {
    console.error(err);
  }
}

// Filter the json array into useful information
function filter_json_for_grid(json) {
  return json.products.map(
      element =>
          ({name: element.title, img_link: element.images[0], id: element.id}));
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
    // set link to product page with id
    grid_item.querySelector('a').href = `product_info.html?id=${element.id}`;

    list.appendChild(grid_item);
  });
}

let cached_search = {search_term: undefined, result: undefined};

// when the back button is pressed on the browser, reload the page
window.addEventListener('popstate', function(event) {
  window.location.reload();
});

document.getElementById('searchSubmitButton')
    .addEventListener('click', search_json);

(async function() {
  // get url parameters from the current page
  const urlParams = new URLSearchParams(window.location.search);
  const search = urlParams.get('search');
  if (search !== null) {
    document.querySelector('.form-control').value = search;
    document.getElementById('searchSubmitButton').click();
  } else {
    let all_products = await get_all_products(true);
    let display_products = filter_json_for_grid(all_products);
    update_grid(display_products);
  }
})();