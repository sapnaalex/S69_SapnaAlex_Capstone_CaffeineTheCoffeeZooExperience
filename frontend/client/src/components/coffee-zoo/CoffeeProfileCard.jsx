import { Link } from "react-router-dom";
import { ArrowRightIcon, MapPinIcon, SparklesIcon, BookOpenIcon } from "@heroicons/react/24/outline";

const CoffeeProfileCard = ({ profile }) => {
  const companion = profile?.linkedCoffeeCompanion;
  const flavour = profile?.flavourProfile;

  return (
    <Link
      to={`/coffee-zoo/${profile._id}`}
      className="group flex w-full min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-sand bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-leaf sm:p-6"
    >
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          <span className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-xl bg-cream text-2xl" aria-hidden="true">
            ☕
          </span>
          {profile.origin && (
            <span className="inline-flex items-center gap-1 rounded-full bg-cream/70 px-2.5 py-1 text-xs font-semibold text-mocha">
              <MapPinIcon className="h-3.5 w-3.5 text-leaf" aria-hidden="true" />
              <span className="truncate">{profile.origin}</span>
            </span>
          )}
        </div>

        <h2 className="mt-4 break-words font-display text-xl font-bold text-espresso transition group-hover:text-leaf">
          {profile.name}
        </h2>

        <p className="mt-2 line-clamp-3 break-words text-sm leading-6 text-mocha">
          {profile.description}
        </p>

        {(companion || flavour) && (
          <div className="mt-5 space-y-2 border-t border-sand/60 pt-4 text-xs">
            {companion?.CompanionName && (
              <div className="flex items-start gap-1.5 text-leaf">
                <SparklesIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span className="break-words font-semibold">
                  Guide: <span className="font-normal text-ink">{companion.CompanionName}</span>
                </span>
              </div>
            )}
            {flavour?.title && (
              <div className="flex items-start gap-1.5 text-mocha">
                <BookOpenIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sand" aria-hidden="true" />
                <span className="break-words font-semibold">
                  Recipe: <span className="font-normal text-ink">{flavour.title}</span>
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 pt-2">
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-espresso transition group-hover:text-leaf">
          View profile <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
};

export default CoffeeProfileCard;
