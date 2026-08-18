import { Link } from "react-router-dom";
import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";
import useAuth from "../hooks/useAuth";
import useDashboardData from "../hooks/useDashboardData";
import DashboardSection from "../components/dashboard/DashboardSection";
import {
  CoffeeProfilePreview,
  CompanionPreview,
  FavoritesSummary,
  GamePreview,
  PostPreview,
  RecipePreview,
} from "../components/dashboard/DashboardCards";

const emptyProfiles = { isEmpty: (data) => !data?.length, content: { icon: "☕", title: "The Coffee Zoo is quiet", message: "No coffee profiles have been added yet. Check back soon." } };
const emptyRecipes = { isEmpty: (data) => !data?.length, content: { icon: "🥣", title: "No recipes to sip through", message: "Recipes shared by the community will appear here." } };
const emptyPosts = { isEmpty: (data) => !data?.length, content: { icon: "💬", title: "No MugMate posts yet", message: "The latest coffee conversations will appear here." } };
const emptyGames = { isEmpty: (data) => !data?.length, content: { icon: "🎮", title: "No games in the catalog", message: "Available coffee games will appear here." } };
const emptyCompanions = { isEmpty: (data) => !data?.length, content: { icon: "🦜", title: "No companions yet", message: "Coffee companions will appear as they are added to the catalog." } };
const favoriteSummary = { isEmpty: () => false, content: {} };

const Home = () => {
  const { user } = useAuth();
  const dashboard = useDashboardData();

  return <div className="w-full space-y-10 pb-8 sm:space-y-12">
    <section className="relative overflow-hidden rounded-2xl bg-espresso p-6 text-cream shadow-float sm:rounded-3xl sm:px-9 sm:py-10">
      <div className="pointer-events-none absolute right-2 top-2 h-32 w-32 rounded-full bg-leaf/25 blur-2xl sm:h-52 sm:w-52 sm:blur-3xl" aria-hidden="true" />
      <div className="relative max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-sand">Your Coffee Zoo dashboard</p>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-5xl">Welcome back, {user?.username || "coffee explorer"}.</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-sand sm:text-base sm:leading-7">Discover what is brewing across the zoo, save recipes you love, and find your next coffee trail.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link to="/coffee-zoo" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cream px-4 py-2.5 text-sm font-bold text-espresso transition hover:bg-white sm:w-auto">Explore Coffee Zoo <ArrowRightIcon className="h-4 w-4" /></Link>
          <Link to="/coffee-companion" className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cream/25 px-4 py-2.5 text-sm font-bold text-cream transition hover:bg-cream/10 sm:w-auto"><SparklesIcon className="h-4 w-4" />Meet a companion</Link>
        </div>
      </div>
    </section>

    <DashboardSection eyebrow="Discover" title="From the Coffee Zoo" description="A few profiles from the current coffee catalog." action={{ to: "/coffee-zoo", label: "Explore all profiles" }} resource={{ ...dashboard.coffeeProfiles, reload: () => dashboard.reload("coffeeProfiles") }} empty={emptyProfiles}>
      {(profiles) => <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{profiles.slice(0, 3).map((profile) => <CoffeeProfilePreview key={profile._id} profile={profile} />)}</div>}
    </DashboardSection>

    <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1.75fr)_minmax(0,.85fr)] xl:gap-12">
      <DashboardSection className="min-w-0" eyebrow="Community recipes" title="Fresh brews to try" description="Recently shared recipes from the current catalog." action={{ to: "/recipes", label: "Browse recipes" }} resource={{ ...dashboard.recipes, reload: () => dashboard.reload("recipes") }} empty={emptyRecipes}>
        {(recipes) => <div className="grid gap-4 sm:grid-cols-2">{recipes.slice(0, 2).map((recipe) => <RecipePreview key={recipe._id} recipe={recipe} />)}</div>}
      </DashboardSection>
      <DashboardSection className="min-w-0" eyebrow="Your collection" title="Favorites" resource={{ ...dashboard.favorites, reload: () => dashboard.reload("favorites") }} empty={favoriteSummary}>
        {(favorites) => <FavoritesSummary favorites={favorites} />}
      </DashboardSection>
    </div>

    <DashboardSection className="min-w-0" eyebrow="MugMates" title="Latest from the community" description="A preview of recent community conversations." action={{ to: "/mugmates", label: "Visit MugMates" }} resource={{ ...dashboard.posts, reload: () => dashboard.reload("posts") }} empty={emptyPosts}>
      {(posts) => <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{posts.slice(0, 3).map((post) => <PostPreview key={post._id} post={post} />)}</div>}
    </DashboardSection>

    <div className="grid gap-8 xl:grid-cols-2">
      <DashboardSection eyebrow="Play" title="Explore the game catalog" description="Discover available coffee games—no progress or scores are implied." action={{ to: "/games", label: "View games" }} resource={{ ...dashboard.games, reload: () => dashboard.reload("games") }} empty={emptyGames}>
        {(games) => <div className="grid gap-4 sm:grid-cols-2">{games.slice(0, 2).map((game) => <GamePreview key={game._id} game={game} />)}</div>}
      </DashboardSection>
      <DashboardSection eyebrow="Discovery" title="Coffee companions" description="Meet companions currently available in the catalog." action={{ to: "/coffee-companion", label: "See companions" }} resource={{ ...dashboard.companions, reload: () => dashboard.reload("companions") }} empty={emptyCompanions}>
        {(companions) => <div className="grid gap-4 sm:grid-cols-2">{companions.slice(0, 2).map((companion) => <CompanionPreview key={companion._id} companion={companion} />)}</div>}
      </DashboardSection>
    </div>
  </div>;
};

export default Home;
