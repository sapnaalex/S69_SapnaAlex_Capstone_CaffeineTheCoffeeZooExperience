import { Link } from "react-router-dom";
import { ArrowRightIcon, HeartIcon, MapPinIcon, UserGroupIcon } from "@heroicons/react/24/outline";

const CardLink = ({ to, children, className = "" }) => (
  <Link to={to} className={`group block w-full min-w-0 overflow-hidden rounded-2xl border border-sand bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-leaf ${className}`}>
    {children}
  </Link>
);

export const CoffeeProfilePreview = ({ profile }) => (
  <CardLink to={`/coffee-zoo/${profile._id}`}>
    <div className="flex items-start justify-between gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-cream text-xl" aria-hidden="true">☕</span>
      {profile.origin && (
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-mocha">
          <MapPinIcon className="h-3.5 w-3.5" />{profile.origin}
        </span>
      )}
    </div>
    <h3 className="mt-4 break-words font-display text-xl font-bold text-espresso">{profile.name}</h3>
    <p className="mt-2 line-clamp-2 break-words text-sm leading-6 text-mocha">{profile.description}</p>
    {profile.linkedCoffeeCompanion?.CompanionName && (
      <p className="mt-4 text-xs font-semibold text-leaf">Paired with {profile.linkedCoffeeCompanion.CompanionName}</p>
    )}
    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-espresso">
      View profile <ArrowRightIcon className="h-4 w-4" />
    </span>
  </CardLink>
);

export const RecipePreview = ({ recipe }) => (
  <CardLink to="/recipes">
    <p className="text-xs font-bold uppercase tracking-[.16em] text-leaf">Recipe</p>
    <h3 className="mt-2 break-words font-display text-xl font-bold text-espresso">{recipe.title}</h3>
    {recipe.description && <p className="mt-2 line-clamp-2 break-words text-sm leading-6 text-mocha">{recipe.description}</p>}
    {recipe.createdBy?.username && <p className="mt-4 text-xs font-semibold text-mocha">Shared by {recipe.createdBy.username}</p>}
  </CardLink>
);

export const PostPreview = ({ post }) => (
  <CardLink to="/mugmates">
    <div className="flex items-center gap-2 text-xs font-semibold text-leaf">
      <UserGroupIcon className="h-4 w-4" />MugMates
    </div>
    <h3 className="mt-3 break-words font-display text-xl font-bold text-espresso">{post.title}</h3>
    <p className="mt-2 line-clamp-3 break-words text-sm leading-6 text-mocha">{post.content}</p>
    {post.createdBy?.username && <p className="mt-4 break-words text-xs font-semibold text-mocha">By {post.createdBy.username}</p>}
  </CardLink>
);

export const GamePreview = ({ game }) => (
  <CardLink to="/games">
    <p className="text-xs font-bold uppercase tracking-[.16em] text-leaf">{game.gameTypes}</p>
    <h3 className="mt-2 font-display text-xl font-bold text-espresso">{game.gameName}</h3>
    <p className="mt-2 line-clamp-2 text-sm leading-6 text-mocha">{game.description}</p>
    <span className="mt-4 inline-flex rounded-full bg-cream px-2.5 py-1 text-xs font-semibold text-espresso">{game.difficultyLevel}</span>
  </CardLink>
);

export const CompanionPreview = ({ companion }) => (
  <CardLink to="/coffee-companion" className="bg-leaf text-white border-leaf hover:border-espresso">
    <p className="text-xs font-bold uppercase tracking-[.16em] text-sand">Coffee companion</p>
    <h3 className="mt-2 font-display text-xl font-bold">{companion.CompanionName}</h3>
    <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/80">{companion.personality}</p>
  </CardLink>
);

export const FavoritesSummary = ({ favorites }) => {
  const recipes = favorites?.recipes || [];
  return (
    <Link to="/favorites" className="flex h-full min-h-[160px] w-full min-w-0 flex-col justify-between overflow-hidden rounded-2xl bg-terracotta p-5 text-white shadow-card transition hover:-translate-y-0.5">
      <div>
        <HeartIcon className="h-6 w-6" />
        <p className="mt-5 text-sm font-semibold text-white/75">Recipe favorites</p>
        <p className="mt-1 font-display text-4xl font-bold">{recipes.length}</p>
      </div>
      <p className="mt-6 break-words text-sm font-semibold">
        {recipes.length ? recipes.slice(0, 2).map((recipe) => recipe.title).join(" · ") : "Build your recipe collection"}
      </p>
    </Link>
  );
};
