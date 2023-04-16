import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="no-print border-b w-full">
      <div className="mx-auto container max-w-4xl py-2.5">
        <Link href="/" className="flex items-center text-tertiary w-min">
          <span className="w-3 h-3 mr-2 rounded-full bg-primary"/>
          <h1
            className="tracking-tighter font-light transition duration-500 ease-in-out transform cursor-pointer underline-offset-4 whitespace-nowrap">
              Fidel Elie
          </h1>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar;
