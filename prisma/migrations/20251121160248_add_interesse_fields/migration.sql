/*
  Warnings:

  - Added the required column `bairro` to the `interesses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `interesses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `interesses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `interesses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `interesses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `interesses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "interesses" ADD COLUMN     "bairro" TEXT NOT NULL,
ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "cidade" TEXT NOT NULL,
ADD COLUMN     "cnpj" TEXT,
ADD COLUMN     "complemento" TEXT,
ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "endereco" TEXT NOT NULL,
ADD COLUMN     "estado" TEXT NOT NULL,
ADD COLUMN     "numero" TEXT NOT NULL,
ADD COLUMN     "razaoSocial" TEXT,
ADD COLUMN     "tipoPessoa" TEXT NOT NULL DEFAULT 'PF';
