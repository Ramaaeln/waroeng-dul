import { useState } from "react";

const Checkout = ({ checkout = [], setCheckout,handleAddToCheckout }) => {
  const [isModalsOpen, setModalsOpen] = useState(false);

  const toggleModals = () => {
    setModalsOpen(!isModalsOpen);
  };

  const totalQty = checkout.reduce((total, item) => total + item.qty, 0);

  // Fungsi untuk menghapus item dari cart
  const removeItem = (id) => {
    setCheckout((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div>
      <button type="button" onClick={toggleModals}>
        <i className="ri-notification-2-fill text-xl"></i>
        {totalQty > 0 && (
          <span className="absolute -mt-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full">
          </span>
        )}
      </button>

      {isModalsOpen && (
        <div
          id="crypto-modal"
          tabIndex="-1"
          className="fixed top-0 right-0 mt-16 mr-20 z-50 justify-center justify-items-end items-center w-full h-full max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-bg rounded-lg shadow border-2 border-bg pb-2 dark:bg-white">
              <div className="flex items-center justify-between border-b-2 border-b-bg p-4 md:p-5 border-b rounded-t dark:bg-bg">
                <h3 className="text-lg font-semibold text-txt dark:text-txt">Notifikasi</h3>
                <button
                  type="button"
                  onClick={toggleModals}
                  className="text-txt bg-transparent hover:text-bg rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:text-red-500"
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

              <div className="p-1 md:p-2">
                <div className="text-sm font-normal text-bg dark:text-bg">
                  {checkout.length === 0 ? (
                    <p>Keranjang Anda Kosong.</p>
                  ) : (
                    <div className="overflow-y-auto scroll-smooth h-96">
                      {checkout.map((item) => (
                        <div key={item.id}>
                          <ul key={item.id}>
                        <li  className=" pb-1 mb-2 rounded flex items-center gap-4">
                          <div>
                            <h3 className="text-sm text-bg">Pesanan Berhasil Silahkan tunggu di ruang tunggu...</h3>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 ml-2 right-0 top-0"
                          >
                            Hapus
                          </button>
                        </li>
                        </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
