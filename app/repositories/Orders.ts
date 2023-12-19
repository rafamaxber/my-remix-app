import type { Order } from "@prisma/client";
import { db } from "~/utils/db.server";

// FIXME: É necessario buscar o tennatId do usuário logado
export class OrdersRepository {
  private entity: typeof db.order;

  constructor() {
    this.entity = db.order;
  }

  public async create(data: Order) {
    const tennatId = 1;
    this.entity.create({
      data: {
        ...data,
        tenantId: tennatId,
      },
    });
  }

  public async listAll({ page = 1, perPage = 50 }: { page?: number; perPage?: number } = {}) {
    const tennatId = 1;
    const [total, list] = await db.$transaction([
      this.entity.count({
        where: {
          tenantId: tennatId
        }
      }),
      this.entity.findMany({
        where: {
          tenantId: tennatId
        },
        take: Number(perPage),
        skip: Math.round(Math.abs(page - 1) * Number(perPage)),
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          customerId: true,
          orderProducts: {
            select: {
              productId: true,
              quantity: true,
              price: true,
              updatedAt: true,
            }
          },
          paymentStatus: true,
          seller: true,
          type: true,
          document: true,
          operation: true,
          nature: true,
          payment: true,
          note: true,
          total: true,
          createdAt: true,
        }
      })
    ])

    const productIdList = list.map(order => order.orderProducts.map(orderProduct => orderProduct.productId)).flat();

    const products = await db.product.findMany({
      where: {
        tenantId: tennatId,
        id: {
          in: productIdList
        }
      },
      select: {
        id: true,
        name: true,
        price_cost: true,
        price_sell: true,
        images: true,
        createdAt: true,
      },
    });

    const listWithProducts = list.map(order => {
      const orderProducts = order.orderProducts.map(orderProduct => {
        const product = products.find(product => product.id === orderProduct.productId);
        return {
          productData: product,
          ...orderProduct,
        }
      })

      return {
        ...order,
        orderProducts,
      }
    });

    return {
      data: listWithProducts,
      pagination: {
        page,
        perPage,
        total,
      }
    };
  }

  public async findById(id: number) {
    const tenantId = 1;
    const order = await this.entity.findUnique({
      where: {
        tenantId,
        id,
      },
      select: {
        id: true,
        customerId: true,
        orderProducts: {
          select: {
            productId: true,
            quantity: true,
            price: true,
            updatedAt: true,
          }
        },
        paymentStatus: true,
        seller: true,
        type: true,
        document: true,
        operation: true,
        nature: true,
        payment: true,
        note: true,
        total: true,
        createdAt: true,
      }
    });

    const productIdList = order?.orderProducts.map(orderProduct => orderProduct.productId);

    const products = await db.product.findMany({
      where: {
        tenantId: tenantId,
        id: {
          in: productIdList
        }
      },
      select: {
        id: true,
        name: true,
        price_cost: true,
        price_sell: true,
        images: true,
        createdAt: true,
      },
    });

    const orderProducts = order?.orderProducts.map(orderProduct => {
      const product = products.find(product => product.id === orderProduct.productId);
      return {
        productData: product,
        ...orderProduct,
      }
    })

    return {
      ...order,
      orderProducts,
    }
  }

  public async update(id: number, data: Order) {
    const tenantId = 1;
    await this.entity.update({
      where: {
        tenantId,
        id,
      },
      data,
    });
  }

  public async delete(id: number) {
    const tenantId = 1;
    await this.entity.delete({
      where: {
        tenantId,
        id,
      },
    });
  }

}
