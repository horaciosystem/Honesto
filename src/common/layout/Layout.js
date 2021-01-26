import Head from "next/head"
import Link from "next/link"
import Navbar from "@/common/navbar/Navbar"

function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <footer></footer>
    </div>
  )
}

export default Layout

function Header() {
  return (
    <header className="bg-gray-100 flex py-6 px-4 shadow">
      <span className="font-bold w-1/4 text-center text-xl">Honesto</span>
      <Navbar />
    </header>
  )
}
