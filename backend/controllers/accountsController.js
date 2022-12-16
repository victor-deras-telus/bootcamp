const { prisma } = require("../constats/config.js");
const { DateTime } = require("luxon");

const accounts_get = async (req, res) => {
  if (req.session.userId) {
    let accounts;

    try {
      accounts = await prisma.account
        .findMany({
          where: {
            active: true,
            userId: req.session.userId,
          },
          include: {
            type: true, // Return all fields
            currency: {
              include: {
                currency: true,
              },
            },
          },
        })
        .catch((err) => console.log(err));

      if (accounts) res.status(200).send(accounts);
    } catch (err) {
      console.log(err);
      res.status(400).send("error");
    }
  } else res.status(401).send("please login");
};

const accountTypes_get = async (req, res) => {
  if (req.session.userId) {
    let accountTypes;

    try {
      accountTypes = await prisma.accountType
        .findMany({
          include: {
            Accounts: {
              where: {
                active: true,
                userId: req.session.userId,
              },
              include: {
                currency: {
                  include: {
                    currency: true,
                  },
                },
              },
            },
          },
        })
        .catch((err) => console.log(err));

      if (accountTypes) res.status(200).send(accountTypes);
    } catch (err) {
      console.log(err);
      res.status(400).send("error");
    }
  } else res.status(401).send("please login");
};

const accounts_post = async (req, res) => {
  if (req.session.userId) {
    try {
      await prisma.account.create({
        data: {
          userId: req.session.userId,
          name: req.body.name,
          currencyId: req.body.currencyId,
          accountType: req.body.accountType,
        },
      });
      res.status(200).send("success");
    } catch (err) {
      console.log(err);
      res.status(400).send([{ instancePath: "Err", message: err }]);
    }
  } else res.status(401).send("please login");
};

const account_delete = async (req, res) => {
  if (req.session.userId) {
    let accountId = parseInt(req.params.accountId);
    let tr;
    try {
      tr = await prisma.account.deleteMany({
        where: {
          id: accountId,
        },
      });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .send(
          "something went wront with the deletion of the particular transaction"
        );
      return;
    }

    if (tr?.count) {
      res.status(200).send("success");
      return;
    }
    res.status(400).send("error");
  } else {
    res.status(401).send("please login");
  }
};

const account_update = async (req, res) => {
  if (req.session.userId) {
    try {
      await prisma.account.update({
        where: {
          id: req.body.id,
        },
        data: {
          name: req.body.name,
          currencyId: req.body.currencyId,
          accountType: req.body.accountType,
          balance: req.body.balance,
          active: req.body.active,
        },
      });
      res.status(200).send("Updated");
    } catch (e) {
      console.log(e);
      res.status(500).send("Error {Update Meta}");
    }
  } else {
    //IF NOT
    res.status(401).send("Please Login");
  }
};

module.exports = {
  accounts_get,
  accounts_post,
  account_delete,
  account_update,
  accountTypes_get,
};
