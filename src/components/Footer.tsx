import { HeartIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export const Footer = () => {
    return (
        <footer className="py-10 lg:mt-10 bg-zinc-900 text-white">
            <Link href="http://linkedin.com/in/josefelbez" target="_blank" className="flex items-center gap-5 justify-center w-fit mx-auto"> Made with <span> <HeartIcon width={25} /> </span> by Josef El Bez </Link>
        </footer>
    )
}
