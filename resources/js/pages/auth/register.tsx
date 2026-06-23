import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Chrome } from 'lucide-react';

export default function Register() {
    const [isLogin, setIsLogin] = useState(false);

    // Login form
    const loginForm = useForm({
        email: '',
        password: '',
        remember: false,
    });

    // Register form
    const registerForm = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleLoginSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        loginForm.post(route('login'), {
            onFinish: () => loginForm.reset('password'),
        });
    };

    const handleRegisterSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        registerForm.post(route('register'), {
            onFinish: () => registerForm.reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen flex">
            <Head title={isLogin ? 'Log in' : 'Sign up'} />

            {/* Left side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 flex-col justify-center items-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
                </div>

                <div className="relative z-10 text-center px-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        NAVIX
                    </h1>
                    <h2 className="text-4xl md:text-5xl font-light italic text-white mb-4">
                        Join us
                    </h2>
                    <p className="text-xl text-blue-100">
                        Start your journey
                        <br />
                        now with us
                    </p>
                </div>
            </div>

            {/* Right side - Auth Forms */}
            <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
                <div className="w-full max-w-md">
                    {/* Tab Navigation */}
                    <div className="flex gap-4 mb-8 border-b border-gray-200">
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 pb-3 text-sm font-semibold transition-colors ${
                                !isLogin
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Create an account
                        </button>
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 pb-3 text-sm font-semibold transition-colors ${
                                isLogin
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Login to your account
                        </button>
                    </div>

                    {/* Login Form */}
                    {isLogin ? (
                        <form onSubmit={handleLoginSubmit} className="space-y-5">
                            <div>
                                <Label htmlFor="login-email" className="text-sm text-gray-700">
                                    Email
                                </Label>
                                <Input
                                    id="login-email"
                                    type="email"
                                    placeholder="hello@example.com"
                                    value={loginForm.data.email}
                                    onChange={(e) => loginForm.setData('email', e.target.value)}
                                    className="mt-2"
                                    autoComplete="username"
                                />
                                {loginForm.errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{loginForm.errors.email}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="login-password" className="text-sm text-gray-700">
                                    Password
                                </Label>
                                <Input
                                    id="login-password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={loginForm.data.password}
                                    onChange={(e) => loginForm.setData('password', e.target.value)}
                                    className="mt-2"
                                    autoComplete="current-password"
                                />
                                {loginForm.errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{loginForm.errors.password}</p>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Forgot?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                disabled={loginForm.processing}
                                className="w-full bg-blue-600 hover:bg-blue-700"
                            >
                                Login now
                            </Button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-gray-50 text-gray-500">or</span>
                                </div>
                            </div>

                            <p className="text-center text-sm text-gray-600">
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(false)}
                                    className="text-blue-600 font-semibold hover:text-blue-700"
                                >
                                    Sign up
                                </button>
                            </p>
                        </form>
                    ) : (
                        /* Register Form */
                        <form onSubmit={handleRegisterSubmit} className="space-y-5">
                            <div>
                                <Label htmlFor="name" className="text-sm text-gray-700">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Your full name"
                                    value={registerForm.data.name}
                                    onChange={(e) => registerForm.setData('name', e.target.value)}
                                    className="mt-2"
                                    autoComplete="name"
                                />
                                {registerForm.errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{registerForm.errors.name}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="register-email" className="text-sm text-gray-700">
                                    Email
                                </Label>
                                <Input
                                    id="register-email"
                                    type="email"
                                    placeholder="hello@example.com"
                                    value={registerForm.data.email}
                                    onChange={(e) => registerForm.setData('email', e.target.value)}
                                    className="mt-2"
                                    autoComplete="username"
                                />
                                {registerForm.errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{registerForm.errors.email}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="register-password" className="text-sm text-gray-700">
                                    Password
                                </Label>
                                <Input
                                    id="register-password"
                                    type="password"
                                    placeholder="Create a password"
                                    value={registerForm.data.password}
                                    onChange={(e) => registerForm.setData('password', e.target.value)}
                                    className="mt-2"
                                    autoComplete="new-password"
                                />
                                {registerForm.errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{registerForm.errors.password}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="password_confirmation" className="text-sm text-gray-700">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={registerForm.data.password_confirmation}
                                    onChange={(e) => registerForm.setData('password_confirmation', e.target.value)}
                                    className="mt-2"
                                    autoComplete="new-password"
                                />
                                {registerForm.errors.password_confirmation && (
                                    <p className="mt-1 text-sm text-red-600">{registerForm.errors.password_confirmation}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={registerForm.processing}
                                className="w-full bg-blue-600 hover:bg-blue-700"
                            >
                                Create account
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                            >
                                <Chrome className="mr-2 h-4 w-4" />
                                Continue with Google
                            </Button>

                            <p className="text-center text-sm text-gray-600">
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(true)}
                                    className="text-blue-600 font-semibold hover:text-blue-700"
                                >
                                    Log in
                                </button>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

