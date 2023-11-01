import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

const Header = () => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event) => {
    try {
      if (wrapperRef && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="flex justify-between py-[9px]">
        <div className="flex gap-1 md:gap-[23px] items-center">
          <Link href="/">
            <p className='text-primary text-xl font-bold'>Worth.so</p>
          </Link>
        </div>
        <div className="flex gap-2 md:gap-4 items-center">
          <div className="relative text-md text-primary font-bold">
            <div
              ref={wrapperRef}
              className="flex items-center gap-4 px-6 h-10 text-primary border border-primary text-sm font-bold rounded-md cursor-pointer"
            >
              <p>
                Sign in with Google
              </p>
            </div>
            <div
              className={clsx(
                "absolute right-0 my-2 z-10 rounded-xl shadow bg-white border border-gray-400",
                showDropdown === false ? "hidden" : ""
              )}
            >
              <div
                className="flex gap-2 items-center px-4 py-3 cursor-pointer hover:bg-gray-300"
                onClick={() => setOpen(true)}
              >
                <p>Add my SaaS</p>
              </div>
              <div
                className="flex gap-2 items-center px-4 py-3 cursor-pointer rounded-b-xl hover:bg-gray-300"
              >
                <p>signOut</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
