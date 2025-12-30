import { useEffect } from "react";
import logo from "../assets/icon.svg";

export const WelcomePage = () => {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = "/";
        }, 7000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center px-6 text-center">

            <div className="max-w-3xl z-10">
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8 animate-fade-in">
                    Welcome !!
                </h1>

                <p className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-12">
                    Thank you for joining PixelPursuit
                </p>

                <div className="flex justify-center my-16">
                    <img
                        src={logo}
                        alt="PixelPursuit Logo"
                        className="w-48 h-48 md:w-64 md:h-64 animate-pulse drop-shadow-3xl"
                    />
                </div>

                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
                    At PixelPursuit, we empower you to build meaningful career connections.
                    Discover opportunities that truly fit, or find the talent your team needs—
                    all through our intuitive, modern platform.
                    <br /><br />
                    <span className="font-bold text-xl">Let's craft the future you deserve, together.</span>
                </p>

                <p className="mt-12 text-sm text-gray-500 dark:text-gray-400">
                    Redirecting you home in a few seconds...
                </p>
            </div>
        </div>
    )
}