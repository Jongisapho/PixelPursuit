import { Container } from "../shared/Container"

export const Numbers = () => {
    return <section className="relative mt-10 md:mt-10 ">
        <Container className="flex justify-center align-center">
            <div className="mx-auto lg:mx-0 p-5 sm:p-6 sm:py-8 max-w-5xl rounded-3xl bg-box-bg
                            border border-box-border shadow-lg shadow-box-shadow md:divide-x-2 divide-box-border
                            grid grid-cols-2 md:grid-cols-4 hover:border-blue-500  hover:border-2 ease-in-out transition-linear duration-600">
                <div className="text-center px-5">
                    <h2 className="font-semibold text-xl sm:text-2xl md:text-4xl text-heading-1"> 100<span className="text-blue-500">+</span> </h2>
                    <p className="mt-2 text-heading-3 "> Jobs created and linked with job seekers </p>
                </div>
                <div className="text-center px-5">
                    <h2 className="font-semibold text-xl sm:text-2xl md:text-4xl text-heading-1">  200<span className="text-blue-500">+</span> </h2>
                    <p className="mt-2 text-heading-3 "> Registered users in our website </p>
                </div>
                <div className="text-center px-5">
                    <h2 className="font-semibold text-xl sm:text-2xl md:text-4xl text-heading-1">  400<span className="text-blue-500">+</span> </h2>
                    <p className="mt-2 text-heading-3 "> Jobs available and open in the app </p>
                </div>
                <div className="text-center px-5">
                    <h2 className="font-semibold text-xl sm:text-2xl md:text-4xl text-heading-1">  96.98<span className="text-blue-500">%</span>  </h2>
                    <p className="mt-2 text-heading-3 "> Uptime guarantee</p>
                </div>
            </div>
        </Container>
    </section>
}