// ! Next and React
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mx-auto container px-2 py-2 flex flex-col box-border no-print md:px-5 md:py-3">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <span className="w-2 h-2 p-2 mr-2 rounded-full bg-primary"></span>
          <Link href="/admin/login">
            <a className="text-tertiary text-sm whitespace-nowrap">Admin Login</a>
          </Link>
        </div>
        <span className="text-sm tracking-tighter text-gray-600">Copyright &copy; Fidel Pierre Elie 2021</span>
      </div>
    </footer>
  )
}

export default Footer;
