import { Tv, ShoppingCart, MessageCircle } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Tv className="text-primary" size={24} />
          <span className="text-lg font-bold">StreamZone</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#productos" className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline">
            Productos
          </a>
          <a href="#carrito" className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline">
            <ShoppingCart size={16} className="mr-1 inline" />
            Carrito
          </a>
          <a href="#contacto" className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline">
            <MessageCircle size={16} className="mr-1 inline" />
            Contacto
          </a>
        </div>
      </div>
    </nav>
  );
}
