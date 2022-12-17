const { prisma } = require("../constats/config.js");
const { DateTime } = require("luxon");

const currency_get = async (req, res) => {
  if (req.session.userId) {
    let currencies;

    try {
      currencies = await prisma.currency
        .findMany()
        .catch((err) => console.log(err));

      if (currencies) res.status(200).send(currencies);
    } catch (err) {
      console.log(err);
      res.status(400).send("error");
    }
  } else res.status(401).send("please login");
};

const activeCurrency_post = async (req, res) => {
  if (req.session.userId) {
    try {
      await prisma.activeCurrency.upsert({
        where: { code: req.body.code || 0 },
        update: { rate: parseFloat(req.body.rate) },
        create: {
          code: req.body.code,
          rate: parseFloat(req.body.rate),
        },
      });

      res.status(200).send("success");
    } catch (err) {
      console.log(err);
      res.status(400).send([{ instancePath: "Err", message: err }]);
    }
  } else res.status(401).send("please login");
};


module.exports = {
  currency_get,
  activeCurrency_post,
};
