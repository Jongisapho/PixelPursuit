import type { NavItemProps } from "../interface/NavItemProps"

export const NavItem = ({ href, text = " " }: NavItemProps) => {
  return (
    <li>
        <a href={href} className="duration-300 font-bold  hover:text-blue-500 py-3 px-5">
            {text}
        </a>
    </li>
  )   
}