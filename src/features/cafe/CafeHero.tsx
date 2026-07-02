import type { Cafe } from "../../types/cafe";

type CafeHeroProps = {
  cafe: Cafe;
};

export function CafeHero({ cafe }: CafeHeroProps) {
  return (
    <section className="-mx-5 -mt-6">
      <div className="relative aspect-[4/5] bg-muted">
        <img
          src={cafe.images[0]}
          alt={cafe.name}
          className="h-full w-full object-cover"
        />
        <div className="image-overlay-bottom absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-cream-100/90">
            <span>{cafe.area}</span>
            <span>·</span>
            <span>{cafe.distance}</span>
            <span>·</span>
            <span>{cafe.isOpen ? "영업중" : "영업 종료"}</span>
          </div>
          <h1 className="text-[30px] font-bold leading-10">{cafe.name}</h1>
        </div>
      </div>
    </section>
  );
}
