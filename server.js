// sk_test_51KyuwzK6L9E8BuRsmCOP54PoJUTsPfD9npTgfoOIeTve5gkBEUQXV63Bqux9KLxwtN1l5mBB5P9NjJcDukjgxovq00eRD0oHU1
// Tea : price_1MfmARK6L9E8BuRsT76In9Qi
// Coffe : price_1MfmBYK6L9E8BuRsSoMl2f0e
// Sunglasses : price_1MfmC9K6L9E8BuRsq5ZDjuKF
// Laptop : price_1MfmD8K6L9E8BuRsRyaGJ2be
// Camera : price_1MfmDoK6L9E8BuRszIcubN8P
// Bag : price_1MfmESK6L9E8BuRsN60BLMe1

const express = require("express");
var cors = require("cors");
const stripe = require("stripe")("sk_test_51KyuwzK6L9E8BuRsmCOP54PoJUTsPfD9npTgfoOIeTve5gkBEUQXV63Bqux9KLxwtN1l5mBB5P9NjJcDukjgxovq00eRD0oHU1");

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {

    console.log(req.body)
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    });
  });
    

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url:
      "https://63fb802cf2bf7b7df44d9537--dummy-cart.netlify.app/success",
    cancel_url:
      "https://63fb802cf2bf7b7df44d9537--dummy-cart.netlify.app/cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
