import Link from "next/link"
import { Button } from "../ui/button"
import { ChevronRight, Clipboard } from "lucide-react"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import task from "../../assets/icons/task.png"


type Props = {}

const Navigation = (props: Props) => {
    return (
        <div className='flex justify-between items-center'>
            <div className="flex justify-center items-center">
                <Button variant="ghost" className="font-semibold text-2xl gap-2 hover:underline">
                    <Image
                        src={task}
                        alt="task"
                        width={30}
                        height={30}
                    />
                    <p>
                        TaskIt
                    </p>
                </Button>
            </div>
            <div className='flex flex-col md:flex-row justify-center items-center gap-2'>
                <Button className="flex justify-center items-center gap-2 font-semibold tracking-wider">
                    <GitHubLogoIcon />
                    <Link target="_blank" href="https://github.com/Vaibhav91one">
                        Github
                    </Link>
                    <ChevronRight size="0.5rem" />
                </Button>

                <Button variant="outline" className="flex justify-center items-center gap-2 font-semibold tracking-wider">
                    <Link target="_blank" href="https://www.copilotkit.ai/">
                        CopilotKit
                    </Link>
                    <ChevronRight size="1rem" />
                </Button>
            </div>
        </div>
    )
}

export default Navigation