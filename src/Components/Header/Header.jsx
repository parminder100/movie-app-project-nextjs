import registered_logo from "../../../public/img/registered_logo.png";
import Image from "next/image";
import search_icon from "../../../public/img/search_icon.svg";
import location_icon from "../../../public/img/location_icon.png";
import Link from "next/link";

const Header = ({setSearchMovie}) =>{
    const handleSearchMovie = (e) =>{
        setSearchMovie(e.target.value);
    }
    console.log('rerender header');
    return(
        <div className="bg-[#fff] border-b border-b-solid border-b-[1px] border-b-[#eee] fixed left-[0px] right-[0px] w-full">
            <div className="max-w-[1280px] mx-auto py-[10px] flex items-center justify-between">
                <div>
                    <Image className="w-[50px]" src={registered_logo} alt="registered_logo" />
                </div>
                <div className="flex items-center gap-[15px]">
                    <div className="relative">
                        <input className="border border-solid border-[1px] h-[40px] border-[#ccc] rounded-[5px] outline-none pr-[20px] pl-[35px] shadow-[0_2px_4px_0px_rgba(0,0,0,.15)]"
                            type="text" 
                            placeholder="Search any location" 
                        />
                        <Image className="w-[18px] absolute left-[10px] top-[10px]" src={location_icon} alt="location_icon" />
                    </div>
                    <div className="relative">
                        <input className="min-w-[380px] border border-solid border-[1px] h-[40px] border-[#ccc] rounded-[5px] outline-none pl-[20px] pr-[30px] shadow-[0_2px_4px_0px_rgba(0,0,0,.15)]" 
                            type="text"
                            placeholder="Search any movie"
                            onChange={handleSearchMovie}
                        />
                        <Image className="w-[18px] absolute right-[11px] top-[10px]" src={search_icon} alt="search_icon" />
                    </div>
                </div>
                <div>
                    <ul className="flex items-center gap-[20px]">
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