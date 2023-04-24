import Link from "next/link";

import { clc } from "@/library/utilities";

export const Footer = (props: FooterProps) => {
  const { className } = props;

  return (
    <footer
      className={clc("w-full flex flex-col no-print border-t px-5 py-2.5 bg-white dark:bg-gray-700 dark:border-white dark:border-0 md:px-0", className)}
    >
      <div className="container mx-auto max-w-4xl">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <span className="w-3 h-3 mr-2 rounded-full bg-primary"></span>
            <Link
              href="/login"
              className="text-tertiary text-sm whitespace-nowrap tracking-tight dark:text-gray-50"
            >
              Login
            </Link>
          </div>
          <span className="text-xs tracking-tight text-gray-600 font-light dark:text-gray-50">
            Copyright &copy; Fidel Pierre Elie {(new Date()).getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  )
}

export interface FooterProps {
  className?: string
}
