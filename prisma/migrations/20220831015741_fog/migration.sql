/*
  Warnings:

  - The values [foggy] on the enum `Precipitation_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "Precipitation_type" ADD VALUE 'fog';
ALTER TYPE "Precipitation_type" DROP VALUE 'foggy';
