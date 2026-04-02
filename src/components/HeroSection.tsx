import { motion } from "framer-motion";
import { Zap, ShoppingCart, Shield } from "lucide-react";

export function HeroSection() {
  return (
    <section className="gradient-hero relative overflow-hidden py-20 px-4 md:py-32">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-80 w-80 rounded-full bg-netflix/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-hbo/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-prime/5 blur-3xl" />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
            Tu entretenimiento,{" "}
            <span className="text-gradient">un solo lugar</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Accede a <strong className="text-netflix">Netflix</strong>,{" "}
            <strong className="text-prime">Prime Video</strong> y{" "}
            <strong className="text-hbo">HBO Max</strong> al mejor precio.
            Cuentas verificadas, activación inmediata y soporte 24/7 por
            WhatsApp.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {[
            { icon: Zap, label: "Activación inmediata" },
            { icon: ShoppingCart, label: "Compra fácil" },
            { icon: Shield, label: "100% seguro" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-muted-foreground">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Icon size={20} className="text-primary" />
              </div>
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
