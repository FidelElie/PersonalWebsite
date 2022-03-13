import { Typography } from "../components/core";
import { LightningBoltIcon } from "@heroicons/react/solid";


const HomePage = () => {

  return (
    // Becomes app layout wrapper
    <div className="flex flex-col justify-center w-screen min-h-screen">
      <div className="fixed px-3 py-3 top-0 flex space-x-4 items-center w-full">
        <LightningBoltIcon className="w-9 h-9 text-light cursor-pointer transition-colors hover:fill-tertiary"/>
        {/* Becomes link component styles */}
        {/* <Typography decorate="underline" className="decoration-cyan-600 underline-offset-2 decoration-2 cursor-pointer">
          Home
        </Typography>
        <Typography decorate="underline" className="decoration-cyan-600 underline-offset-2 decoration-2 cursor-pointer">
          Music
        </Typography>
        <Typography decorate="underline" className="decoration-cyan-600 underline-offset-2 decoration-2 cursor-pointer">
          Blog
        </Typography>
        <Typography decorate="underline" className="decoration-cyan-600 underline-offset-2 decoration-2 cursor-pointer">
          Resume
        </Typography> */}
      </div>
      <div className="container max-w-5xl mx-auto px-5 grow flex flex-col justify-center md:px-0">
        <Typography as="h1" type="h1" weight="bold" noSelect>Hi, my name is Fidel</Typography>
        <Typography as="h2" type="h2" weight="light" color="red" className="opacity-75" noSelect>and I make things.</Typography>
      </div>
    </div>
  )
}

export default HomePage;
