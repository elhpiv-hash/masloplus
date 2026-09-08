import type { Location } from "@/types/site";
import { cn } from "@/lib/cn";

type LocationItemProps = {
  location: Location;
  showHours?: boolean;
  className?: string;
};

/** Один адрес с кликабельными телефонами и (опционально) графиком. Данные — из site.ts. */
export function LocationItem({ location, showHours = false, className }: LocationItemProps) {
  return (
    <div className={className}>
      <p className="font-medium text-ink">{location.addressStreet}</p>
      <div className="mt-1 flex flex-col gap-0.5">
        {location.phones.map((phone) => (
          <a
            key={phone.tel}
            href={`tel:${phone.tel}`}
            className="inline-block w-fit rounded py-0.5 text-sm text-muted transition-colors hover:text-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {phone.display}
          </a>
        ))}
      </div>
      {showHours && (
        <p className={cn("mt-1 text-xs text-muted")}>
          {location.hours.weekdays} · {location.hours.weekend}
        </p>
      )}
    </div>
  );
}
