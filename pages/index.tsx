import { Typography } from "../components/core";
import { LightningBoltIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";

import FidelImage from "../assets/fidel.jpeg";

import { Image } from "../components/core";
import Sidebar from "../components/theme/Sidebar";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1}
}

const HomePage = () => {

  return (
    // Becomes app layout wrapper
    <div className="flex flex-col justify-center w-screen min-h-screen">
      <Sidebar/>
      <div className="container max-w-6xl mx-auto px-5 grow flex flex-col justify-center md:px-0 md:flex-row md:items-center">
        <div
          className="w-56 h-56 rounded-full overflow-hidden relative select-none shadow mr-8 shrink-0"
        >
          <Image src={FidelImage} fit="cover"/>
        </div>
        <div className="flex flex-col">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 2 }}
          >
            <Typography as="h1" type="h1" weight="bold" noSelect>Hi, my name is Fidel</Typography>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 2, delay: 1 }}
          >
            <Typography as="h2" type="h2" color="red" noSelect>and I write things.</Typography>
          </motion.div>
        </div>
      </div>
      <div className="fixed px-3 py-3 bottom-0 flex items-center w-full justify-end">
        <Typography type="caption" color="gray">
          Copyright &copy; Fidel Pierre Elie {new Date().getFullYear()}
        </Typography>
      </div>
    </div>
  )
}

export default HomePage;
