const styles = {
  primary: "bg-espresso text-white hover:bg-espresso-light focus-visible:outline-espresso",
  secondary: "bg-white text-espresso ring-1 ring-inset ring-sand hover:bg-cream focus-visible:outline-espresso",
  ghost: "text-espresso hover:bg-cream focus-visible:outline-espresso",
};

const Button = ({ children, className = "", variant = "primary", isLoading = false, disabled = false, ...props }) => (
  <button
    className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" aria-hidden="true" />}
    {children}
  </button>
);

export default Button;
