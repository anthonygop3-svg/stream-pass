import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProductGrid } from "@/components/ProductGrid";
import { CartSection } from "@/components/CartSection";
import { WhatsAppSection } from "@/components/WhatsAppSection";
import { AdminPanel } from "@/components/AdminPanel";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "StreamZone - Netflix, Prime Video y HBO Max al mejor precio" },
      { name: "description", content: "Compra cuentas de streaming verificadas: Netflix, Prime Video y HBO Max. Activación inmediata, precios económicos y soporte por WhatsApp." },
    ],
  }),
});

const WHATSAPP_NUMBER = "573225248913";

function Index() {
  const {
    products,
    cart,
    combos,
    updatePrice,
    addToCart,
    removeFromCart,
    clearCart,
    addCombo,
    removeCombo,
    toggleCombo,
    getCartTotal,
    addComboToCart,
  } = useStore();

  const { total, combo } = getCartTotal();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProductGrid
        products={products}
        combos={combos}
        onAddToCart={addToCart}
        onAddComboToCart={addComboToCart}
      />
      <CartSection
        cart={cart}
        total={total}
        combo={combo}
        onRemove={removeFromCart}
        onClear={clearCart}
        whatsappNumber={WHATSAPP_NUMBER}
      />
      <WhatsAppSection whatsappNumber={WHATSAPP_NUMBER} />
      <AdminPanel
        products={products}
        combos={combos}
        onUpdatePrice={updatePrice}
        onAddCombo={addCombo}
        onRemoveCombo={removeCombo}
        onToggleCombo={toggleCombo}
      />

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>© 2026 StreamZone. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
