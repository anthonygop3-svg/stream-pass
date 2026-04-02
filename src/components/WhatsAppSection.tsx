import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WhatsAppSectionProps {
  whatsappNumber: string;
}

export function WhatsAppSection({ whatsappNumber }: WhatsAppSectionProps) {
  const link = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("¡Hola! Estoy interesado en sus servicios de streaming.")}`;

  return (
    <section id="contacto" className="px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-whatsapp/20 bg-whatsapp/5 p-10"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-whatsapp/20">
            <MessageCircle size={32} className="text-whatsapp" />
          </div>
          <h2 className="text-2xl font-bold md:text-3xl">
            ¿Tienes dudas? <span className="text-whatsapp">¡Escríbenos!</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Contáctanos directamente por WhatsApp para resolver cualquier duda o
            realizar tu pedido de forma rápida y segura.
          </p>
          <Button asChild className="mt-6 gap-2 bg-whatsapp text-primary-foreground hover:bg-whatsapp/90 glow-whatsapp" size="lg">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={20} />
              Ir a WhatsApp
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
