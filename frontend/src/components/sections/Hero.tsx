import { MailPlus } from "lucide-react"
import { Container } from "../shared/Container"
import { Pharagraph } from "../shared/Pharagraph"
import { Button } from "../shared/Button"

import heroImage from "../../assets/hero.jpg"
import { Numbers } from "./Numbers"

export const Hero = () => {
    return (
        <section className="relative pt-32 lg:pt-36 overflow-hidden">
            <Container className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="w-full lg:w-1/2 relative z-10">
                    <span className="absolute -left-20 md:left-4 top-10 lg:top-[-20px] lg:ml-[-70px] w-22 h-32 rotate-90 skew-x-12 rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 blur-3xl opacity-60 lg:opacity-95 hidden lg:block animate-float" />
                    <span className="absolute -bottom-1 left-1/3 w-40 h-40 rounded-full bg-gradient-to-l from-blue-400 to-blue-800 blur-3xl opacity-90 animate-sway" />
                    <span className="absolute -right-10 top-32 w-32 h-32 rotate-45 rounded-3xl bg-gradient-to-r from-blue-600 to-violet-300 blur-3xl opacity-90 hidden lg:block animate-float delay-1000" />

                    <h1 className=" text-blue-700 dark:text-blue-800 text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
                        Pursue better. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900">Pixel</span> by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900">Pixel</span>
                    </h1>

                    <Pharagraph className="mt-8 text-black font-semibold dark:text-gray-300">
                        PixelPursuit empowers job seekers and employers to build meaningful career connections with precision and clarity.
                        Discover opportunities that truly align with your skills and aspirations,
                        or find top talent that fits your team perfectly—all through an intuitive,
                        modern platform designed for the digital age.
                        Start your pursuit today and craft the future you deserve, one perfect match at a time.
                    </Pharagraph>

                    <div className="mt-10 max-w-md mx-auto lg:mx-0">
                        <form className="py-1 pl-6 pr-1 flex items-center gap-3 shadow-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-full focus-within:border-blue-600 transition">
                            <span className="pr-3 border-r border-gray-300 dark:border-gray-600">
                                <MailPlus className="w-5 h-5 text-gray-600" />
                            </span>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="w-full py-3 outline-none bg-transparent text-gray-800 dark:text-gray-200"
                            />
                            <Button className="min-w-max bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
                                Get Started
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="w-full lg:w-250 lg:mt-0">
                    <img
                        src={heroImage}
                        alt="Professionals building careers - PixelPursuit"
                        className="w-full h-auto rounded-3xl object-cover shadow-2xl"
                    />
                </div>
            </Container>
            <Numbers />
        </section>
    )
}