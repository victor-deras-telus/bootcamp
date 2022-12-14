Sample Deposit
1)Post transaction
http://localhost:5000/api/transaction
{"title":"Deposito","amount": 500,"info":"Deposito de la quincena 1 de diciembre 2022","transactionTypeId": 2,"transactionCategoryId": 9,"currencyId": "USD","accountId": 3}
2)Update account
http://localhost:5000/api/account/update
{"id":3,"accountType":2,"name":"Ahorros Agricola", "currencyId":"USD", "balance":600, "active":true }

Sample Withdrawal
1)Post transaction
http://localhost:5000/api/transaction
{"title":"Pago de recibos","amount": -75,"info":"Recibos del mes de diciembre 2022","transactionTypeId": 1,"transactionCategoryId": 2,"currencyId": "USD","accountId": 3}
2)Update account
http://localhost:5000/api/account/update
{"id":3,"accountType":2,"name":"Ahorros Agricola", "currencyId":"USD", "balance":525, "active":true }

Sample Transfer
1)Post transaction
http://localhost:5000/api/transaction
{"title":"Transferencia BAC","amount": -100,"info":"Transferencia entre cuentas","transactionTypeId": 3,"transactionCategoryId":13,"currencyId": "USD","accountId": 3,"relAccountId": 4}
http://localhost:5000/api/transaction
{"title":"Transferencia BAC","amount": 100,"info":"Transferencia entre cuentas","transactionTypeId": 3,"transactionCategoryId":13,"currencyId": "USD","accountId": 4,"relAccountId": 3}
2)Update account
http://localhost:5000/api/account/update
{"id":3,"accountType":2,"name":"Ahorros Agricola", "currencyId":"USD", "balance":425, "active":true }
3)Update related account
http://localhost:5000/api/account/update
{"id":4,"accountType":2,"name":"Ahorros BAC", "currencyId":"USD", "balance":100, "active":true }
