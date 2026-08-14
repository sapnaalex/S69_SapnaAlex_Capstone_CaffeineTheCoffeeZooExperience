import { Link } from "react-router-dom";
import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";
import Button from "../components/Button";

const WelcomePage = () => <main className="min-h-screen overflow-hidden bg-oat text-ink">
  <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
    <Link to="/" className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-espresso text-lg">☕</span><span><span className="block font-display text-2xl font-bold text-espresso">Caffeine</span><span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-leaf">Coffee Zoo</span></span></Link>
    <div className="flex items-center gap-2"><Link className="hidden rounded-xl px-4 py-2 text-sm font-semibold text-espresso hover:bg-cream sm:inline-flex" to="/login">Log in</Link><Link to="/signup"><Button>Join the zoo</Button></Link></div>
  </header>
  <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:py-24">
    <div><div className="inline-flex items-center gap-2 rounded-full bg-leaf/10 px-3 py-1.5 text-sm font-semibold text-leaf"><SparklesIcon className="h-4 w-4" />Coffee discovery, untamed</div>
      <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[.96] tracking-tight text-espresso sm:text-6xl lg:text-7xl">Find your wild side of coffee.</h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-mocha">Caffeine turns coffee discovery into a warm, playful journey—one bean, brew, and MugMate at a time.</p>
      <div className="mt-8 flex flex-wrap gap-3"><Link to="/signup"><Button className="px-5">Start exploring <ArrowRightIcon className="h-4 w-4" /></Button></Link><Link to="/login"><Button variant="secondary">I have an account</Button></Link></div>
      <p className="mt-6 text-sm text-mocha">Designed for curious sippers and serious coffee people.</p>
    </div>
    <div className="relative mx-auto w-full max-w-md"><div className="absolute -inset-5 rounded-[2.5rem] bg-leaf/10 blur-2xl" /><div className="relative rounded-[2rem] border border-white/70 bg-white p-5 shadow-float"><div className="rounded-[1.5rem] bg-espresso p-7 text-cream"><p className="text-sm font-bold uppercase tracking-[.2em] text-sand">Today’s habitat</p><div className="mt-10 flex items-end justify-between"><span className="text-7xl">🦁</span><span className="rounded-2xl bg-cream/10 px-4 py-3 text-right"><span className="block font-display text-xl">Bold & bright</span><span className="text-sm text-sand">Your brew trail awaits</span></span></div></div><div className="grid grid-cols-3 gap-3 pt-5 text-center text-sm font-semibold text-espresso"><span className="rounded-xl bg-cream p-3">Discover</span><span className="rounded-xl bg-cream p-3">Connect</span><span className="rounded-xl bg-cream p-3">Play</span></div></div></div>
  </section>
</main>;

export default WelcomePage;
