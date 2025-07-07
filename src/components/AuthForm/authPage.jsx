"use client"

import { useState } from "react"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLogin) {
      console.log("Login attempt:", { email: formData.email, password: formData.password })
      alert("Login functionality would be implemented here")
    } else {
      console.log("Signup attempt:", formData)
      alert("Signup functionality would be implemented here")
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setFormData({ name: "", email: "", password: "" })
  }

  const handleSocialLogin = (provider) => {
    console.log(`Social login with ${provider}`)
    alert(`${provider} login would be implemented here`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      {/* Mobile Layout */}
      <div className="block sm:hidden w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Mobile Header with Toggle */}
          <div
            className="p-6 text-center text-white relative"
            style={{
              background: `linear-gradient(135deg, #CC9966 0%, #D4A574 50%, #E6B887 100%)`,
            }}
          >
            <h2 className="text-2xl font-bold mb-2">{isLogin ? "Hello!" : "Welcome!"}</h2>
            <p className="text-sm opacity-90 mb-4">{isLogin ? "Enter your details" : "Login with your info"}</p>
            <button
              onClick={toggleMode}
              className="border-2 border-white text-white font-bold py-2 px-6 rounded-xl hover:bg-white hover:text-amber-700 transition-all duration-300 text-sm"
            >
              {isLogin ? "SIGN UP" : "SIGN IN"}
            </button>
          </div>

          {/* Mobile Form */}
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-1 text-center">
              {isLogin ? "Sign in" : "Create Account"}
            </h3>

            <p className="text-gray-500 text-center mb-6 text-sm">{isLogin ? "Please sign in" : "Create account"}</p>

            {/* Social Login Icons */}
            <div className="flex justify-center space-x-3 mb-6">
              <button
                onClick={() => handleSocialLogin("facebook")}
                className="w-10 h-10 border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-amber-300 hover:bg-amber-50 transition-all duration-300"
              >
                <span className="text-blue-600 font-bold text-lg">f</span>
              </button>
              <button
                onClick={() => handleSocialLogin("google")}
                className="w-10 h-10 border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-amber-300 hover:bg-amber-50 transition-all duration-300"
              >
                <span className="text-red-500 font-bold text-sm">G+</span>
              </button>
              <button
                onClick={() => handleSocialLogin("linkedin")}
                className="w-10 h-10 border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-amber-300 hover:bg-amber-50 transition-all duration-300"
              >
                <span className="text-blue-700 font-bold text-sm">in</span>
              </button>
            </div>

            <p className="text-gray-400 text-center mb-6 text-xs uppercase tracking-wider">or use email</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field (Sign Up Only) */}
              {!isLogin && (
                <div className="transform transition-all duration-300">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:bg-white transition-all duration-300"
                    required={!isLogin}
                  />
                </div>
              )}

              {/* Email Field */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:bg-white transition-all duration-300"
                required
              />

              {/* Password Field */}
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:bg-white transition-all duration-300"
                required
              />

              {/* Forgot Password Link (Login Only) */}
              {isLogin && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => alert("Forgot password functionality would be implemented here")}
                    className="text-gray-400 hover:text-amber-600 text-sm transition-all duration-300"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-105 active:scale-95 mt-6"
                style={{
                  background: `linear-gradient(135deg, #CC9966 0%, #D4A574 50%, #E6B887 100%)`,
                }}
              >
                {isLogin ? "SIGN IN" : "SIGN UP"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:block relative w-full max-w-4xl h-[550px] bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Animated Background Panel */}
        <div
          className={`absolute top-0 w-1/2 h-full bg-gradient-to-br from-amber-200 to-yellow-600 transition-all duration-1000 ease-in-out transform ${
            isLogin ? "right-0 rounded-l-[60px]" : "left-0 rounded-r-[60px]"
          }`}
          style={{
            background: `linear-gradient(135deg, #CC9966 0%, #D4A574 50%, #E6B887 100%)`,
          }}
        >
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 -left-10 w-24 h-24 bg-white/5 rounded-full animate-bounce"></div>
            <div className="absolute bottom-20 right-20 w-16 h-16 bg-white/15 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Form Container */}
        <div
          className={`absolute top-0 w-1/2 h-full flex items-center justify-center transition-all duration-1000 ease-in-out ${
            isLogin ? "left-0" : "right-0"
          }`}
        >
          <div className="w-full max-w-sm px-8 py-4">
            <div className="transform transition-all duration-700">
              <h2 className="text-4xl font-bold text-gray-800 mb-1 text-center">
                {isLogin ? "Sign in" : "Create Account"}
              </h2>

              <p className="text-gray-500 text-center mb-8 text-sm">{isLogin ? "Please sign in" : "Create account"}</p>

              {/* Social Login Icons */}
              <div className="flex justify-center space-x-4 mb-8">
                <button
                  onClick={() => handleSocialLogin("facebook")}
                  className="group w-12 h-12 border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-amber-300 hover:bg-amber-50 transition-all duration-300 transform hover:scale-110"
                >
                  <span className="text-blue-600 font-bold text-lg group-hover:scale-110 transition-transform">f</span>
                </button>
                <button
                  onClick={() => handleSocialLogin("google")}
                  className="group w-12 h-12 border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-amber-300 hover:bg-amber-50 transition-all duration-300 transform hover:scale-110"
                >
                  <span className="text-red-500 font-bold text-sm group-hover:scale-110 transition-transform">G+</span>
                </button>
                <button
                  onClick={() => handleSocialLogin("linkedin")}
                  className="group w-12 h-12 border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-amber-300 hover:bg-amber-50 transition-all duration-300 transform hover:scale-110"
                >
                  <span className="text-blue-700 font-bold text-sm group-hover:scale-110 transition-transform">in</span>
                </button>
              </div>

              <p className="text-gray-400 text-center mb-6 text-xs uppercase tracking-wider">or use email</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field (Sign Up Only) */}
                <div
                  className={`transform transition-all duration-500 ${!isLogin ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 h-0 overflow-hidden"}`}
                >
                  {!isLogin && (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                      className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:bg-white transition-all duration-300 transform focus:scale-105"
                      required={!isLogin}
                    />
                  )}
                </div>

                {/* Email Field */}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:bg-white transition-all duration-300 transform focus:scale-105"
                  required
                />

                {/* Password Field */}
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:bg-white transition-all duration-300 transform focus:scale-105"
                  required
                />

                {/* Forgot Password Link (Login Only) */}
                <div
                  className={`text-center transition-all duration-500 ${isLogin ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 h-0 overflow-hidden"}`}
                >
                  {isLogin && (
                    <button
                      type="button"
                      onClick={() => alert("Forgot password functionality would be implemented here")}
                      className="text-gray-400 hover:text-amber-600 text-sm transition-all duration-300 hover:scale-105"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 px-8 rounded-2xl text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 mt-6"
                  style={{
                    background: `linear-gradient(135deg, #CC9966 0%, #D4A574 50%, #E6B887 100%)`,
                  }}
                >
                  {isLogin ? "SIGN IN" : "SIGN UP"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Welcome Panel */}
        <div
          className={`absolute top-0 w-1/2 h-full flex items-center justify-center text-white transition-all duration-1000 ease-in-out ${
            isLogin ? "right-0" : "left-0"
          }`}
        >
          <div className="text-center px-8 relative z-10">
            <div className="transform transition-all duration-700 delay-300">
              <h2 className="text-4xl font-bold mb-6 leading-tight">{isLogin ? "Hello!" : "Welcome!"}</h2>
              <p className="text-xl mb-10 leading-relaxed opacity-90 max-w-sm mx-auto">
                {isLogin ? "Enter your details to start your journey" : "Login with your personal info"}
              </p>
              <button
                onClick={toggleMode}
                className="border-3 border-white text-white font-bold py-4 px-10 rounded-2xl hover:bg-white hover:text-amber-700 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl active:scale-95 backdrop-blur-sm bg-white/10"
              >
                {isLogin ? "SIGN UP" : "SIGN IN"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
