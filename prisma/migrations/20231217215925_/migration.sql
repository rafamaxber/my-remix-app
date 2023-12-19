-- CreateTable
CREATE TABLE "Category" (
    "tenantId" INTEGER NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "tenantId" INTEGER NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price_sell" REAL NOT NULL,
    "price_cost" REAL NOT NULL,
    "manufacturer" INTEGER,
    "barcode" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductImages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProductImages_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductTributation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "origem" TEXT NOT NULL,
    "codigoNcm" TEXT NOT NULL,
    "cest" TEXT,
    "icmsSimples" TEXT,
    "codigoBeneficioFiscal" TEXT,
    "ipi_cst_saida" TEXT,
    "ipi_enquadramento" TEXT,
    "pis_cst" TEXT,
    "cofins_cst" TEXT,
    "icms_geral" TEXT,
    "icms_estado" TEXT,
    "base_calculo_st_retido" TEXT,
    "valor_st_retido" TEXT,
    "percentual_st_retido_mais_fcp" TEXT,
    "base_calculo_fc_st_retido" TEXT,
    "percentual_fcp_st_retido" TEXT,
    "valor_de_fcp_st_retido" TEXT,
    "valor_icms_substituto" TEXT,
    "data_imposto" TEXT,
    "icms" REAL,
    "pis" REAL,
    "cofins" REAL,
    "ipi" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "ProductTributation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductTributation_productId_key" ON "ProductTributation"("productId");
