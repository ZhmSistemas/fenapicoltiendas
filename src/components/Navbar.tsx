"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  LogOut,
  FileText,
  ShoppingCart,
  LayoutDashboardIcon,
} from "lucide-react";
import { useCart } from "@/context/CartContext";


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const { itemCount, cartOpen, setCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`${scrolled ? 'bg-green-700/70 backdrop-blur-md' : 'bg-linear-to-r from-green-600 via-emerald-600 to-teal-600'} text-white sticky top-0 z-50 transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Fenapicol 
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Inicio
              </Link>
              <Link
                href="/nosotros"
                className="hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Nosotros
              </Link>
              <Link
                href="/productos"
                className="hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium "
              >
                Productos
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="relative px-3 mt-4 rounded-md text-sm font-medium"
              >
                <ShoppingCart className="w-5 h-5 hover:text-green-200 hover:scale-125 transition-all cursor-pointer" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center hover:scale-125 transition-all justify-center bg-red-500 text-white text-xs font-bold rounded-full">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>
              {session ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium focus:outline-none transition-colors"
                  >
                    {session.user?.name?.split(" ")[0]}
                    <svg
                      className={`ml-1 h-4 w-4 transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                      <Link
                        href="/usuario/perfil"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Mi Perfil
                      </Link>
                      <div className="border-t border-gray-200"></div>
                      {session.user?.isAdmin ? (
                        <Link
                          href="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Dashboard
                        </Link>
                      ) : (
                        <Link
                          href="/usuario/facturas"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Facturas
                        </Link>
                      )}
                      <div className="border-t border-gray-200"></div>
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          signOut({ callbackUrl: "/auth/login" });
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sesión
                </Link>
              )}
            </div>
          </div>
          <div className="md:hidden relative">
            <button
              onClick={() => setCartOpen(true)}
              className="p-2 rounded-md hover:bg-green-600"
            >
              <ShoppingCart className="w-5 h-5 hover:scale-125 transition-transform" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-green-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Abrir menú</span>
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil tipo ventana flotante */}
      {isOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 flex justify-center mt-2 z-20"
          id="mobile-menu"
        >
          <div className="mx-4 w-full max-w-sm bg-linear-to-r from-green-700 via-emerald-700 to-teal-700 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 overflow-hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {session ? (
                <>
                  <div className="px-3 py-2 text-sm font-medium text-blue-200 border-b border-blue-500/30">
                    Hola, {session.user?.name?.split(" ")[0]}
                  </div>
                  {session.user?.isAdmin ? (
                    <Link
                      href="/dashboard"
                      className="hover:bg-blue-700/50 px-3 py-2 rounded-md text-base font-medium text-white flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <LayoutDashboardIcon className="h-4 w-4" />
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      href="/usuario/facturas"
                      className="hover:bg-blue-700/50 px-3 py-2 rounded-md text-base font-medium text-white flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <FileText className="h-4 w-4" />
                      Mis Facturas
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      signOut({ callbackUrl: "/auth/login" });
                    }}
                    className="w-full text-left hover:bg-blue-700/50 px-3 py-2 rounded-md text-base font-medium text-red-100 flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="hover:bg-blue-700/50 block px-3 py-2 rounded-md text-base font-medium text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Sesión
                </Link>
              )}
            </div>
            <Link
              href="/"
              className="hover:bg-blue-700/50 block px-3 py-2 rounded-md text-base font-medium text-white"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/nosotros"
              className="hover:bg-blue-700/50 block px-3 py-2 rounded-md text-base font-medium text-white"
              onClick={() => setIsOpen(false)}
            >
              Nosotros
            </Link>
            <Link
              href="/productos"
              className="hover:bg-blue-700/50 block px-3 py-2 rounded-md text-base font-medium text-white"
              onClick={() => setIsOpen(false)}
            >
              Productos
            </Link>
            <Link
              href="/carrito"
              className="hover:bg-blue-700/50 block px-3 py-2 rounded-md text-base font-medium text-white"
              onClick={() => setIsOpen(false)}
            >
              Carrito {itemCount > 0 ? `(${itemCount})` : ""}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
