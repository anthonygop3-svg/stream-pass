import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, DollarSign, Save, Package, Plus, Trash2, ToggleLeft, ToggleRight, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StreamingIcon } from "@/components/StreamingIcon";
import type { Product, ComboPromo } from "@/lib/store";

interface AdminPanelProps {
  products: Product[];
  combos: ComboPromo[];
  onUpdatePrice: (id: string, price: number) => void;
  onAddCombo: (combo: Omit<ComboPromo, "id">) => void;
  onRemoveCombo: (id: string) => void;
  onToggleCombo: (id: string) => void;
}

function formatCOP(value: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(value);
}

export function AdminPanel({ products, combos, onUpdatePrice, onAddCombo, onRemoveCombo, onToggleCombo }: AdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [prices, setPrices] = useState<Record<string, string>>(() =>
    Object.fromEntries(products.map((p) => [p.id, String(p.price)]))
  );

  // Combo form
  const [comboName, setComboName] = useState("");
  const [comboDiscount, setComboDiscount] = useState("10");
  const [comboProducts, setComboProducts] = useState<string[]>([]);

  const handleLogin = () => {
    if (password === "admin123") {
      setAuthenticated(true);
    }
  };

  const handleSavePrice = (id: string) => {
    const val = parseInt(prices[id]);
    if (!isNaN(val) && val > 0) {
      onUpdatePrice(id, val);
    }
  };

  const handleAddCombo = () => {
    if (comboName.trim() && comboProducts.length >= 2) {
      onAddCombo({
        name: comboName,
        productIds: comboProducts,
        discountPercent: parseInt(comboDiscount) || 10,
        active: true,
      });
      setComboName("");
      setComboDiscount("10");
      setComboProducts([]);
    }
  };

  const toggleComboProduct = (id: string) => {
    setComboProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg"
        >
          <Settings size={24} />
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 z-50 overflow-auto bg-background/95 backdrop-blur-md p-4 md:p-8"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="text-primary" /> Panel de Administrador
          </h2>
          <Button variant="outline" onClick={() => { setIsOpen(false); setAuthenticated(false); setPassword(""); }}>
            Cerrar
          </Button>
        </div>

        {!authenticated ? (
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock size={20} /> Acceso Administrador
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full rounded-lg border border-input bg-input p-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button onClick={handleLogin} className="w-full gap-2">
                <Unlock size={16} /> Ingresar
              </Button>
              <p className="text-center text-xs text-muted-foreground">Contraseña: admin123</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Price Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="text-primary" size={20} /> Actualizar Precios
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 rounded-lg border border-border p-4">
                    <StreamingIcon type={product.icon} size={24} />
                    <div className="flex-1">
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-muted-foreground">Actual: {formatCOP(product.price)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={prices[product.id]}
                        onChange={(e) => setPrices((prev) => ({ ...prev, [product.id]: e.target.value }))}
                        className="w-28 rounded-lg border border-input bg-input p-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <Button size="sm" onClick={() => handleSavePrice(product.id)} className="gap-1">
                        <Save size={14} /> Guardar
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Combo Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="text-primary" size={20} /> Crear Combos / Promociones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* New combo form */}
                <div className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-6 space-y-4">
                  <h4 className="font-semibold">Nuevo Combo</h4>
                  <input
                    type="text"
                    placeholder="Nombre del combo (ej: Pack Full)"
                    value={comboName}
                    onChange={(e) => setComboName(e.target.value)}
                    className="w-full rounded-lg border border-input bg-input p-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <div>
                    <p className="mb-2 text-sm text-muted-foreground">Selecciona los productos del combo:</p>
                    <div className="flex flex-wrap gap-3">
                      {products.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => toggleComboProduct(p.id)}
                          className={`flex items-center gap-2 rounded-lg border p-3 transition-all ${
                            comboProducts.includes(p.id)
                              ? "border-primary bg-primary/10"
                              : "border-border bg-card hover:border-muted-foreground"
                          }`}
                        >
                          <StreamingIcon type={p.icon} size={18} />
                          <span className="text-sm font-medium">{p.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-muted-foreground">Descuento (%):</label>
                    <input
                      type="number"
                      min="1"
                      max="90"
                      value={comboDiscount}
                      onChange={(e) => setComboDiscount(e.target.value)}
                      className="w-20 rounded-lg border border-input bg-input p-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <Button onClick={handleAddCombo} className="gap-2" disabled={comboProducts.length < 2 || !comboName.trim()}>
                    <Plus size={16} /> Crear Combo
                  </Button>
                </div>

                {/* Existing combos */}
                {combos.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold">Combos existentes</h4>
                    {combos.map((combo) => (
                      <div key={combo.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1">
                            {combo.productIds.map((pid) => {
                              const p = products.find((pr) => pr.id === pid);
                              return p ? <StreamingIcon key={pid} type={p.icon} size={18} /> : null;
                            })}
                          </div>
                          <div>
                            <p className="font-medium">{combo.name}</p>
                            <Badge variant="secondary" className="text-xs">-{combo.discountPercent}%</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onToggleCombo(combo.id)}
                            className={combo.active ? "text-whatsapp" : "text-muted-foreground"}
                          >
                            {combo.active ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                            <span className="ml-1 text-xs">{combo.active ? "Activo" : "Inactivo"}</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => onRemoveCombo(combo.id)} className="text-destructive">
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </motion.div>
  );
}
