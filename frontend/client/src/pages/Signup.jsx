import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { getApiErrorMessage } from "../api/client";
import useAuth from "../hooks/useAuth";
import { AuthFrame } from "./Login";

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", emailID: "", password: "", confirmPassword: "" });
  const [error, setError] = useState(""); const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth(); const navigate = useNavigate();
  const update = (field) => (event) => setFormData({ ...formData, [field]: event.target.value });
  const submit = async (event) => {
    event.preventDefault();
    if (!formData.username.trim() || !formData.emailID.trim() || !formData.password) { setError("Complete every field to join the zoo."); return; }
    if (formData.password !== formData.confirmPassword) { setError("Your passwords do not match."); return; }
    setIsSubmitting(true); setError("");
    try { await register({ username: formData.username, emailID: formData.emailID, password: formData.password }); toast.success("Your Caffeine account is ready."); navigate("/home", { replace: true }); }
    catch (signupError) { setError(getApiErrorMessage(signupError, "We could not create your account.")); }
    finally { setIsSubmitting(false); }
  };
  return <AuthFrame title="Join the zoo" subtitle="Start a coffee trail made for your taste."><form className="space-y-4" onSubmit={submit} noValidate>
    <InputField label="Username" id="username" autoComplete="username" value={formData.username} onChange={update("username")} placeholder="Coffee explorer" required />
    <InputField label="Email" id="emailID" type="email" autoComplete="email" value={formData.emailID} onChange={update("emailID")} placeholder="you@example.com" required />
    <InputField label="Password" id="password" type="password" autoComplete="new-password" value={formData.password} onChange={update("password")} placeholder="Create a password" required />
    <InputField label="Confirm password" id="confirmPassword" type="password" autoComplete="new-password" value={formData.confirmPassword} onChange={update("confirmPassword")} placeholder="Repeat your password" required />
    {error && <p className="text-sm text-terracotta" role="alert">{error}</p>}<Button type="submit" className="w-full" isLoading={isSubmitting}>Create account</Button>
  </form><p className="mt-6 text-center text-sm text-mocha">Already a member? <Link className="font-semibold text-espresso underline decoration-leaf underline-offset-4" to="/login">Log in</Link></p></AuthFrame>;
};

export default Signup;
