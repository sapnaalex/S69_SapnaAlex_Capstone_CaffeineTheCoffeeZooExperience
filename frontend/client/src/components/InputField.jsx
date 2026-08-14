const InputField = ({ label, id, error, className = "", ...props }) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="text-sm font-semibold text-espresso">{label}</label>
    <input
      id={id}
      className={`w-full rounded-xl border border-sand bg-white px-3.5 py-2.5 text-ink outline-none transition placeholder:text-mocha/55 focus:border-leaf focus:ring-4 focus:ring-leaf/10 ${className}`}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined}
      {...props}
    />
    {error && <p id={`${id}-error`} className="text-sm text-terracotta">{error}</p>}
  </div>
);

export default InputField;
