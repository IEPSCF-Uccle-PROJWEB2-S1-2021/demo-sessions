const express = require('express');
const router = new express.Router();

let counter = 1;
class ItemToBuy {
  constructor(id, title, description, price) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
  }
}
const itemsToBuy = [
  new ItemToBuy(
    counter++,
    'Mettler Cotton Thread White',
    'Silk Finish Cotton Thread is made of 100% Egyptian long fiber mercerized cotton. This soft shiny thread takes color beautifully, is colorfast and non-shrinking. Mercerized finish decreases snagging, knotting and breakage. Perfect for hand sewing and machine quilting.',
    4.47
  ),
  new ItemToBuy(
    counter++,
    'Schmetz Denim Machine Needle 14/90',
    'Heavy duty needle for denim, canvas and heavy weight woven fabrics. Size 14/90 5/Pkg',
    5.02
  ),
  new ItemToBuy(
    counter++,
    'Fiskars Premier 8" Pinking Shears',
    'From Fiskars comes this Premier 8" Pinking Shears that provide ultimate hand comfort and durability. These scissors end fraying edges by cutting a zig-zag edge and can cut a wide variety of materials such as denim, silk, and multiple layers of fabric.',
    32.49
  ),
  new ItemToBuy(
    counter++,
    'Dritz Ball Point Pins 350/Pkg',
    "Nickel-plated steel pins with plastic heads in reusable plastic storage box. Size 17 (1 1/16'').",
    4.97
  ),
];

/* GET home page. */
router.get('/', (req, res, next) => {
  const basket = req.session.basket || [];
  res.render('index', {
    title: 'My Web Shop',
    items: itemsToBuy,
    basket: basket,
  });
});

router.post('/buy', (req, res, next) => {
  const basket = req.session.basket || [];
  const itemId = parseInt(req.body.item);
  const item = itemsToBuy.find((item) => item.id === itemId);
  if (item !== undefined) {
    basket.push(item);
    req.session.basket = basket;
  }
  res.redirect('/');
});

router.get('/basket', (req, res, next) => {
  const basket = req.session.basket || [];
  basket.sort((first, second) => {
    if (first.title > second.title) {
      return 1;
    } else if (first.title < second.title) {
      return -1;
    } else {
      return 0;
    }
  });
  const total = basket
    .map((item) => item.price)
    .reduce((accumulator, currentPrice) => accumulator + currentPrice, 0);
  res.render('basket', { title: 'Your basket', basket, total });
});

module.exports = router;
