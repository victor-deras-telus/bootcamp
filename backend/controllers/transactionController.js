const { prisma } = require("../constats/config.js");
const { DateTime } = require("luxon");

const validateNull = (input) =>{
  return input==null?undefined:input;
}

const transaction_post = async (req, res) => {
  if (req.session.userId) {
    const date = new Date().toISOString();
    const account = await prisma.account
      .findUnique({
        where: {
          id: req.body.accountId,
        },
      })
      .catch();

      let relAccount = null;
      
      console.log(req.body);
      
      if(req.body.transactionTypeId === 3)
      {
        relAccount = await prisma.account
        .findUnique({
          where: {
            id: req.body.relAccountId,
          },
        })
        .catch();
      }

    try {
      await prisma.transaction.create({
        data: {
          userId: req.session.userId,
          title: req.body.title,
          amount: req.body.amount,
          date: req.body.date?req.body.date:date,
          info: req.body.info,
          transactionTypeId: req.body.transactionTypeId,
          transactionCategoryId: req.body.transactionCategoryId,
          currencyId: req.body.currencyId,
          accountId: account.id,
          relAccountId: relAccount?.id,
        },
      });
      res.status(200).send("success");
    } catch(err) {
      console.log(err);
      res.status(400).send([{ instancePath: "Err", message: "Err" }]);
    }
  } else res.status(401).send("please login");
};

const transactions_get = async (req, res) => {
  if (req.session.userId) {
    let { firstDate, lastDate, category, account, dateSort, priceSort, take, skip } =
      req.query;

    if (!Number(skip)) {
      skip = 0;
    }
    if (!Number(take)) {
      take = 5;
    }
    console.log({ firstDate, lastDate, category, account});

const greaterDate =               lastDate?lastDate.substring(1,11):undefined;   
const lowerDate =               firstDate?firstDate.substring(1,11):undefined;

console.log(DateTime.fromISO(lowerDate).toISO());
console.log(DateTime.fromISO(greaterDate).toISO());



    const transactions = await prisma.transaction
      .findMany({
        where: {

            userId: req.session.userId,

          date: {
            gte:
            validateNull(lowerDate != undefined
              ? DateTime.fromISO(lowerDate).toISO()
              : DateTime.now().minus({ days: 30 }).toISO()),
            lte:
            validateNull(greaterDate != undefined
              ? DateTime.fromISO(greaterDate).toISO()
              : DateTime.now().toISO()),
          },
          transactionCategoryId: {
            equals: category != undefined ? parseInt(category) : undefined,
          },
          accountId: {
            equals: account != undefined ? parseInt(account) : undefined,
          },          
        },
        skip: parseInt(skip),
        take: parseInt(take),
        orderBy: {
          date: dateSort != undefined ? dateSort : undefined,
          amount: priceSort != undefined ? priceSort : undefined,
        },
        select: {
          title: true,
          amount: true,
          date: true,
          info: true,
          id: true,
          accountId: true,
          type: {
            select: {
              id: true,
              name: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          currency: {
            select: {
              code: true,
              rate: true,
            },
          },
          Account_Transaction_mainAccount: {
            select: {
              name: true,
            },
          },   
          Account_Transaction_relAccount: {
            select: {
              name: true,
            },
          },                                      
        },
      })
      .catch((e) => {
        console.log(e);
        res.status(400).send(e);
      });
    res.json(transactions);
  } else res.status(401).send("please login");
};

const transaction_delete = async (req, res) => {
  if (req.session.userId) {
    let transactionId = parseInt(req.params.transactionId);
    let tr;
    try {
      tr = await prisma.transaction.deleteMany({
        where: {
          id: transactionId,
          wallet: {
            userId: req.session.userId,
          },
        },
      });
    } catch (e) {
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


const transactionsCategories_get = async (req, res) => {
  if (req.session.userId) {

    const categories = await prisma.transactionCategory
      .findMany(
        {
          include: {
            type:true,
          }
        }
      )
      .catch((e) => {
        res.status(400).send("error");
      });
    res.json(categories);
  } else res.status(401).send("please login");
};

module.exports = {
  transaction_post,
  transactions_get,
  transaction_delete,
  transactionsCategories_get,
};
