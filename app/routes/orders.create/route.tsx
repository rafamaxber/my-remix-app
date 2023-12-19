/*
  Será um formulario para criação de pedidos/atendimentos

  Campos:
  - Tipo de atendimento (0)
  - Cliente (0)
  - Tipo de documento fiscal (0)
  - Tipo de operação (0)
  - Natureza da operação (0)
  - Nome vendedor (1)
  - lsita de produtos (0)
  - dados do pagamento (1)
  - Observações (1)
  - Exibir valor total do pedido (0)



*/

import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";
import { OrdersRepository } from "~/repositories/Orders";

export async function loader() {
  // const list = await new OrdersRepository().listAll();
  const list = await new OrdersRepository().findById(2);

  return json({
    orders: list
  })
}

export default function CreateOrder() {
  const data = useLoaderData<typeof loader>();

  console.log(data)



  return (
    <div className="container-order-form p-4 md:w-[800px] m-auto border-b border-gray-900/10 pb-12">
      <h1 className="my-4 text-2xl font-bold">Criar pedido</h1>
      <form className="">
        <div className="p-5 mt-3 bg-white rounded-lg shadow-lg form-group">
          <h2 className="mb-6 text-base font-semibold leading-7 text-gray-900">Dados do pedido</h2>

          <div className="mb-3 container-field sm:col-span-4">
            <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="client">Cliente</label>
            <div className="mt-2">
              <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" name="client" id="client" />
            </div>
          </div>

          <div className="flex-wrap mt-3 md:flex">
            <div className="flex-auto mb-3 container-field sm:col-span-4 md:w-1/2">
              <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="type">Tipo de atendimento</label>
              <div className="mt-2">
                <select className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" name="type" id="type">
                  <option value="0">Venda</option>
                  <option value="1">Orçamento</option>
                </select>
              </div>
            </div>

            <div className="flex-auto mb-3 container-field sm:col-span-4 md:w-1/2">
              <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="document">Tipo de documento fiscal</label>
              <div className="mt-2">
                <select className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" name="document" id="document">
                  <option value="0">Nota fiscal</option>
                  <option value="1">Cupom fiscal</option>
                </select>
              </div>
            </div>

            <div className="flex-auto mb-3 container-field sm:col-span-4 md:w-1/2">
              <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="operation">Tipo de operação</label>
              <div className="mt-2">
                <select className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" name="operation" id="operation">
                  <option value="0">Venda</option>
                  <option value="1">Devolução</option>
                </select>
              </div>
            </div>

            <div className="flex-auto container-field sm:col-span-4 md:w-1/2">
              <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="nature">Natureza da operação</label>
              <div className="mt-2">
                <select className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" name="nature" id="nature">
                  <option value="0">Venda de mercadoria</option>
                  <option value="1">Venda de serviço</option>
                  <option value="2">Venda para consumo</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 mt-3 bg-white rounded-lg shadow-lg form-group">
          <div className="container-field sm:col-span-4">
            <label className="mb-6 text-base font-semibold leading-7 text-gray-900" htmlFor="seller">Nome vendedor</label>
            <div className="mt-2">
              <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" name="seller" id="seller" />
            </div>
          </div>
        </div>

        <div className="p-5 mt-3 bg-white rounded-lg shadow-lg form-group">
          {/* podemos criar uma forma de copiar listas de produtos base, poe exemplo selecionar todos os bolos de 300gramas e inserir apenas as quantidades */}
          <div className="container-field sm:col-span-4">
            <label className="mb-6 text-base font-semibold leading-7 text-gray-900" htmlFor="product">Lista de Produtos</label>
            <div className="mt-2">
              <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" name="product" id="product" />
            </div>
          </div>
        </div>

        <div className="p-5 mt-3 bg-white rounded-lg shadow-lg form-group">
          <div className="container-field sm:col-span-4">
            <label className="mb-6 text-base font-semibold leading-7 text-gray-900" htmlFor="payment">Forma de pagamento</label>
            <div className="mt-2">
              <select className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" name="payment" id="payment">
                <option value="0">Dinheiro</option>
                <option value="1">Pix</option>
                <option value="2">Cartão</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-5 mt-3 bg-white rounded-lg shadow-lg form-group">
          <div className="container-field sm:col-span-4">
            <label className="mb-6 text-base font-semibold leading-7 text-gray-900" htmlFor="note">Observações</label>
            <div className="mt-2">
              <textarea className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" name="note" id="note"></textarea>
            </div>
          </div>
        </div>

        <div className="p-5 mt-3 bg-white rounded-lg shadow-lg form-group">
          <div className="container-field sm:col-span-4">
            <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="total">Valor total do pedido</label>
            <div className="mt-2 text-lg">
              R$ 300,50
            </div>
          </div>
        </div>

        <div className="mt-3 form-group">
          <button className="px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 w-[100%]">Criar pedido</button>
        </div>

      </form>


    </div>
  )
}
