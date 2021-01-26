import Link from "next/link"
import { useRouter } from "next/router"
import styles from "./Navbar.module.css"

const routes = [
  { href: "/share", label: "Share Feedback" },
  { href: "/received", label: "My Feedback" },
]

function Navbar() {
  return (
    <nav className="w-full">
      <ul className="flex justify-around">
        {routes.map(({ label, href }) => (
          <li key={label}>
            <NavItem href={href} label={label} />
          </li>
        ))}
        <li>Team Feedback</li>
        <li>Teams</li>
      </ul>
    </nav>
  )
}

function NavItem({ href, label }) {
  const router = useRouter()
  const { route: currentRoute } = router
  const isActive = href === currentRoute

  return (
    <Link passHref href={href}>
      <a
        {...(isActive && { "aria-current": "page" })}
        className={styles.navItem}
      >
        {label}
      </a>
    </Link>
  )
}

export default Navbar
