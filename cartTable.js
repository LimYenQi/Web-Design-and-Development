/*
   Web Design And Development Assignment

   Author : Lim Yen Qi
   Date   : 21/08/2020

   Function List:
*/

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {

  var addToCartBtns = document.getElementsByClassName('addCart')
  for (var i = 0; i < addToCartBtns.length; i++) {
    var button = addToCartBtns[i];
    button.addEventListener('click', addToCartClicked)
  }

  var removeButton = document.getElementsByClassName("btnRemove")
  for (var i = 0; i < removeButton.length; i++) {
    var button = removeButton[i];
    button.addEventListener('click', removeItem)
  }

  var quantityInput = document.getElementsByClassName('quantity')
  for (var i = 0; i < quantityInput.length; i++) {
    var input = quantityInput[i];
    input.addEventListener('change', quantityChanged)
  }
}

function removeItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateSubtotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateSubtotal();
}

function addToCartClicked (event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement.parentElement;
  var test = JSON.parse(localStorage.getItem('products'));
  if ( test == undefined) {
    var productItems = {
      productName : [],
      productPrice : [],
      productImage : [],
    };
    productItems.productName.push(shopItem.getElementsByClassName('name')[0].innerText);
    productItems.productPrice.push(shopItem.getElementsByClassName('price')[0].innerText.replace('RM ', ''));
    productItems.productImage.push(shopItem.getElementsByClassName('image')[0].src);
    alert('Successfully added into the cart !');
    store(productItems);
    updateSubtotal();
  } else {
    var productItems = test;
    var test1 = shopItem.getElementsByClassName('name')[0].innerText;
    for (var i = 0; i < productItems.productName.length; i ++) {
      if (productItems.productName[i] == test1) {
        alert('The product is already added to the cart !');
        return;
      }
    }
    productItems.productName.push(shopItem.getElementsByClassName('name')[0].innerText);
    productItems.productPrice.push(shopItem.getElementsByClassName('price')[0].innerText.replace('RM ', ''));
    productItems.productImage.push(shopItem.getElementsByClassName('image')[0].src);
    alert('Successfully added into the cart !');
    store(productItems);
    updateSubtotal();
  }
}
function store(productItems) {
  localStorage.setItem('products', JSON.stringify(productItems));
  addToCart();
  updateSubtotal();
}

function addToCart() {
  let prods = JSON.parse(localStorage.getItem('products'));
  if (prods != undefined) {
    for ( var i = 0; i <= prods.productName.length; i++) {
        let pname = prods.productName[i];
        let pprice = prods.productPrice[i];
        let pimg = prods.productImage[i];
        var table = document.getElementById('Items');
        
        if (pname != null && pprice != null && pimg != null && table != null) {
          var row = table.insertRow(-1);
          row.innerHTML += `
          <tr class="cartItems">
              <td class="btn"><button type="button" class="btnRemove">Remove</button></td>
              <td class="prod">
                <img src="${pimg}">${pname}
              </td>
              <td class="price">${pprice}</td>
              <td><input type="text" class="quantity" name="qty" id="qty" value="1"></td>
              <td class="sum">${pprice}</td>
          </tr>
          `
        }
        if (row != undefined) {
          row.getElementsByClassName("btnRemove")[0].addEventListener('click', removeItem);
        }
        if (row != undefined) {
          row.getElementsByClassName('quantity')[0].addEventListener('change', quantityChanged);
        }
      }
    }
}

function updateSubtotal() {
  var cartItemBox = document.getElementsByClassName('cartContainer')[0];
  if (cartItemBox != undefined) {
    var cartRows = document.getElementById("Items").rows;
    var x = document.getElementById("Items").rows.length;
    var str = "RM ";
    var total = 0;

    for (var i = 0; i < x; i++) {
      var sum = 0;
      var cartRow = cartRows[i];
      var priceElement = cartRow.getElementsByClassName('price')[0];
      var quantityElement = cartRow.getElementsByClassName('quantity')[0];
      var itemPrice = parseFloat(priceElement.innerText);
      var itemQuantity = parseFloat(quantityElement.value);
      sum = itemPrice * itemQuantity;
      document.getElementsByClassName('sum')[i].innerText = sum;
      total += sum;
    }
    total = Math.round(total * 100) / 100;
    localStorage.setItem('totals', JSON.stringify(total));
    document.getElementsByClassName('total')[0].innerText = str + (total);
  }
 }

addToCart();
updateSubtotal();
