import { Link } from "react-router-dom";
import EmptyState from "../components/ui/EmptyState";

const FeaturePlaceholder = ({ title, description, icon }) => (
  <section className="mx-auto max-w-2xl py-10 sm:py-16">
    <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf">Caffeine is brewing</p>
    <h1 className="mt-2 font-display text-4xl font-bold text-espresso sm:text-5xl">{title}</h1>
    <p className="mt-4 text-lg leading-8 text-mocha">{description}</p>
    <div className="mt-8"><EmptyState icon={icon} title="This enclosure opens next" message="The secure navigation, session handling, loading, error, and empty-state foundations are ready. The feature experience follows in the next phase." /></div>
    <Link to="/home" className="mt-6 inline-flex text-sm font-semibold text-espresso underline decoration-leaf underline-offset-4">Back to home</Link>
  </section>
);

export default FeaturePlaceholder;
