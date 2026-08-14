import { Link } from "react-router-dom";
import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  return <section><p className="text-sm font-bold uppercase tracking-[.18em] text-leaf">Your coffee trail</p><h1 className="mt-2 font-display text-4xl font-bold text-espresso sm:text-5xl">Hello, {user?.username || "explorer"}.</h1><p className="mt-3 max-w-xl text-lg text-mocha">The foundations are set. Choose an enclosure to begin exploring as each experience opens.</p>
    <div className="mt-8 grid gap-4 md:grid-cols-3"><Link to="/coffee-zoo" className="rounded-2xl bg-espresso p-6 text-cream shadow-card transition hover:-translate-y-0.5"><span className="text-3xl">🦁</span><h2 className="mt-5 font-display text-2xl font-bold">Coffee Zoo</h2><p className="mt-2 text-sm text-sand">Discover the personalities behind the beans.</p><span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold">Explore <ArrowRightIcon className="h-4 w-4" /></span></Link><Link to="/coffee-companion" className="rounded-2xl bg-leaf p-6 text-white shadow-card transition hover:-translate-y-0.5"><SparklesIcon className="h-8 w-8" /><h2 className="mt-5 font-display text-2xl font-bold">Coffee Companion</h2><p className="mt-2 text-sm text-white/75">Meet a guide for your discovery trail.</p><span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold">Meet companions <ArrowRightIcon className="h-4 w-4" /></span></Link><Link to="/mugmates" className="rounded-2xl bg-white p-6 text-espresso shadow-card ring-1 ring-sand transition hover:-translate-y-0.5"><span className="text-3xl">☕</span><h2 className="mt-5 font-display text-2xl font-bold">MugMates</h2><p className="mt-2 text-sm text-mocha">Find fellow coffee lovers and their stories.</p><span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold">See the community <ArrowRightIcon className="h-4 w-4" /></span></Link></div>
  </section>;
};

export default Home;
