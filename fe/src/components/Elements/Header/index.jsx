
const Header = ({ setSearch,children,pesan }) => {
  const handleSearchChange = (e) => {
    setSearch(e.target.value); 
  };

  return (
    <div className="flex bg-bg text-txt fixed w-full rounded-b-2xl z-50 top-0 justify-between p-4 content-center items-center
    sm:mr-24
          md:w-full
          lg:w-full 
          xl:w-full
    ">
      <h1 className="text-lg font-bold
      sm:text-xl 
      md:text-2xl
      lg:text-2xl
      xl:text-2xl
      ">WaroEng.e dul</h1>
      <form className="group  relative w-1/3
          sm:w-1/2
          md:w-1/2
          lg:w-1/2
          xl:w-1/2
      ">
        <svg
          width="20"
          height="20"
          fill="currentColor"
          className="absolute left-3 top-1/2 -mt-2.5 text-txt pointer-events-none group-focus-within:text-bg"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          />
        </svg>
        <input
          className="focus:ring-2 focus:ring-btn focus:outline-none appearance-none w-full text-sm leading-6 text-bg font-popins placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm
          
          "
          type="text"
          aria-label="Filter menu.e dul"
          placeholder="Filter menu.e dul ..."
          onChange={handleSearchChange} 
        />
      </form>
      <ul className="flex gap-10 text-lg">
        <li>
          {children}
         
        </li>
      </ul>
        
    </div>
  );
};


export default Header;
