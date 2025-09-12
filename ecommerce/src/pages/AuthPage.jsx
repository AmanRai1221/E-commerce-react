import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Login-Signup.css";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/products";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (isSignup && !formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (isSignup && formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (isSignup && !formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (isSignup && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    let result;
    if (isSignup) {
      const userData = {
        name: formData.name.trim(),
        email: formData.email,
        password: formData.password,
      };
      result = await signup(userData);
    } else {
      result = await login(formData.email, formData.password);
    }

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setErrors({ general: result.error });
    }

    setLoading(false);
  };

  const toggleForm = (signupMode) => {
    setIsSignup(signupMode);
    setErrors({});
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    });
  };

  return (
    <div className="login-signup">
      <div className="login-signup-container fade-in">
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-content">
            <div className="welcome-icon">🛍️</div>
            <h1 className="welcome-title">
              {isSignup ? "Join Us Today!" : "Welcome Back!"}
            </h1>
            <p className="welcome-subtitle">
              {isSignup
                ? "Create your account and start shopping with exclusive deals and personalized recommendations."
                : "Sign in to your account and continue your shopping journey with us."}
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="form-section">
          <div className="form-header">
            <h2 className="form-title">
              {isSignup ? "Create Account" : "Sign In"}
            </h2>
            <p className="form-subtitle">
              {isSignup
                ? "Fill in your details to get started"
                : "Enter your credentials to continue"}
            </p>
          </div>

          {/* Form Toggle */}
          <div className="form-toggle">
            <button
              type="button"
              className={`toggle-btn ${!isSignup ? "active" : ""}`}
              onClick={() => toggleForm(false)}
            >
              Login
            </button>
            <button
              type="button"
              className={`toggle-btn ${isSignup ? "active" : ""}`}
              onClick={() => toggleForm(true)}
            >
              Sign Up
            </button>
            <div className={`toggle-slider ${isSignup ? "signup" : ""}`}></div>
          </div>

          {/* Error Message */}
          {errors.general && (
            <div className="error-message">{errors.general}</div>
          )}

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Name Field - Only for Signup */}
            {isSignup && (
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input ${
                    errors.name ? "invalid" : formData.name ? "valid" : ""
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <div className="error-message">{errors.name}</div>
                )}
              </div>
            )}

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${
                  errors.email ? "invalid" : formData.email ? "valid" : ""
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>

            {/* Password Field */}
            <div className="form-group password-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-input ${
                  errors.password ? "invalid" : formData.password ? "valid" : ""
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
              {errors.password && (
                <div className="error-message">{errors.password}</div>
              )}
            </div>

            {/* Confirm Password - Only for Signup */}
            {isSignup && (
              <div className="form-group password-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`form-input ${
                    errors.confirmPassword
                      ? "invalid"
                      : formData.confirmPassword
                      ? "valid"
                      : ""
                  }`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <div className="error-message">{errors.confirmPassword}</div>
                )}
              </div>
            )}

            {/* Form Options - Only for Login */}
            {!isSignup && (
              <div className="form-options">
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <label htmlFor="rememberMe">Remember me</label>
                </div>
                <Link to="/forgot-password" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={`submit-btn ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading && <span className="spinner"></span>}
              {loading
                ? isSignup
                  ? "Creating Account..."
                  : "Signing In..."
                : isSignup
                ? "Create Account"
                : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span>or continue with</span>
          </div>

          {/* Social Login */}
          <div className="social-login">
            <button type="button" className="social-btn google">
              <span>📧</span> Google
            </button>
            <button type="button" className="social-btn facebook">
              <span>📘</span> Facebook
            </button>
          </div>

          {/* Terms */}
          {isSignup && (
            <div className="terms">
              By creating an account, you agree to our{" "}
              <Link to="/terms">Terms of Service</Link> and{" "}
              <Link to="/privacy">Privacy Policy</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
