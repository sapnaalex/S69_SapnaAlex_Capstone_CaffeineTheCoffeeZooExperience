import { Link, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  MapPinIcon,
  SparklesIcon,
  BookOpenIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import useCoffeeProfile from "../hooks/useCoffeeProfile";
import PageLoader from "../components/ui/PageLoader";
import ErrorState from "../components/ui/ErrorState";
import { getApiErrorMessage } from "../api/client";

const CoffeeProfileDetail = () => {
  const { id } = useParams();
  const { profile, isLoading, error, reload } = useCoffeeProfile(id);

  if (isLoading) {
    return (
      <div className="w-full py-12">
        <PageLoader label="Retrieving coffee profile..." />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="mx-auto w-full max-w-2xl py-8 sm:py-12">
        <div className="mb-6">
          <Link
            to="/coffee-zoo"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-espresso hover:text-leaf"
          >
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            Back to Coffee Zoo
          </Link>
        </div>
        <ErrorState
          title="Coffee profile unavailable"
          message={getApiErrorMessage(
            error,
            "We could not find this coffee profile in the catalog."
          )}
          onRetry={reload}
        />
      </div>
    );
  }

  const companion = profile.linkedCoffeeCompanion;
  const flavour = profile.flavourProfile;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 pb-12 sm:space-y-8">
      {/* Navigation Breadcrumb */}
      <div>
        <Link
          to="/coffee-zoo"
          className="inline-flex items-center gap-2 text-sm font-semibold text-espresso hover:text-leaf transition"
        >
          <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          Back to Coffee Zoo Catalog
        </Link>
      </div>

      {/* Hero Header Card */}
      <article className="overflow-hidden rounded-2xl border border-sand bg-white p-5 shadow-card sm:rounded-3xl sm:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-2xl bg-cream text-2xl sm:text-3xl" aria-hidden="true">
            ☕
          </span>
          {profile.origin && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf/10 px-3 py-1 sm:px-3.5 sm:py-1.5 text-xs font-bold uppercase tracking-wider text-leaf">
              <MapPinIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
              {profile.origin}
            </span>
          )}
        </div>

        <h1 className="mt-4 font-display text-2xl font-bold text-espresso sm:mt-6 sm:text-4xl">
          {profile.name}
        </h1>

        <div className="mt-5 border-t border-sand/60 pt-5 sm:mt-6 sm:pt-6">
          <h2 className="text-xs font-bold uppercase tracking-[.18em] text-mocha">
            About this profile
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-ink/90 sm:mt-3 sm:text-lg">
            {profile.description}
          </p>
        </div>
      </article>

      {/* Linked Relationships (Companion & Flavour Recipe) */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Linked Companion Card */}
        <section
          aria-labelledby="companion-heading"
          className="flex flex-col justify-between rounded-2xl border border-leaf/30 bg-leaf p-5 text-white shadow-card sm:rounded-3xl sm:p-8"
        >
          <div>
            <div className="flex items-center gap-2">
              <SparklesIcon className="h-5 w-5 text-sand" aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-[.18em] text-sand">
                Paired Coffee Companion
              </p>
            </div>

            {companion?.CompanionName ? (
              <>
                <h2 id="companion-heading" className="mt-4 font-display text-xl sm:text-2xl font-bold">
                  {companion.CompanionName}
                </h2>
                {companion.personality && (
                  <p className="mt-2.5 text-sm leading-relaxed text-white/90">
                    {companion.personality}
                  </p>
                )}
              </>
            ) : (
              <p className="mt-4 text-sm text-white/80">
                No paired companion details available for this profile.
              </p>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-white/20">
            <Link
              to="/coffee-companion"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-cream hover:text-white transition"
            >
              Meet companions <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* Linked Flavour Recipe Card */}
        <section
          aria-labelledby="recipe-heading"
          className="flex flex-col justify-between rounded-2xl border border-sand bg-white p-5 shadow-card sm:rounded-3xl sm:p-8"
        >
          <div>
            <div className="flex items-center gap-2">
              <BookOpenIcon className="h-5 w-5 text-leaf" aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-[.18em] text-leaf">
                Flavour & Recipe Pairing
              </p>
            </div>

            {flavour?.title ? (
              <>
                <h2 id="recipe-heading" className="mt-4 font-display text-xl sm:text-2xl font-bold text-espresso">
                  {flavour.title}
                </h2>
                {flavour.description && (
                  <p className="mt-2.5 text-sm leading-relaxed text-mocha">
                    {flavour.description}
                  </p>
                )}
                {Array.isArray(flavour.ingredients) && flavour.ingredients.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-espresso">
                      Key Ingredients:
                    </h3>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-mocha">
                      {flavour.ingredients.map((ing, idx) => (
                        <li key={idx} className="break-words">
                          {typeof ing === "string" ? ing : ing?.name || JSON.stringify(ing)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <p className="mt-4 text-sm text-mocha">
                No flavour recipe details linked to this profile.
              </p>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-sand/60">
            <Link
              to="/recipes"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-espresso hover:text-leaf transition"
            >
              Browse all recipes <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CoffeeProfileDetail;
