// ! Next and React
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col no-print md:px-5 md:py-3 border-t">
      <div className="container mx-auto px-2 py-2">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <span className="w-2 h-2 p-2 mr-2 rounded-full bg-primary"></span>
            <Link href="/admin/login" className="text-tertiary text-sm whitespace-nowrap">
              Admin Login
            </Link>
          </div>
          <span className="text-sm tracking-tighter text-gray-600">
            Copyright &copy; Fidel Pierre Elie 2021
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
