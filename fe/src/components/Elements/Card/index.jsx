import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Card = ({ search, addToCart}) => {
  const [menu, setMenu] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios
      .get('https://candy-cute-zebu.glitch.me/menu')
      .then((response) => {
        setMenu(response.data);
      })
      .catch((error) => {
        console.error('Error fetching menu data', error);
      });
  }, []);

  const filteredMenu = filter === 'all' ? menu : menu.filter((item) => item.tagmenu === filter);
  const filteredBySearch = filteredMenu.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-screen mt-36">
      <h1 className="ml-6 mt-4 font-popins text-2xl font-bold text-bg">Menu.e dul</h1>

      <div className="flex gap-4 mt-6 ml-20">
        <button
          className={`py-2 px-4 rounded ${filter === 'all' ? 'bg-bg text-txt' : 'bg-gray-200'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`py-2 px-4 rounded ${filter === 'berat' ? 'bg-bg text-txt' : 'bg-gray-200'}`}
          onClick={() => setFilter('berat')}
        >
          Makanan Berat
        </button>
        <button
          className={`py-2 px-4 rounded ${filter === 'ringan' ? 'bg-bg text-txt' : 'bg-gray-200'}`}
          onClick={() => setFilter('ringan')}
        >
          Makanan Ringan
        </button>
        <button
          className={`py-2 px-4 rounded ${filter === 'dingin' ? 'bg-bg text-txt' : 'bg-gray-200'}`}
          onClick={() => setFilter('dingin')}
        >
          Minuman Dingin
        </button>
        <button
          className={`py-2 px-4 rounded ${filter === 'hangat' ? 'bg-bg text-txt' : 'bg-gray-200'}`}
          onClick={() => setFilter('hangat')}
        >
          Minuman Hangat
        </button>
      </div>

      <div className="p-1 gap-3 grid grid-cols-5 grid-rows-1 ml-20 mr-20 mt-2 font-popins">
        {filteredBySearch.length === 0 ? (
          <p>Tidak Ada Menu...</p>
        ) : (
          filteredBySearch.map((item) => (
            <form key={item.id} className="border-2 rounded border-bg">
              <div className="flex flex-col h-full">
                <img
                  src={item.imageURL}
                  className="rounded object-cover h-56 w-full"
                  alt={item.nama}
                />
                <div className="p-2 flex flex-col justify-between flex-grow">
                  <h1 className="text-lg text-bg">
                    <strong>{item.nama}</strong>
                  </h1>
                  <p className="text-justify text-sm block">{item.description}</p>
                  
                  <div className="mt-auto flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => addToCart(item)} 
                      className="bg-bg text-txt font-medium text-sm p-1 rounded border-bg"
                    >
                      Pesan
                    </button>

                    <span className="font-bold">
                     Rp. {' '} {item.harga.toLocaleString('id-ID', {
                        styles: 'currency',
                        currency: 'IDR',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </form>

          ))
        )}
      </div>
    </div>
  );
};

export default Card;
