import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Ban,
  CalendarDays,
  Check,
  MapPin,
  Star,
} from "lucide-react";
import EditDestinationModal from "@/components/destinations/EditDestinationModal";
import IDestination from "@/type/destinationsType";
import DeleteDestinationModal from "@/components/destinations/DeleteDestinationModal";

// The API doesn't have a highlights field yet, so we turn the
// description clauses into bullet points: "Relax on Bali's beaches,
// explore ancient temples, and enjoy sunsets." -> 3 highlights.
const getHighlights = (description: string) =>
  description
    .split(/,\s*(?:and\s+)?/)
    .map((clause) => clause.trim().replace(/\.$/, ""))
    .filter(Boolean)
    .map((clause) => clause[0].toUpperCase() + clause.slice(1));

const perks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

const DestinationDetailsPage = async ({
  params,
}: {params : Promise<{id: string}>}) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:8000/destination/${id}`);
  const destination: IDestination = await res.json();
  console.log(destination);


  const highlights = getHighlights(destination.description);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/destinations"
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Destinations
        </Link>

        <div className="flex items-center gap-2">
          <EditDestinationModal destination={destination} />
          <DeleteDestinationModal destination={destination}></DeleteDestinationModal>
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-8" />

      {/* Hero image */}
      <div className="overflow-hidden rounded-sm">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          width={1400}
          height={650}
          className="h-72 w-full object-cover sm:h-[480px]"
        />
      </div>

      {/* Content */}
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Left: details */}
        <div>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3.5" />
            {destination.country}
          </p>
          <h1 className="mt-2 text-4xl font-serif sm:text-5xl">
            {destination.name}
          </h1>

          <div className="mt-3 flex items-center gap-4 text-sm">
            <p className="flex items-center gap-1.5">
              <Star className="size-4 fill-emerald-600 text-emerald-600" />
              <span className="font-semibold">4.9</span>
              <span className="text-muted-foreground">(234 reviews)</span>
            </p>
            <p className="flex items-center gap-1.5">
              <CalendarDays className="size-4 text-muted-foreground" />
              {destination.duration}
            </p>
          </div>

          <h2 className="mt-8 text-2xl font-medium">Overview</h2>
          <p className="mt-3 max-w-2xl text-sm/relaxed text-muted-foreground">
            {destination.description}
          </p>

          <h2 className="mt-8 text-2xl font-medium">Highlights</h2>
          <ul className="mt-4 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: booking card */}
        <aside>
          <div className="rounded-lg border border-border bg-white p-5">
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p className="mt-1 text-4xl font-semibold text-[#14b8b0]">
              ${destination.price.toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">per person</p>

            <input
              type="date"
              defaultValue={destination.departureDate}
              readOnly
              className="mt-5 w-full rounded-md bg-muted px-3 py-2.5 text-sm text-muted-foreground"
            />

            <button
              type="button"
              className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#14b8b0] px-6 text-sm font-semibold text-white uppercase tracking-wide hover:bg-[#0fa39c]"
            >
              Book Now
              <ArrowRight className="size-4" />
            </button>

            <div className="mt-5 border-t border-border pt-5" />

            <ul className="grid gap-2.5 text-sm">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2.5">
                  <Check className="size-4 shrink-0 text-emerald-600" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default DestinationDetailsPage;
