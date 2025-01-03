const stripe = require("stripe")(process.env.STRIPE_KEY);


const payment = async (req, res) => {
  console.log(req.body);
    stripe.charges.create(
        {
          source: req.body.tokenId,
          amount: req.body.amount,
          currency: "usd",
        },
        (stripeErr, stripeRes) => {
          if (stripeErr) {
            res.status(500).json(stripeErr);
          } else {
            res.status(200).json(stripeRes);
          }
        }
      );
}

export { payment }
