import React, { useState } from 'react';

const Cart = ({ cart = [], setCart, children, addToCheckout,handleCheckout }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const totalQty = cart.reduce((total, item) => total + item.qty, 0);

  const increaseQty = (id) => {
    setCart((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  

  return (
    <>
      <button type="button" onClick={toggleModal} className="relative">
        {children}
        {totalQty > 0 && (
          <span 
          className="absolute -mt-1 inline-flex items-center justify-center 
          w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full">
            {totalQty}
          </span>
        )}
      </button>

      {isModalOpen && (
        <div
          id="crypto-modal"
          tabIndex="-1"
          className="fixed mr-1 top-0 right-0 mt-16  
          z-50 justify-center justify-items-end 
          items-center w-full h-full max-h-full
          sm:mr-20 
          md:mr-20
          lg:mr-20  
          xl:mr-20  
          "
        >
          <div 
          className="relative p-4 w-full max-w-md max-h-full">
            <div 
            className="relative bg-white rounded-lg shadow border-2 border-bg pb-2 dark:bg-white">
              <div 
              className="flex items-center justify-between border-b-2 
              border-b-bg p-4 md:p-5 border-b rounded-t bg-bg dark:bg-bg">
                <h3 
                className="text-lg font-semibold text-txt dark:text-txt">
                  Keranjang
                  </h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-txt bg-transparent hover:text-bg rounded-lg text-sm 
                  h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:text-red-500"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-1 md:p-2 bg-white dark:bg-white">
                <div className="text-sm  font-normal text-bg dark:text-bg">
                  {cart.length === 0 ? (
                    <p>Keranjang Anda Kosong.</p>
                  ) : (
                    <div className="h-96  overflow-y-auto">
                      {cart.map((item) => (
                        <div key={item.id}>
                          <ul className="scroll-smooth">
                            <li className="  border-b pb-1 border-bg rounded flex items-center">
                              <img
                                src={item.imageURL}
                                alt={item.nama}
                                className="size-16 mt-1 rounded object-cover mr-1"
                              />
                              <div>
                                <h3 className="text-sm text-bg">{item.nama}</h3>
                                <span className="font-bold">Rp. {''}
                                  {(item.harga * item.qty).toLocaleString('id-ID', {
                                    styles: 'currency',
                                    currency: 'IDR',
                                  })}
                                </span>
                                <div className="text-xs mr-12  w-48 text-gray-600
                                sm:mr-14 sm:w-56
                                md:mr-14 md:w-56
                                lg:mr-14 lg:w-56
                                xl:mr-14 xl:w-56
                                ">
                                  <span>Jumlah : </span>
                                  <button
                                    onClick={() => decreaseQty(item.id)}
                                    className="mx-2 mr-3 text-xl"
                                  >
                                    -
                                  </button>
                                  {item.qty}
                                  <button
                                    onClick={() => increaseQty(item.id)}
                                    className="mx-2 ml-3 text-xl"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-red-500   -ml-16 right-0 top-0
                                sm:-ml-0 
                                md:-ml-0
                                lg:-ml-0 
                                xl:-ml-0 
                                "
                              >
                                <i className="ri-delete-bin-fill text-xl"></i>
                              </button>
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  <div 
                  className="mt-8 flex block z-10 justify-end border-t border-gray-100 pt-8">
                    <div 
                    className="w-screen max-w-lg space-y-4">
                      <dl className="space-y-0.5 text-sm text-bg">
                        <div className="flex justify-between !text-base font-medium">
                          <dt>Total</dt>
                          <dd>
                            Rp.{' '}{cart.reduce(
                              (total, item) => total + item.harga * item.qty,
                              0
                            ).toLocaleString('id-ID', {
                              styles: 'currency',
                              currency: 'IDR',
                            })}
                          </dd>
                        </div>
                      </dl>
                      <div className="flex justify-center ">
                        <button
                          type="button"
                          onClick={handleCheckout}
                          className="block rounded  w-full z-50 text-center 
                          bg-bg px-5 py-3 text-sm text-txt transition hover:bg-bg"
                        >
                          Pesan
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
