import Button from "../Button";

const ErrorState = ({ title = "That trail went quiet", message = "Please try again in a moment.", onRetry }) => (
  <div className="rounded-2xl border border-terracotta/20 bg-terracotta/5 p-6 text-center">
    <h2 className="font-display text-xl font-semibold text-espresso">{title}</h2>
    <p className="mx-auto mt-2 max-w-md text-sm text-mocha">{message}</p>
    {onRetry && <Button variant="secondary" className="mt-4" onClick={onRetry}>Try again</Button>}
  </div>
);

export default ErrorState;
