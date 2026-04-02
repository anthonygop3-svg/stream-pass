import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StreamingIcon } from "@/components/StreamingIcon";
import type { Product, ComboPromo } from "@/lib/store";

interface ProductGridProps {
  products: Product[];
  combos: ComboPromo[];
  onAddToCart: (product: Product) => void;
  onAddComboToCart: (combo: ComboPromo) => void;
}

const glowClass = {
  netflix: "glow-netflix",
  prime: "glow-prime",
  hbo: "glow-hbo",
};

const borderClass = {
  netflix: "border-netflix/30",
  prime: "border-prime/30",
  hbo: "border-hbo/30",
};

const bgClass = {
  netflix: "bg-netflix/10",
  prime: "bg-prime/10",
  hbo: "bg-hbo/10",
};

function formatCOP(value: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(value);
}

export function ProductGrid({ products, combos, onAddToCart, onAddComboToCart }: ProductGridProps) {
  const activeCombos = combos.filter((c) => c.active);

  return (
    <section id="productos" className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-2 text-center text-3xl font-bold md:text-4xl">
          Nuestros <span className="text-gradient">Productos</span>
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-muted-foreground">
          Elige tu plataforma favorita y disfruta del mejor contenido streaming
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <Card
                className={`group relative overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:${glowClass[product.icon]} ${borderClass[product.icon]}`}
              >
                <div className={`absolute inset-0 ${bgClass[product.icon]} opacity-0 transition-opacity group-hover:opacity-100`} />
                <CardHeader className="relative">
                  <div className="mb-3 flex items-center gap-3">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${bgClass[product.icon]}`}>
                      <StreamingIcon type={product.icon} size={28} />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <Badge variant="secondary" className="mt-1 text-xs">{product.duration}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <p className="mb-4 text-sm text-muted-foreground">{product.description}</p>
                  <p className="text-3xl font-extrabold">{formatCOP(product.price)}</p>
                </CardContent>
                <CardFooter className="relative">
                  <Button
                    className="w-full gap-2"
                    onClick={() => onAddToCart(product)}
                  >
                    <ShoppingCart size={18} />
                    Agregar al carrito
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {activeCombos.length > 0 && (
          <div className="mt-12">
            <h3 className="mb-6 text-center text-2xl font-bold">
              🔥 <span className="text-gradient">Combos en Promoción</span>
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeCombos.map((combo, i) => {
                const comboProducts = products.filter((p) => combo.productIds.includes(p.id));
                const originalTotal = comboProducts.reduce((sum, p) => sum + p.price, 0);
                const discountedTotal = originalTotal * (1 - combo.discountPercent / 100);

                return (
                  <motion.div
                    key={combo.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="relative overflow-hidden border-primary/30 bg-primary/5">
                      <div className="absolute top-0 right-0 rounded-bl-xl bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                        -{combo.discountPercent}%
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{combo.name}</CardTitle>
                        <div className="mt-2 flex gap-2">
                          {comboProducts.map((p) => (
                            <StreamingIcon key={p.id} type={p.icon} size={20} />
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-through">
                          {formatCOP(originalTotal)}
                        </p>
                        <p className="text-2xl font-extrabold text-primary">
                          {formatCOP(discountedTotal)}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="w-full gap-2"
                          onClick={() => onAddComboToCart(combo)}
                        >
                          <ShoppingCart size={18} />
                          Agregar combo
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
