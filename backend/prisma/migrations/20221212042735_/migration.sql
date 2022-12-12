/*
  Warnings:

  - The primary key for the `AccountType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `AccountType` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `accountType` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_accountType_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "accountType",
ADD COLUMN     "accountType" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "AccountType" DROP CONSTRAINT "AccountType_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "AccountType_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_accountType_fkey" FOREIGN KEY ("accountType") REFERENCES "AccountType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
