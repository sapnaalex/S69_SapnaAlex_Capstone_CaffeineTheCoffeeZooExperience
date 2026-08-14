const PageLoader = ({ label = "Preparing your coffee trail…" }) => (
  <div className="flex min-h-[42vh] flex-col items-center justify-center gap-4 text-center" role="status">
    <span className="h-10 w-10 animate-spin rounded-full border-4 border-sand border-t-espresso" aria-hidden="true" />
    <p className="text-sm font-medium text-mocha">{label}</p>
  </div>
);

export default PageLoader;
