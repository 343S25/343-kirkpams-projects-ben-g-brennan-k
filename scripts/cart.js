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
    items.push({id: item.id, name: item.title, quantity: 1, price: item.price});
  }
  localStorage.setItem('cart', (JSON.stringify(items)));
  console.log(`Added: ${item.title}`);
}

function remove_Cart_Item(item) {
  console.log(`Attempting to remove: ${item.textContent}`);
  let items = get_Cart_Items();
  let unique_item = items.find((i) => i.name == item.name);
  if (unique_item != undefined && unique_item.quantity > 0) {
    unique_item.quantity -= 1;
    console.log(`Removed: ${item.textContent}`);
    if (unique_item.quantity <= 0) {
      items.splice(items.indexOf(unique_item), 1);
    }
  }
  localStorage.setItem('cart', (JSON.stringify(items)));
}

function calculate_cart_subtotal() {
  const items = get_Cart_Items();
  const sum = items.reduce(
      (accumulator, current) =>
          accumulator + (current.price * current.quantity),
      0);
  return sum;
}

function calculate_item_count() {
  const items = get_Cart_Items();
  const sum = items.reduce(
      (accumulator, current) =>
          accumulator + current.quantity,
      0);
  return sum;
}

function truncateString(str, maxLength, ending = "...") {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + ending;
  }
  return str;
}
// Each item in localstorage is represented as:
//  {
//   id: Number
//   name: String,
//   quantity: Number,
//   price: Number
//  }
// cart is a list of these items
