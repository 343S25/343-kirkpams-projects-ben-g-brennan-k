function get_Cart_Items() {
  let items = localStorage.getItem('cart');
  if (items != undefined) {
    return JSON.parse(items);
  }
  return [];
}

function add_Cart_Item(item) {
  let items = get_Cart_Items();
  let unique_item = items.find((i) => i.id == item.id);
  if (unique_item != undefined) {
    unique_item.quantity += 1;
  } else {
    items.push(
        {id: item.id, name: item.title, quantity: 1, price: item.price});
  }
  localStorage.setItem('cart', (JSON.stringify(items)));
}

function calculate_cart_subtotal(){
    const items = get_Cart_Items();
    const sum = items.reduce((accumulator, current) => accumulator + (current.price * current.quantity), 0);
    return sum;
}

// Each item in localstorage is represented as:
//  {
//   id: Number
//   name: String,
//   quantity: Number,
//   price: Number
//  }
// cart is a list of these items


