// ! Next and React
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col no-print md:px-5 md:py-1 border-t">
      <div className="container mx-auto max-w-4xl px-2 py-2 md:px-2">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <span className="w-3 h-3 mr-2 rounded-full bg-primary"></span>
            <Link href="/login" className="text-tertiary text-sm whitespace-nowrap tracking-tight">
              Login
            </Link>
          </div>
          <span className="text-xs tracking-tight text-gray-600 font-light">
            Copyright &copy; Fidel Pierre Elie {(new Date()).getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
