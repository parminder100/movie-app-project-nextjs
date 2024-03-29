"use client";
import registered_logo from "../../../public/img/registered_logo.png";
import Image from "next/image";
import search_icon from "../../../public/img/search_icon.svg";
import bars_icon from "../../../public/img/bars_icon.svg";
import Link from "next/link";
import { useState } from "react";

const Header = ({setSearchMovie}) =>{
    const [toggleSidebar, setToggleSidebar] = useState(false);

    const handleSearchMovie = (e) =>{
        setSearchMovie(e.target.value);
    }

    const handleToggleSidebar = () =>{
        setToggleSidebar(!toggleSidebar);
    }
    // console.log('rerender header');
    return(
        <div className="bg-[#fff] border-b border-b-solid border-b-[1px] z-[2000] px-[10px] border-b-[#eee] fixed left-[0px] right-[0px] w-full">
            <div className="max-w-[1280px] mx-auto py-[10px] flex items-center justify-between max-sm:justify-normal max-sm:gap-[20px]">
                <div className="max-md:order-[2]">
                    <Image className="w-[50px]" src={registered_logo} alt="registered_logo" />
                </div>
                <div className="max-md:order-[3] max-md:flex max-md:items-end max-md:justify-end max-md:w-full">
                    {/* <div className="relative">
                        <input className="border border-solid border-[1px] h-[40px] border-[#ccc] rounded-[5px] outline-none pr-[20px] pl-[35px] shadow-[0_2px_4px_0px_rgba(0,0,0,.15)]"
                            type="text" 
                            placeholder="Search any location" 
                        />
                        <Image className="w-[18px] absolute left-[10px] top-[10px]" src={location_icon} alt="location_icon" />
                    </div> */}
                    <div className="relative">
                        <input className="min-w-[380px] max-md:min-w-[unset] max-md:max-w-[180px] border border-solid border-[1px] h-[40px] border-[#ccc] rounded-[5px] outline-none pl-[20px] pr-[30px] shadow-[0_2px_4px_0px_rgba(0,0,0,.15)]" 
                            type="text"
                            placeholder="Search any movie"
                            onChange={handleSearchMovie}
                        />
                        <Image className="w-[18px] absolute right-[11px] top-[10px]" src={search_icon} alt="search_icon" />
                    </div>
                </div>
                <div className="hidden max-md:block" onClick={handleToggleSidebar}>
                    <Image className="w-[30px]" src={bars_icon} alt="bars_icon" />
                </div>
                <div className={`${toggleSidebar ? 'max-md:hidden':"flex"} max-md:absolute max-md:top-[60px] max-md:left-[0px] max-md:bg-[#fff] max-md:p-[10px] max-md:h-screen max-md:min-w-[250px]`}>
                    <ul className="flex items-center max-md:items-start max-md:flex-col gap-[20px]">
                        <li>
                            <Link href={"/"}>Home</Link>
                        </li>
                        <li>About us</li>
                        <li>Blog</li>
                        <li>Contact us</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Header;