import { Tv, Film, Clapperboard } from "lucide-react";

interface StreamingIconProps {
  type: "netflix" | "prime" | "hbo";
  size?: number;
}

export function StreamingIcon({ type, size = 32 }: StreamingIconProps) {
  const icons = {
    netflix: { Icon: Tv, className: "text-netflix" },
    prime: { Icon: Film, className: "text-prime" },
    hbo: { Icon: Clapperboard, className: "text-hbo" },
  };

  const { Icon, className } = icons[type];
  return <Icon size={size} className={className} />;
}
