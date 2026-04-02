import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingBag, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StreamingIcon } from "@/components/StreamingIcon";
import type { CartItem, ComboPromo } from "@/lib/store";

interface CartSectionProps {
  cart: CartItem[];
  total: number;
  combo: ComboPromo | null;
  onRemove: (productId: string) => void;
  onClear: () => void;
  whatsappNumber: string;
}

function formatCOP(value: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(value);
}

export function CartSection({ cart, total, combo, onRemove, onClear, whatsappNumber }: CartSectionProps) {
  const buildWhatsAppMessage = () => {
    let msg = "¡Hola! Me interesa comprar:\n\n";
    cart.forEach((item) => {
      msg += `• ${item.name || item.product.name} x${item.quantity} - ${formatCOP(item.product.price * item.quantity)}\n`;
    });
    if (combo) {
      msg += `\n🎁 Combo aplicado: ${combo.name} (-${combo.discountPercent}%)\n`;
    }
    msg += `\n💰 Total: ${formatCOP(total)}`;
    return encodeURIComponent(msg);
  };

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${buildWhatsAppMessage()}`;

  return (
    <section id="carrito" className="px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">
          <ShoppingBag className="mr-2 inline-block text-primary" size={32} />
          Tu <span className="text-gradient">Carrito</span>
        </h2>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-dashed border-muted p-12 text-center"
          >
            <ShoppingBag size={48} className="mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground">Tu carrito está vacío</p>
            <p className="mt-1 text-sm text-muted-foreground/70">Agrega productos para continuar</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
                >
                  <div className="flex items-center gap-3">
                    <StreamingIcon type={item.product.icon} size={24} />
                    <div>
                      <p className="font-semibold">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">x{item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold">{formatCOP(item.product.price * item.quantity)}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemove(item.product.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <X size={18} />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {combo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl border border-primary/30 bg-primary/5 p-3 text-center"
              >
                <Badge className="bg-primary text-primary-foreground">
                  🎁 Combo: {combo.name} (-{combo.discountPercent}%)
                </Badge>
              </motion.div>
            )}

            <div className="mt-6 rounded-xl bg-surface p-6">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-2xl text-primary">{formatCOP(total)}</span>
              </div>

              <div className="mt-4 flex gap-3">
                <Button variant="outline" onClick={onClear} className="gap-2">
                  <Trash2 size={16} />
                  Vaciar
                </Button>
                <Button asChild className="flex-1 gap-2 bg-whatsapp text-primary-foreground hover:bg-whatsapp/90 glow-whatsapp">
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={18} />
                    Pedir por WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
