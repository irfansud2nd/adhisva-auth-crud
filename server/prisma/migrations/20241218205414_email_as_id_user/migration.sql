/*
  Warnings:

  - You are about to drop the column `author_id` on the `blog` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - Added the required column `author_email` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `blog` DROP FOREIGN KEY `Blog_author_id_fkey`;

-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- AlterTable
ALTER TABLE `blog` DROP COLUMN `author_id`,
    ADD COLUMN `author_email` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`email`);

-- AddForeignKey
ALTER TABLE `Blog` ADD CONSTRAINT `Blog_author_email_fkey` FOREIGN KEY (`author_email`) REFERENCES `User`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;
