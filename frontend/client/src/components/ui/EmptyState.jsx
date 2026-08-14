const EmptyState = ({ icon = "☕", title, message }) => (
  <div className="rounded-2xl border border-dashed border-sand bg-cream/55 p-8 text-center">
    <span className="text-3xl" aria-hidden="true">{icon}</span>
    <h2 className="mt-3 font-display text-xl font-semibold text-espresso">{title}</h2>
    <p className="mx-auto mt-2 max-w-md text-sm text-mocha">{message}</p>
  </div>
);

export default EmptyState;
