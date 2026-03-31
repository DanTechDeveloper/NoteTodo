import { useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Login() {
    const { data, setData, post, errors, processing } = useForm({
        email: "",
        password: ""
    });

    const handleOnChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post('/Login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
            {/* Background Decorative Blob */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 flex justify-center items-center pointer-events-none">
                <div className="absolute w-[600px] h-[600px] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
                <div className="absolute w-[600px] h-[600px] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000 ml-48"></div>
                <div className="absolute w-[600px] h-[600px] bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000 mt-48"></div>
            </div>

            <div className="max-w-md w-full backdrop-blur-md bg-white/70 p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 relative z-10 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(99,102,241,0.1)]">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="mt-3 text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200 relative group">
                            Sign up today
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </p>
                </div>

                <form className="space-y-6" onSubmit={submit}>
                    <div className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className={`appearance-none block w-full px-4 py-3.5 rounded-xl border ${errors.email ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'} bg-white/50 focus:bg-white shadow-sm placeholder-gray-400 focus:outline-none transition-all duration-200`}
                                placeholder="you@example.com"
                                value={data.email}
                                onChange={handleOnChange}
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600 animate-pulse">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className={`appearance-none block w-full px-4 py-3.5 rounded-xl border ${errors.password ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'} bg-white/50 focus:bg-white shadow-sm placeholder-gray-400 focus:outline-none transition-all duration-200`}
                                placeholder="••••••••"
                                value={data.password}
                                onChange={handleOnChange}
                            />
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600 animate-pulse">{errors.password}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-colors duration-200 cursor-pointer"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white ${processing ? 'bg-indigo-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transform hover:-translate-y-0.5'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 active:scale-95`}
                        >
                            {processing ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : 'Sign In'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}