import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { getApiErrorMessage } from "../api/client";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [formData, setFormData] = useState({ emailID: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state?.from?.pathname || "/home";

  const submit = async (event) => {
    event.preventDefault();
    if (!formData.emailID.trim() || !formData.password) { setError("Enter your email and password."); return; }
    setIsSubmitting(true); setError("");
    try { await login(formData); toast.success("Welcome back to Caffeine."); navigate(destination, { replace: true }); }
    catch (loginError) { setError(getApiErrorMessage(loginError, "We could not log you in.")); }
    finally { setIsSubmitting(false); }
  };

  return <AuthFrame title="Welcome back" subtitle="Your coffee trail is ready when you are."><form className="space-y-4" onSubmit={submit} noValidate>
    <InputField label="Email" id="emailID" type="email" autoComplete="email" value={formData.emailID} onChange={(event) => setFormData({ ...formData, emailID: event.target.value })} placeholder="you@example.com" required />
    <InputField label="Password" id="password" type="password" autoComplete="current-password" value={formData.password} onChange={(event) => setFormData({ ...formData, password: event.target.value })} placeholder="Your password" required />
    {error && <p className="text-sm text-terracotta" role="alert">{error}</p>}<Button type="submit" className="w-full" isLoading={isSubmitting}>Log in</Button>
  </form><p className="mt-6 text-center text-sm text-mocha">New to Caffeine? <Link className="font-semibold text-espresso underline decoration-leaf underline-offset-4" to="/signup">Create an account</Link></p></AuthFrame>;
};

export const AuthFrame = ({ title, subtitle, children }) => <main className="grid min-h-screen bg-oat lg:grid-cols-2"><section className="hidden bg-espresso p-10 text-cream lg:flex lg:flex-col lg:justify-between"><Link to="/" className="font-display text-3xl font-bold">Caffeine</Link><div><p className="text-sm font-bold uppercase tracking-[.2em] text-sand">The coffee zoo experience</p><h1 className="mt-4 max-w-md font-display text-5xl font-bold leading-tight">Find the coffee that feels like you.</h1></div><p className="text-sm text-sand">A warmer way to discover, share, and play with coffee.</p></section><section className="flex items-center justify-center px-5 py-10 sm:px-8"><div className="w-full max-w-md"><Link to="/" className="font-display text-2xl font-bold text-espresso lg:hidden">Caffeine</Link><div className="mt-8 rounded-3xl border border-sand bg-white p-6 shadow-float sm:p-8"><p className="text-sm font-bold uppercase tracking-[.16em] text-leaf">Caffeine</p><h1 className="mt-2 font-display text-3xl font-bold text-espresso">{title}</h1><p className="mt-2 text-sm leading-6 text-mocha">{subtitle}</p><div className="mt-7">{children}</div></div></div></section></main>;

export default Login;
