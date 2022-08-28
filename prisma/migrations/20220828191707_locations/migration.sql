-- CreateTable
CREATE TABLE "Location" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "latitude" FLOAT8 NOT NULL,
    "longitude" FLOAT8 NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);
