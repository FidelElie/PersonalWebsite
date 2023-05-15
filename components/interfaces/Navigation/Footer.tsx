import Link from "next/link";

import { clc } from "@/library/utilities";

import { Container, Flex, Box, Copy } from "@/components/core";

export const Footer = (props: FooterProps) => {
  const { className } = props;

  return (
    <Flex.Column
      as="footer"
      className={clc(
        "w-full no-print border-t px-5 py-2.5 bg-white",
        "dark:bg-gray-700 dark:border-gray-500",
        className
      )}
    >
      <Container className="mx-auto lg:max-w-7xl">
        <Flex.Row className="w-full items-center justify-between">
          <Flex.Row className="items-center">
            <Box className="w-3 h-3 mr-2 rounded-full bg-primary"></Box>
            <Link
              href="/login"
              className="text-tertiary text-sm whitespace-nowrap tracking-tight dark:text-gray-50"
            >
              Admin Login
            </Link>
          </Flex.Row>
          <Copy.Inline className="text-xs tracking-tight">
            Copyright &copy; Fidel Pierre Elie {(new Date()).getFullYear()}
          </Copy.Inline>
        </Flex.Row>
      </Container>
    </Flex.Column>
  )
}

export interface FooterProps {
  className?: string
}
