-- DropIndex
DROP INDEX "Account_userId_key";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "balance" DROP NOT NULL,
ALTER COLUMN "balance" SET DEFAULT 0,
ALTER COLUMN "active" DROP NOT NULL,
ALTER COLUMN "active" SET DEFAULT true;
