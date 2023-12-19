const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

const tenantId = 1;

async function seed() {
  // await createOrders()
  // await createCategories()
  await createProducts()
}

async function createOrders () {
  await db.order.create({
    data: {
      id: 2,
      tenantId: tenantId,
      customerId: 1,
      type: "venda",
      document: "nota_fiscal",
      operation: "venda",
      nature: "venda_de_mercadoria",
      seller: 1,
      payment: "dinheiro",
      paymentStatus: "pendente",
      note: "venda de mercadoria",
      total: 371.45,
      createdAt: new Date(),
      updatedAt: new Date(),
      orderProducts: {
        create: [
          {
            productId: 1,
            quantity: 5,
            price: 5.80,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            productId: 2,
            quantity: 10,
            price: 5.80,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
    }
  });
}

async function createCategories () {
  await db.category.create({
    data: {
      id: 1,
      tenantId: tenantId,
      name: "Bolo 300gr",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  await db.category.create({
    data: {
      id: 2,
      tenantId: tenantId,
      name: "Bolo 380gr",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}
async function createProducts () {
  await db.product.create({
    data: {
      tenantId,
      id: 1,
      categoryId: 1,
      name: "Bolo de Cenoura",
      price_sell: 5.80,
      price_cost: 4.30,
      manufacturer: 1,
      barcode: "3123123123",
      status: "ativo",
      quantity: 30,
      description: "Bolo de Cenoura",
      createdAt: new Date(),
      updatedAt: new Date(),
      images: {
        create: [
          {
            image: "https://fakeimg.pl/200/?text=Tonielli-1&font=lobster%22",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            image: "https://fakeimg.pl/200/?text=Tonielli-2&font=lobster%22",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
      productTributation: {
        create: {
          origem: "18",
          codigoNcm: "1.65",
          cest: "7.6",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    },
  });
}

seed()


