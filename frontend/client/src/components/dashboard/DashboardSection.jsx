import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { getApiErrorMessage } from "../../api/client";
import ErrorState from "../ui/ErrorState";
import EmptyState from "../ui/EmptyState";

const LoadingCards = ({ count = 3 }) => (
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Loading content">
    {Array.from({ length: count }, (_, index) => (
      <div key={index} className="h-44 animate-pulse rounded-2xl bg-cream" />
    ))}
  </div>
);

const DashboardSection = ({ eyebrow, title, description, action, resource, empty, children, className = "" }) => {
  const content = () => {
    if (resource.isLoading) return <LoadingCards />;
    if (resource.error) return <ErrorState message={getApiErrorMessage(resource.error, `We could not load ${title.toLowerCase()}.`)} onRetry={() => resource.reload()} />;
    if (empty.isEmpty(resource.data)) return <EmptyState {...empty.content} />;
    return children(resource.data);
  };

  return (
    <section className={`min-w-0 w-full ${className}`} aria-labelledby={`${title.toLowerCase().replaceAll(" ", "-")}-heading`}>
      <div className="mb-4 flex flex-col gap-2 sm:mb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-leaf">{eyebrow}</p>
          <h2 id={`${title.toLowerCase().replaceAll(" ", "-")}-heading`} className="mt-1 font-display text-xl font-bold text-espresso sm:text-2xl">{title}</h2>
          {description && <p className="mt-1 text-sm text-mocha">{description}</p>}
        </div>
        {action && (
          <Link to={action.to} className="inline-flex items-center gap-1 text-sm font-semibold text-espresso underline decoration-leaf underline-offset-4">
            {action.label}<ArrowRightIcon className="h-4 w-4" />
          </Link>
        )}
      </div>
      {content()}
    </section>
  );
};

export default DashboardSection;
