import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  BellIcon, BookOpenIcon, PuzzlePieceIcon, HeartIcon, HomeIcon, MagnifyingGlassIcon,
  SparklesIcon, TrophyIcon, UserGroupIcon, XMarkIcon, Bars3Icon, ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import useAuth from "../../hooks/useAuth";
import Button from "../Button";

const navigation = [
  { label: "Home", to: "/home", icon: HomeIcon },
  { label: "Coffee Zoo", to: "/coffee-zoo", icon: MagnifyingGlassIcon },
  { label: "Companion", to: "/coffee-companion", icon: SparklesIcon },
  { label: "MugMates", to: "/mugmates", icon: UserGroupIcon },
  { label: "Recipes", to: "/recipes", icon: BookOpenIcon },
  { label: "Games", to: "/games", icon: PuzzlePieceIcon },
  { label: "Leaderboard", to: "/leaderboard", icon: TrophyIcon },
  { label: "Favorites", to: "/favorites", icon: HeartIcon },
];

const UserMark = ({ user, className = "" }) => (
  user?.profilePicture
    ? <img className={`rounded-full object-cover ${className}`} src={user.profilePicture} alt="Your profile" />
    : <span className={`inline-flex items-center justify-center rounded-full bg-leaf text-sm font-bold text-white ${className}`}>{user?.username?.slice(0, 1).toUpperCase() || "C"}</span>
);

const SidebarContent = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const leave = () => { logout(); navigate("/"); onNavigate?.(); };

  return <div className="flex h-full flex-col">
    <NavLink to="/home" onClick={onNavigate} className="flex items-center gap-3 px-2 py-2">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-espresso text-lg">☕</span>
      <span><span className="font-display text-2xl font-bold text-espresso">Caffeine</span><span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-leaf">Coffee Zoo</span></span>
    </NavLink>
    <nav className="mt-8 space-y-1" aria-label="Main navigation">
      {navigation.map((item) => {
        const NavigationIcon = item.icon;
        return <NavLink key={item.to} to={item.to} onClick={onNavigate} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${isActive ? "bg-espresso text-white shadow-sm" : "text-mocha hover:bg-cream hover:text-espresso"}`}>
          <NavigationIcon className="h-5 w-5" />{item.label}
        </NavLink>;
      })}
    </nav>
    <div className="mt-auto border-t border-sand pt-4">
      <NavLink to="/profile" onClick={onNavigate} className="flex items-center gap-3 rounded-xl p-2 hover:bg-cream">
        <UserMark user={user} className="h-9 w-9" /><span className="min-w-0"><span className="block truncate text-sm font-semibold text-espresso">{user?.username || "Coffee explorer"}</span><span className="block text-xs text-mocha">View profile</span></span>
      </NavLink>
      <Button variant="ghost" className="mt-3 w-full justify-center bg-cream text-espresso shadow-sm hover:bg-sand" onClick={leave}><ArrowLeftOnRectangleIcon className="h-4 w-4" />Log out</Button>
    </div>
  </div>;
};

const AppShell = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  return <div className="min-h-screen w-full bg-oat text-ink">
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-sand bg-white p-4 lg:block"><SidebarContent /></aside>
    {isMenuOpen && <div className="fixed inset-0 z-50 lg:hidden"><button className="absolute inset-0 bg-espresso/30" aria-label="Close navigation" onClick={() => setIsMenuOpen(false)} /><aside className="relative h-full w-72 max-w-[85vw] bg-white p-4 shadow-2xl"><button className="absolute right-4 top-5 rounded-lg p-2 text-espresso hover:bg-cream" aria-label="Close navigation" onClick={() => setIsMenuOpen(false)}><XMarkIcon className="h-5 w-5" /></button><SidebarContent onNavigate={() => setIsMenuOpen(false)} /></aside></div>}
    <main className="min-h-screen w-full min-w-0 lg:pl-64">
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-sand/80 bg-oat/90 px-4 backdrop-blur lg:px-8">
        <button className="rounded-xl p-2 text-espresso hover:bg-cream lg:hidden" aria-label="Open navigation" onClick={() => setIsMenuOpen(true)}><Bars3Icon className="h-6 w-6" /></button>
        <div className="hidden lg:block"><p className="text-xs font-bold uppercase tracking-[0.18em] text-leaf">The coffee zoo experience</p><p className="font-display text-lg font-semibold text-espresso">Good to see you, {user?.username || "explorer"}.</p></div>
        <div className="ml-auto flex items-center gap-2">
          <NavLink to="/notifications" className="relative rounded-xl p-2.5 text-espresso hover:bg-cream" aria-label="Notifications"><BellIcon className="h-5 w-5" /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-terracotta ring-2 ring-oat" /></NavLink>
          <NavLink to="/profile" className="rounded-full"><UserMark user={user} className="h-9 w-9 ring-2 ring-white" /></NavLink>
        </div>
      </header>
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:p-6 lg:p-8"><Outlet /></div>
    </main>
  </div>;
};

export default AppShell;
