"use client";
import registered_logo from "../../../public/img/registered_logo.png";
import Image from "next/image";
import search_icon from "../../../public/img/search_icon.svg";
import bars_icon from "../../../public/img/bars_icon.svg";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Button, Modal } from 'react-bootstrap';
import { useState, useEffect } from "react";
import register_modal_close_icon from "../../../public/img/register_modal_close_icon.png";
import "../../Components/Header/Header.css";

const Header = ({setSearchMovie}) =>{
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [showPlaceholder, setShowPlaceholder] = useState(0);
    const [isFocusedPlaceholder, setIsFocusedPlaceholder] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleUsernameChange = (value) =>{
        setName(value);
        setUsernameError('');
    }

    const handleEmailChange = (value) =>{
    setEmail(value);
    setEmailError('');
    }

    const handlePasswordChange = (value) =>{
    setPassword(value);
    setPasswordError('');
    }

    const validateInputs = () =>{
        let valid = true;
    
        // Username validation
        if(name.length < 8){
          setUsernameError('Username must be at least 8 characters');
          valid = false;
        }
        else{
          setUsernameError('');
        }
    
        // Email validation using a simple regex pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
          setEmailError('Invalid email address');
          valid = false;
        }
        else{
          setEmailError('');
        }
    
        // Password validation using a regex pattern
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!passwordRegex.test(password)){
          setPasswordError('Password must be at least 8 characters and include one special character, one lowercase letter, one uppercase letter, and one number');
          valid = false;
        }
        else{
          setPasswordError('');
        }
        return valid;
    }

    const handleRegister = async(e) => {
        e.preventDefault();
        if(!validateInputs()){
          // If inputs are not valid, don't proceed with registration
          return;
        }
    
        
        try {
            const res = await fetch("api/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name,
                  email,
                  password,
                }),
              });
        
              if (res.ok) {
                console.log('user registration successfull');
                setShowRegisterModal(false);
              } else {
                console.log("User registration failed.");
              }
        } catch (error) {
          console.error('Error during registration:', error);
        }
        setName('');
        setEmail('');
        setPassword('');
    };

    const handleSearchMovie = (e) =>{
        setSearchMovie(e.target.value);
    }

    const handleToggleSidebar = () =>{
        setToggleSidebar(!toggleSidebar);
    }

    const placeholderText = [
        "Search Crime Movies",
        "Search Animation Movies",
        "Search Drama Movies",
        "Search Kids Movies",
    ];

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(!isFocusedPlaceholder){
                setShowPlaceholder((showPlaceholder)=>(showPlaceholder + 1) % placeholderText.length);
            }
        },2000);
        return () => clearInterval(interval);
    },[isFocusedPlaceholder]);

    const startPlaceholder = () =>{
        setIsFocusedPlaceholder(true);
    };

    const stopPlaceholder = () =>{
        setIsFocusedPlaceholder(false);
    };

    const handleShowRegisterModal = () =>{
        setShowRegisterModal(true);
    }

    const handleCloseRegisterModal = () =>{
        setShowRegisterModal(false);
    }
    return(
        <>
            <header className="bg-[#fff] border-b border-b-solid border-b-[1px] z-[2000] px-[10px] border-b-[#eee] fixed left-[0px] right-[0px] w-full">
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
                                placeholder = {`${placeholderText[showPlaceholder]}`}
                                onChange = {handleSearchMovie}
                                onBlur = {stopPlaceholder}
                                onFocus = {startPlaceholder}
                            />
                            <Image className="w-[18px] absolute right-[11px] top-[10px]" src={search_icon} alt="search_icon" />
                        </div>
                    </div>
                    <div className="hidden max-md:block" onClick={handleToggleSidebar}>
                        <Image className="w-[30px]" src={bars_icon} alt="bars_icon" />
                    </div>
                    <div className={`${toggleSidebar ? 'max-md:hidden':"flex"} max-md:absolute max-md:top-[60px] max-md:left-[0px] max-md:bg-[#fff] max-md:p-[10px] max-md:h-screen max-md:min-w-[250px]`}>
                        <ul className="flex items-center max-md:items-start mb-[0px] max-md:flex-col gap-[20px]">
                            <li>
                                <Link href={"/"} className="text-inherit no-underline">Home</Link>
                            </li>
                            <li>About us</li>
                            <li>Blog</li>
                            <li>Contact us</li>
                            <li className="text-[12px] bg-[#f84464] text-[#fff] px-[10px] py-[5px] rounded-[5px] cursor-pointer" onClick={handleShowRegisterModal}>Sign in</li>
                        </ul>
                    </div>
                </div>
            </header>
            <Modal className="registerModal" show={showRegisterModal} onHide={handleCloseRegisterModal}>
                <div className="px-[42px] py-[20px]">
                    <div className="flex items-end justify-end">
                        <Image className="w-[15px] cursor-pointer" src={register_modal_close_icon} alt="register-modal-close-icon" onClick={handleCloseRegisterModal} />
                    </div>
                    <p className="text-center mb-[15px] font-[600]">Get Started</p>
                    <form>
                        <div className="mb-[15px]">
                            <label className="d-block mb-[8px]">Username</label>
                            <input className="border-[#ccc] input-username w-full border-[1px] outline-none pl-[40px] pr-[20px] h-[35px] rounded-[5px]" 
                                type="text" 
                                placeholder="Enter Username"
                                value={name} 
                                onChange={(e) => handleUsernameChange(e.target.value)} 
                            />
                            {
                                usernameError &&
                                <p className='text-[15px] text-[red]'>{usernameError}</p>
                            }
                        </div>
                        <div className="mb-[15px]">
                            <label className="d-block mb-[8px]">Email</label>
                            <input className="border-[#ccc] input-username w-full border-[1px] outline-none pl-[40px] pr-[20px] h-[35px] rounded-[5px]" 
                                type="text" 
                                placeholder="Enter Email"
                                value={email} 
                                onChange={(e) => handleEmailChange(e.target.value)} 
                            />
                            {
                                emailError &&
                                <p className='text-[15px] text-[red]'>{emailError}</p>
                            }
                        </div>
                        <div className="mb-[15px]">
                            <label className="d-block mb-[8px]">Password</label>
                            <input className="border-[#ccc] w-full input-password border-[1px] outline-none pl-[40px] pr-[20px] h-[35px] rounded-[5px]" 
                                type="password" 
                                placeholder="Enter Password"
                                value={password} 
                                onChange={(e) => handlePasswordChange(e.target.value)} 
                            />
                            {
                                passwordError &&
                                <p className='text-[15px] text-[red]'>{passwordError}</p>
                            }
                        </div>
                        <button type="button" className="bg-[#f84464] w-full text-[#fff] flex items-center rounded-[5px] justify-center py-[8px]" onClick={handleRegister}>Register</button>
                    </form>
                </div>
            </Modal>
        </>
    )
}
export default Header;