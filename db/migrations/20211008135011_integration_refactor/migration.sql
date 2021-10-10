/*
  Warnings:

  - You are about to drop the column `clientId` on the `Integration` table. All the data in the column will be lost.
  - You are about to drop the column `secret` on the `Integration` table. All the data in the column will be lost.
  - Added the required column `webhook` to the `Integration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Integration" DROP COLUMN "clientId",
ADD COLUMN     "webhook" TEXT;

UPDATE "Integration" SET webhook = secret;

ALTER TABLE "Integration"
DROP COLUMN "secret",
ALTER COLUMN "webhook" SET NOT NULL;
