import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import { ProtectedRoute, PublicRoute } from "./components/routing/RouteGuards";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WelcomePage from "./pages/WelcomePage";
import FeaturePlaceholder from "./pages/FeaturePlaceholder";

const featureRoutes = [
  { path: "coffee-zoo", title: "Coffee Zoo", icon: "🦁", description: "Browse the coffee-profile catalog from the stabilized API contract." },
  { path: "coffee-zoo/:id", title: "Coffee profile", icon: "☕", description: "A profile detail experience will use the corresponding Coffee Profiles endpoint." },
  { path: "coffee-companion", title: "Coffee Companion", icon: "🦜", description: "Meet the companion records the backend supports—without inventing recommendation logic." },
  { path: "favorites", title: "Favorites", icon: "♥", description: "Your authenticated recipe favorites will live here." },
  { path: "profile", title: "Your profile", icon: "🦊", description: "Profile editing and secure image upload come next." },
  { path: "mugmates", title: "MugMates", icon: "🐒", description: "The post and comment community experience is next on the trail." },
  { path: "recipes", title: "Recipes", icon: "🥣", description: "Browse and create recipes against the repaired recipe API." },
  { path: "recipes/:id", title: "Recipe detail", icon: "☕", description: "A full recipe detail view will follow the shared page patterns." },
  { path: "games", title: "Games", icon: "🎮", description: "The games catalog is ready to become a polished hub." },
  { path: "leaderboard", title: "Leaderboard", icon: "🏆", description: "Ranked entries will appear here using the existing API." },
  { path: "notifications", title: "Notifications", icon: "🔔", description: "Your authenticated notification list will appear here." },
];

const App = () => <BrowserRouter><Routes>
  <Route element={<PublicRoute />}><Route path="/" element={<WelcomePage />} /><Route path="/login" element={<Login />} /><Route path="/signup" element={<Signup />} /></Route>
  <Route element={<ProtectedRoute />}><Route element={<AppShell />}><Route path="/home" element={<Home />} />{featureRoutes.map((route) => <Route key={route.path} path={route.path} element={<FeaturePlaceholder {...route} />} />)}</Route></Route>
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes></BrowserRouter>;

export default App;
