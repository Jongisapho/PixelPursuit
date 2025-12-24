import type { BtnLinkProps } from "../interface/BtnLinkProps";


export const BtnLink = ({href, text, className} : BtnLinkProps) => {
    return (
        <a href={href} className={`px-6 py-3 rounded-full outline-none relative overflow-hidden border bg-blue-600 dark:bg-violet-600 cursor-pointer hover:scale-[1.1] ${className}`}>
            <span className="relative z-10 text-white"> {text} </span>
        </a>
    )
}

