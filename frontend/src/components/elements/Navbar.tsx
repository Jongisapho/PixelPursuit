import { Container } from "../shared/container";
import logo from '../../assets/icon.svg'
import { NavItem } from "../shared/NavItem";

const navItems = [
    { href: "#", text: "Home"},
    { href: "#services", text: "Services"},
    { href: "#about-us", text: "About us"},
    { href: "#features", text: "Features"},
];

export const Navbar = () => {
    return <header className="absolute inset-x-0 top-0 z-50 py-6">
        <Container>
            <nav className="flex justify-between gap-6 relative">
                {/* Logo */}
                <div className="min-w-max justify-start relative">
                    <a href="/" className="relative flex item-center gap-3">
                        <img src={logo} alt="Pixel Pursuit" className="w-15 h-15" />
                        <div className="inline-flex text-xl font-bold mt-4">
                            PixelPursuit
                        </div>
                    </a>
                </div>
                <div className="flex flex-col lg:flex-row w-full lg:justify-between 
                lg:items-center absolute top-full left-0 lg:static lg:top-0 border-x border-x-box-border lg:border-x-0 lg:h-auto h-0 overflow-hidden">
                    <ul className="border-t border-box-border lg:border-t-0 px-6 lg:px-6 pt-6 lg:pt-0 flex flex-col lg:flex-row gap-y-4 gap-x-3 text-xl w-full lg:justify-end lg:items-center">
                        {navItems.map((item, key) => (
                            <NavItem href={item.href} text={item.text} key={key} />
                        ))}
                    </ul>
                    <div className="lg:min-w-max flex items-center sm:w-max w-full pb-6 lg:pb-0 border-b border-box-border lg:border-0">
                        click me 
                    </div>
                </div>

            </nav>
        </Container>
    </header>
};