import { Bookmark, Compass, Sparkles, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../../utils/cn";

const tabs = [
  { label: "발견", to: "/home", icon: Compass },
  { label: "AI", to: "/ai", icon: Sparkles, emphasis: true },
  { label: "컬렉션", to: "/collections", icon: Bookmark },
  { label: "MY", to: "/my", icon: User },
];

export function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 border-t border-border bg-surface/95 px-4 pb-[calc(env(safe-area-inset-bottom)+8px)] pt-2 shadow-bottom-nav backdrop-blur">
      <ul className="grid grid-cols-4">
        {tabs.map(({ label, to, icon: Icon, emphasis }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                cn(
                  "relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-semibold transition-colors",
                  isActive ? "text-espresso-700" : "text-espresso-500/60",
                  emphasis && isActive && "text-espresso-800",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative">
                    <Icon size={22} strokeWidth={2} />
                    {emphasis ? (
                      <span
                        className={cn(
                          "absolute -right-1 -top-1 h-2 w-2 rounded-full bg-gold-500",
                          !isActive && "opacity-50",
                        )}
                      />
                    ) : null}
                  </span>
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
