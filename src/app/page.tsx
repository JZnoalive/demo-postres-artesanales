"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CakeSlice,
  Clock,
  Star,
  MapPin,
  Sparkles,
  ShoppingBag,
  ArrowUpRight,
  Plus,
  Minus,
} from "lucide-react";
import { POSTRES_DATA } from "@/data/postres";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function PostresProPage() {
  const [cantidades, setCantidades] = useState<Record<string, number>>({
    "torta-chocolate": 1,
  });
  const [cliente, setCliente] = useState("");
  const [direccion, setDireccion] = useState("");
  const [notaDulzor, setNotaDulzor] = useState(false);

  const cambiarCant = (id: string, delta: number) => {
    setCantidades((prev) => {
      const next = Math.max(0, (prev[id] || 0) + delta);
      return { ...prev, [id]: next };
    });
  };

  const itemsSeleccionados = POSTRES_DATA.productos.filter(
    (p) => (cantidades[p.id] || 0) > 0
  );
  const totalUnidades = itemsSeleccionados.reduce(
    (acc, p) => acc + (cantidades[p.id] || 0),
    0
  );
  const subtotal = itemsSeleccionados.reduce(
    (acc, p) => acc + p.precio * (cantidades[p.id] || 0),
    0
  );
  const total = subtotal > 0 ? subtotal + POSTRES_DATA.domicilio : 0;

  const generarLinkPedido = () => {
    const detalle =
      itemsSeleccionados.length > 0
        ? itemsSeleccionados
            .map((p) => {
              const qty = cantidades[p.id] || 0;
              return `• ${qty}x ${p.nombre} ($${(p.precio * qty).toLocaleString("es-CO")})`;
            })
            .join("\n")
        : "• Consultar disponibilidad del día";

    const extra = notaDulzor ? "\n• Preferencia: Dulzor suave / menos dulce" : "";
    const ubi = direccion.trim() ? `\n• Dirección: ${direccion.trim()}` : "";
    const nombre = cliente.trim() || "un cliente";

    const msg = `Hola *${POSTRES_DATA.nombre}*, soy *${nombre}*.\nQuiero pedir:\n${detalle}${extra}${ubi}\nDomicilio: $${POSTRES_DATA.domicilio.toLocaleString(
      "es-CO"
    )}\nTotal: $${total.toLocaleString("es-CO")} COP`;

    return `https://wa.me/${POSTRES_DATA.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5] text-stone-900 selection:bg-rose-600 selection:text-white pb-20">
      <div className="bg-stone-900 text-rose-100 px-4 py-2 text-center text-xs">
        <span className="font-bold text-rose-300">Demo Interactiva · </span>
        Adaptable con el logo, fotos de tus postres, precios y WhatsApp en 24h.
      </div>

      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#FAF7F5]/85 border-b border-stone-200/80">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-600/20">
              <CakeSlice className="w-5 h-5" />
            </div>
            <div>
              <p className="font-black tracking-tight text-sm leading-none">
                {POSTRES_DATA.nombre}
              </p>
              <p className="text-[10px] tracking-widest text-stone-500 mt-0.5">
                {POSTRES_DATA.subnombre}
              </p>
            </div>
          </div>

          <a
            href="#pedido"
            className="px-4 py-2 rounded-full bg-stone-900 hover:bg-rose-600 text-white text-xs font-extrabold transition-colors inline-flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Pedido ({totalUnidades})</span>
          </a>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-5 pt-12 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="lg:col-span-7 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-xs font-bold text-rose-800">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Horneado fresco · Pedidos rápidos por WhatsApp</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] text-stone-950">
            Antojos dulces,{" "}
            <span className="text-rose-600">directo a tu puerta.</span>
          </h1>

          <p className="text-stone-600 text-base sm:text-lg max-w-xl leading-relaxed">
            Arma tu antojo en segundos, mira el total con domicilio al instante y envía tu
            pedido listo sin esperar horas a que te respondan.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <a
              href="#pedido"
              className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm inline-flex items-center gap-2 shadow-xl shadow-rose-600/20 transition-all hover:scale-[1.02]"
            >
              <span>Armar Pedido</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#especiales"
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-stone-100 border border-stone-200 text-sm font-bold transition-colors"
            >
              Ver Especialidades
            </a>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-stone-600 border-t border-stone-200">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <strong className="text-stone-900">{POSTRES_DATA.rating}</strong> ({POSTRES_DATA.totalResenas} reseñas)
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-600" />
              <span>{POSTRES_DATA.ciudad}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-rose-600" />
              <span>{POSTRES_DATA.horario}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0.15}
          className="lg:col-span-5"
        >
          <div className="relative rounded-3xl overflow-hidden border border-stone-200 shadow-2xl aspect-[4/5] bg-stone-200">
            <img
              src={POSTRES_DATA.heroImagen}
              alt="Postres y repostería artesanal"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/15 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl backdrop-blur-md bg-white/90 border border-white/60 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-rose-600 font-black">
                  Domicilio Fijo
                </p>
                <p className="font-bold text-sm text-stone-900">Entrega rápida y segura</p>
              </div>
              <span className="px-3 py-1.5 rounded-xl bg-stone-950 text-white font-black text-xs">
                ${POSTRES_DATA.domicilio.toLocaleString("es-CO")}
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="especiales" className="max-w-6xl mx-auto px-5 py-14 border-t border-stone-200">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-rose-600">
            Vitrina del Día
          </p>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight mt-1 text-stone-950">
            Lo más pedido esta semana
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTRES_DATA.vitrinaEspeciales.map((item, idx) => (
            <motion.a
              key={item.id}
              href="#pedido"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={idx * 0.1}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl overflow-hidden border border-stone-200 bg-white aspect-[4/4] block shadow-sm"
            >
              <img
                src={item.imagen}
                alt={item.titulo}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 className="font-black text-lg group-hover:text-rose-300 transition-colors">
                  {item.titulo}
                </h3>
                <p className="text-xs text-stone-200 mt-0.5">{item.subtitulo}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      <section id="pedido" className="max-w-6xl mx-auto px-5 py-16 border-t border-stone-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-rose-600">
              Paso 1 · Menú
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950">
              Selecciona tus postres
            </h2>

            <div className="space-y-3 pt-2">
              {POSTRES_DATA.productos.map((prod) => {
                const qty = cantidades[prod.id] || 0;
                return (
                  <div
                    key={prod.id}
                    className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center gap-4"
                  >
                    <img
                      src={prod.imagen}
                      alt={prod.nombre}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-100"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-sm sm:text-base text-stone-950 truncate">
                          {prod.nombre}
                        </p>
                        {prod.tag && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-black shrink-0">
                            {prod.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                        {prod.descripcion}
                      </p>
                      <p className="text-xs font-black text-rose-600 mt-1">
                        ${prod.precio.toLocaleString("es-CO")} COP
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => cambiarCant(prod.id, -1)}
                        className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center font-bold cursor-pointer"
                        aria-label={`Quitar ${prod.nombre}`}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-5 text-center text-xs font-black">{qty}</span>
                      <button
                        type="button"
                        onClick={() => cambiarCant(prod.id, 1)}
                        className="w-8 h-8 rounded-xl bg-stone-900 hover:bg-rose-600 text-white flex items-center justify-center font-bold transition-colors cursor-pointer"
                        aria-label={`Agregar ${prod.nombre}`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-stone-200 rounded-3xl p-6 space-y-5 shadow-sm lg:sticky lg:top-24">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-rose-600">
                Paso 2 · Entrega
              </p>
              <h3 className="text-xl font-black text-stone-950 mt-1">Resumen de tu pedido</h3>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-stone-500 mb-1">
                  Tu nombre
                </label>
                <input
                  type="text"
                  placeholder="Ej. Valentina López"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-stone-500 mb-1">
                  Barrio o dirección de entrega
                </label>
                <input
                  type="text"
                  placeholder="Ej. Laureles, Cra 76 # 34-10"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-rose-500"
                />
              </div>
              <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={notaDulzor}
                  onChange={(e) => setNotaDulzor(e.target.checked)}
                  className="rounded accent-rose-600"
                />
                <span>Preferencia de dulzor suave</span>
              </label>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal ({totalUnidades} items)</span>
                <span className="font-bold text-stone-900">
                  ${subtotal.toLocaleString("es-CO")} COP
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Domicilio</span>
                <span className="font-bold text-stone-900">
                  ${subtotal > 0 ? POSTRES_DATA.domicilio.toLocaleString("es-CO") : "0"} COP
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-black text-stone-950">
                <span>Total</span>
                <span className="text-rose-600">${total.toLocaleString("es-CO")} COP</span>
              </div>
            </div>

            <a
              href={generarLinkPedido()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-rose-600/20 transition-all hover:scale-[1.01]"
            >
              <span>Enviar Pedido por WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
