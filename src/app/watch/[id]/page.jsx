"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import player_back_arrow_icon from "../../../../public/img/player_back_arrow_icon.svg";
import Link from "next/link";
import Header from "@/Components/Header/Header";

const Watch = () =>{
    const {id} = useParams();
    console.log(id);
    return(
        <>
            <Header />
            <div className="relative">
                {
                    <iframe
                    src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1`}
                    width="100%"
                    height="100vh"
                    frameBorder="0"
                    allowFullScreen
                    style={{height: "100vh"}}
                    />
                }
                <Link href={"/"}>
                    <div className="absolute top-[80px] left-[30px] w-[40px] h-[40px] flex items-center justify-center cursor-pointer border-solid border-[1px] border-[#fff] rounded-[50%]">
                        <Image className="w-[30px]" src={player_back_arrow_icon} alt="player_back_arrow_icon" />
                    </div>
                </Link>
            </div>
        </>
    )
}
export default Watch;