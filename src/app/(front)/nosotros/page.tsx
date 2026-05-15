import {
  Leaf,
  ShieldCheck,
  HeartHandshake,
  Target,
  Eye,
  Award,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "Calidad Natural",
    description: "Seleccionamos los mejores productos naturales para tu bienestar.",
  },
  {
    icon: ShieldCheck,
    title: "Confianza",
    description: "Comprometidos con la autenticidad y procedencia de cada producto.",
  },
  {
    icon: HeartHandshake,
    title: "Compromiso",
    description: "Tu salud es nuestra prioridad, brindamos atención personalizada.",
  },
];

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Sobre Nosotros
            </h1>
            <p className="text-lg sm:text-xl text-green-100 max-w-2xl mx-auto">
              Somos una tienda comprometida con tu salud y bienestar, ofreciendo productos naturales de la más alta calidad en Bogotá, Colombia.
            </p>
          </div>
        </div>
      </section>

      {/* Quiénes somos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">¿Quiénes Somos?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              En <strong>Fenapicol Tiendas</strong> nos dedicamos a la comercialización de productos naturales 
              y suplementos para el bienestar integral. Nacimos en Bogotá con la misión de acercar a las 
              personas a un estilo de vida más saludable a través de productos cuidadosamente seleccionados.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Contamos con un equipo apasionado por la salud y la nutrición, listo para asesorarte 
              y ayudarte a encontrar lo que necesitas. Creemos en el poder de la naturaleza y trabajamos 
              con proveedores que comparten nuestros valores de calidad y sostenibilidad.
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Misión</h3>
                  <p className="text-gray-600 text-sm">
                    Proveer productos naturales de excelencia que mejoren la calidad de vida de nuestros clientes, 
                    con un servicio cercano y confiable.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <Eye className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Visión</h3>
                  <p className="text-gray-600 text-sm">
                    Ser la tienda de productos naturales líder en Bogotá, reconocida por nuestra calidad, 
                    compromiso con la salud y responsabilidad ambiental.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nuestros Valores
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow"
                >
                  <div className="inline-flex bg-green-100 p-3 rounded-full mb-4">
                    <Icon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Contáctanos
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="inline-flex bg-green-100 p-3 rounded-full mb-3">
              <MapPin className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Ubicación</h3>
            <p className="text-gray-600 text-sm">Bogotá, Colombia</p>
          </div>
          <div className="text-center">
            <div className="inline-flex bg-green-100 p-3 rounded-full mb-3">
              <Phone className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
            <a
              href="https://wa.me/573132375369"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 text-sm font-medium"
            >
              +57 313 237 5369
            </a>
          </div>
          <div className="text-center">
            <div className="inline-flex bg-green-100 p-3 rounded-full mb-3">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
            <a
              href="mailto:multiservdw@hotmail.com"
              className="text-green-600 hover:text-green-700 text-sm font-medium"
            >
              multiservdw@hotmail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
