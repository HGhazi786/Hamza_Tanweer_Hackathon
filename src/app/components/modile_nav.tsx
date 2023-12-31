"use client";
import { RiMenu3Line } from "react-icons/ri";
import {RxCross1} from "react-icons/rx"
import {MdAccountCircle} from "react-icons/md"
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import SearchComponent from "./search";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton
} from "@clerk/nextjs";
import DropdownMenu from "./dropdown";


export default function Navbar() {
   const cartValue = useSelector(
     (state: RootState) => state.cart.totalQuantity
   );
  const [isOpen, setIsOpen] = useState(false);
  const [Open, setOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
    setOpen(!open)
  };

  return (
    <main className="navbg font-sans text-orange-50">
      <nav>
        <div className="flex items-center justify-between mrgn">
          <div className=" flex space-x-3">
            <Link href={"/"}>
              <Image src="/logo.png" alt="logo" width={40} height={20} />
            </Link>
          </div>
          <div className="lg:hidden xl:hidden md:hidden block fixed bg-brown p-2 rounded-full bottom-5 right-4">
            <Link
              href="/cart"
              className={`h-8 w-8 rounded-full flex justify-center items-center relative`}
            >
              <span className="flex absolute right-1 top-0 rounded-full bg-red-500 h-3 w-3 justify-center items-center text-white text-xs text-center">
                {cartValue}
              </span>
              <FaShoppingCart className="text-lg text-orange-50" />
            </Link>
          </div>
          <div className="lg:block xl:block md:block hidden">
            <ul className="flex space-x-8 font-normal -tracking-tighter">
              <li className="flex-grow ulanime tracking-wide">
                <Link href={"/"}>Home</Link>
              </li>
              <li className="flex-grow ulanime">
                <Link href={"/about"}>About us</Link>
              </li>
              <li className="flex-grow ulanime">
                <DropdownMenu />
              </li>
              <li className="flex-grow ulanime">
                <Link href={"/contact"}>Contact us</Link>
              </li>
            </ul>
          </div>
          <div className="lg:block xl:block md:block hidden">
            <ul className="flex space-x-8 font-medium text-white font-serif justify-center items-center">
              <li className="flex-grow tracking-wide hover:text-orange-200">
                <SignedIn>
                  {/* Mount the UserButton component */}
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button>
                      <MdAccountCircle className="text-xl" />
                    </button>
                  </SignInButton>
                </SignedOut>
              </li>
              <li>
                <Link href="#" className={`text-lg`}>
                  <SearchComponent />
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className={`h-8 w-8 rounded-full flex justify-center items-center relative`}
                >
                  <span className="flex absolute right-1 top-0 rounded-full bg-red-500 h-3 w-3 justify-center items-center text-white text-xs text-center">
                    {cartValue}
                  </span>
                  <FaShoppingCart className="text-lg" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:hidden xl:hidden md:hidden block cursor-pointer">
            {isOpen ? (
              <div onClick={handleMenuClick}>
                {/* Render RxCross1 */}
                <RxCross1 color="white" className="text-2xl" />
              </div>
            ) : (
              <div onClick={handleMenuClick}>
                {/* Render RiMenu3Line */}
                <RiMenu3Line color="white" className="text-2xl" />
              </div>
            )}
          </div>
        </div>
        <div className="block lg:hidden xl:hidden">
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } lg:flex lg:items-center lg:w-auto w-full`}
          >
            <nav>
              <ul className="flex-cols font-medium text-white font-serif mt-2">
                <li className="flex-grow ulanime tracking-widest">
                  <Link href={"/"}>Home</Link>
                </li>
                <li className="flex-grow ulanime tracking-widest">
                  <Link href={"/about"}>About us</Link>
                </li>
                <li className="flex-grow ulanime tracking-widest">
                  <button
                    onClick={() => setOpen((prevfilter) => !prevfilter)}
                    className="tracking-widest"
                  >
                    Menu
                  </button>
                  {Open && (
                    <div>
                      <Link
                        href="/products/cake"
                        className="block text-orange-50 hover:bg-orange-900 hover:text-white"
                        onClick={handleMenuClick}
                      >
                        Cake
                      </Link>
                      <Link
                        href="/products/cupcake"
                        className="block text-orange-50 hover:bg-orange-900 hover:text-white"
                        onClick={handleMenuClick}
                      >
                        Cupcake
                      </Link>
                      <Link
                        href="/products/biscuit"
                        className="block text-orange-50 hover:bg-orange-900 hover:text-white"
                        onClick={handleMenuClick}
                      >
                        Biscuit
                      </Link>
                      <Link
                        href="/products/doughnut"
                        className="block text-orange-50 hover:bg-orange-900 hover:text-white"
                        onClick={handleMenuClick}
                      >
                        Doughnut
                      </Link>
                      <Link
                        href="/products/bread"
                        className="block text-orange-50 hover:bg-orange-900 hover:text-white"
                        onClick={handleMenuClick}
                      >
                        Bread
                      </Link>
                    </div>
                  )}
                </li>
                <li className="flex-grow ulanime tracking-widest">
                  <Link href={"/contact"}>Contact us</Link>
                </li>
                <li className="flex-grow ulanime tracking-widest">
                  <Link href={"/SignIn"}>Account</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </nav>
    </main>
  );
}
