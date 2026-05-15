import Link from "next/link";
import { Phone, Mail, MapPin, Copyright } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Fenapicol Tiendas</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Todo en productos para tu salud y bienestar. Comprometidos con ofrecerte la mejor calidad.
            </p>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Bogotá, Colombia</span>
              </li>
              <li>
                <a
                  href="https://wa.me/573001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-emerald-400 transition-colors"
                >
                  <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>+57 313 2375369</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contacto@fenapicoltiendas.com"
                  className="flex items-center gap-2 text-sm hover:text-emerald-400 transition-colors"
                >
                  <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>multiservdw@hotmail.com</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Inicio
                </Link>
              </li>
              {/* <li>
                <Link href="/usuario/facturas" className="hover:text-emerald-400 transition-colors">
                  Mis facturas
                </Link>
              </li> */}
              <li>
                <Link href="/auth/login" className="hover:text-emerald-400 transition-colors">
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="hover:text-emerald-400 transition-colors">
                  Registrarse
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Copyright className="h-4 w-4" />
            {year} Fenapicol Tiendas. Todos los derechos reservados.
          </p>
          <p className="text-sm text-gray-500">
            Bogotá, Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}
