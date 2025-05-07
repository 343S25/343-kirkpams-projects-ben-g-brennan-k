// This script is used to handle the product information page
(async function () {
  let currItem = {};

  try {
    let params = new URLSearchParams(window.location.search);
    let product_id = params.get('id');
    console.log('Product ID:', product_id);
    await fetch(`https://dummyjson.com/products/${product_id}`)
      .then(response => response.json())
      .then(data => {
        currItem = data;
        // Populate the product information on the page
        document.querySelector('#product-name').innerHTML = data.title;
        document.querySelector('#product-description').innerHTML =
          data.description;
        document.querySelector('#product-price').innerHTML = `$${data.price}`;
        document.querySelector('#product-img').src = data.images[0];
        document.querySelector('#product-img').alt =
          `An image of: ${data.title}`;
      })
      .catch(error => console.error('Error fetching product data:', error));

  } catch (error) {
    console.error('Error parsing URL parameters:', error);
  }

  document.querySelector('.btn-submit').addEventListener('click', function (e) {
    e.preventDefault();

    let quantity = document.querySelector('#quantity').value;

    if (quantity < 1) {
      alert('Please select a quantity greater than 0.');
    } else {
      alert(`You have selected ${quantity} items.`);
      add_Cart_Item(currItem, quantity);
    }
  });
})();