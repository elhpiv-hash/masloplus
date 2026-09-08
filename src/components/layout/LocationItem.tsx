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
      <p className="font-medium text-foreground">{location.addressStreet}</p>
      <div className="mt-1 flex flex-col gap-0.5">
        {location.phones.map((phone) => (
          <a
            key={phone.tel}
            href={`tel:${phone.tel}`}
            className="w-fit rounded text-sm text-muted-foreground transition-colors hover:text-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {phone.display}
          </a>
        ))}
      </div>
      {showHours && (
        <p className={cn("mt-1 text-xs text-muted-foreground")}>
          {location.hours.weekdays} · {location.hours.weekend}
        </p>
      )}
    </div>
  );
}
