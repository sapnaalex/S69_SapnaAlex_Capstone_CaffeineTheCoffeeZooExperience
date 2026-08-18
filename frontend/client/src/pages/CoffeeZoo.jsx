import { useMemo, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import useCoffeeProfiles from "../hooks/useCoffeeProfiles";
import CoffeeProfileCard from "../components/coffee-zoo/CoffeeProfileCard";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";
import Button from "../components/Button";
import { getApiErrorMessage } from "../api/client";

const SkeletonGrid = ({ count = 6 }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6" aria-label="Loading coffee profiles">
    {Array.from({ length: count }, (_, index) => (
      <div key={index} className="flex h-64 animate-pulse flex-col justify-between rounded-2xl bg-cream/70 p-5 sm:p-6 border border-sand/40">
        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="h-10 w-10 rounded-xl bg-sand/50" />
            <div className="h-5 w-20 rounded-full bg-sand/40" />
          </div>
          <div className="h-6 w-3/4 rounded-lg bg-sand/60" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-sand/40" />
            <div className="h-4 w-5/6 rounded bg-sand/40" />
          </div>
        </div>
        <div className="h-4 w-28 rounded bg-sand/50" />
      </div>
    ))}
  </div>
);

const CoffeeZoo = () => {
  const { profiles, isLoading, error, reload } = useCoffeeProfiles();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProfiles = useMemo(() => {
    if (!profiles) return [];
    const query = searchQuery.trim().toLowerCase();
    if (!query) return profiles;
    return profiles.filter((p) => {
      const nameMatch = p.name?.toLowerCase().includes(query);
      const originMatch = p.origin?.toLowerCase().includes(query);
      return nameMatch || originMatch;
    });
  }, [profiles, searchQuery]);

  return (
    <div className="w-full space-y-6 pb-12 sm:space-y-8">
      {/* Page Header */}
      <header className="relative overflow-hidden rounded-2xl bg-espresso p-6 text-cream shadow-float sm:rounded-3xl sm:px-9 sm:py-10">
        <div className="pointer-events-none absolute right-2 top-2 h-32 w-32 rounded-full bg-leaf/25 blur-2xl sm:h-52 sm:w-52 sm:blur-3xl" aria-hidden="true" />
        <div className="relative max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-sand">The Coffee Zoo</p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-5xl">
            Coffee Profile Catalog
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-sand sm:text-base sm:leading-7">
            Explore authentic coffee profiles from across the globe, each paired with its companion guide and distinctive recipe pairing.
          </p>
        </div>
      </header>

      {/* Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <label htmlFor="coffee-search" className="sr-only">
            Search coffee profiles by name or origin
          </label>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-mocha">
            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <input
            id="coffee-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by coffee name or origin..."
            className="w-full rounded-xl border border-sand bg-white py-2.5 pl-10 pr-10 text-sm text-ink outline-none transition placeholder:text-mocha/60 focus:border-leaf focus:ring-4 focus:ring-leaf/10"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-mocha hover:text-espresso"
              aria-label="Clear search query"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          )}
        </div>

        {profiles && !isLoading && !error && (
          <p className="text-xs font-semibold text-mocha">
            {searchQuery ? (
              <span>
                Found <strong className="text-espresso">{filteredProfiles.length}</strong> of {profiles.length} profiles
              </span>
            ) : (
              <span>
                Total <strong className="text-espresso">{profiles.length}</strong> coffee profiles
              </span>
            )}
          </p>
        )}
      </div>

      {/* Main Content Area with States */}
      <main aria-label="Coffee profiles listing">
        {isLoading && <SkeletonGrid />}

        {error && (
          <ErrorState
            title="Unable to load Coffee Zoo"
            message={getApiErrorMessage(error, "We encountered an error loading the coffee catalog. Please try again.")}
            onRetry={reload}
          />
        )}

        {!isLoading && !error && profiles?.length === 0 && (
          <EmptyState
            icon="☕"
            title="The Coffee Zoo is quiet"
            message="No coffee profiles have been added to the catalog yet. Check back soon."
          />
        )}

        {!isLoading && !error && profiles?.length > 0 && filteredProfiles.length === 0 && (
          <div className="space-y-4">
            <EmptyState
              icon="🔍"
              title="No profiles match your search"
              message={`No coffee profiles found matching "${searchQuery}". Try searching by a different name or origin.`}
            />
            <div className="text-center">
              <Button variant="secondary" onClick={() => setSearchQuery("")}>
                Clear search filter
              </Button>
            </div>
          </div>
        )}

        {!isLoading && !error && filteredProfiles.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {filteredProfiles.map((profile) => (
              <CoffeeProfileCard key={profile._id} profile={profile} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CoffeeZoo;
