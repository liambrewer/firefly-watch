-- CreateEnum
CREATE TYPE "Habitat_type" AS ENUM ('field', 'lawn', 'wetland', 'forest', 'pavement', 'other');

-- CreateEnum
CREATE TYPE "Precipitation_type" AS ENUM ('foggy', 'light_rain', 'heavy_rain', 'none');

-- CreateEnum
CREATE TYPE "Wind_type" AS ENUM ('calm', 'light', 'strong');

-- CreateEnum
CREATE TYPE "Cloud_type" AS ENUM ('clear', 'partly_cloudy', 'overcast');

-- CreateEnum
CREATE TYPE "Artificial_light_type" AS ENUM ('none', 'within_habitat', 'near_habitat', 'far_habitat');

-- CreateEnum
CREATE TYPE "Pattern_type" AS ENUM ('none', 'one', 'two', 'three');

-- CreateTable
CREATE TABLE "Observation" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "locationId" STRING NOT NULL,
    "longitude" FLOAT8 NOT NULL,
    "latitude" FLOAT8 NOT NULL,
    "amount1" INT4 NOT NULL,
    "amount2" INT4 NOT NULL,
    "amount3" INT4 NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "habitat" "Habitat_type" NOT NULL,
    "mowed" BOOL NOT NULL,
    "temperature" FLOAT8 NOT NULL,
    "precipitation" "Precipitation_type" NOT NULL,
    "wind" "Wind_type" NOT NULL,
    "cloud" "Cloud_type" NOT NULL,
    "light" "Artificial_light_type" NOT NULL,
    "pattern" "Pattern_type" NOT NULL,
    "patternDesc" STRING,
    "notes" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Observation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "Observation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "Observation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;
