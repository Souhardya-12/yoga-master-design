// import React, { useContext, useEffect, useState } from 'react';
// import { NavLink, useLocation, useNavigate } from 'react-router-dom';
// import { ThemeProvider, THEME_ID, createTheme } from '@mui/material/styles';
// import { Switch } from '@mui/material';
// import {motion} from "framer-motion";
// import photoURL from "../../assets/home/girl.jpg";
// import {FaBars} from "react-icons/fa";
// import useAuth from '../../hooks/useAuth';
// import Swal from 'sweetalert2';
// import { AuthContext } from '../../utilities/providers/AuthProvider';

// const navLinks = [
//     { name: 'Home', route: '/' },
//     { name: 'Instructors', route: '/instructors' },
//     { name: 'Classes', route: '/classes' },
// ];

// const theme = createTheme({
//     palette: {
//         primary: {
//             main: "#ff0000",
//         },
//         secondary: {
//             main: "#00ff00",
//         },
//     },
// });

// const Navbar = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     // const {logout} = useAuth();
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     const [isHome, setIsHome] = useState(false);
//     const [isLogin, setIsLogin] = useState(false);
//     const [scrollPosition, setScrollPosition] = useState(0);
//     const [isFixed, setIsFixed] = useState(false);
//     const [isDarkMode, setIsDarkMode] = useState(false);
//     const [navBg, setNavBg] = useState('bg-[#15151580]');
//     const {logout, user} = useContext(AuthContext);

//     const toggleMobileMenu = () => {
//         setIsMobileMenuOpen(!isMobileMenuOpen);
//     };

//     useEffect(() => {
//         const darkClass = 'dark';
//         const root = window.document.documentElement;
//         if (isDarkMode) {
//             root.classList.add(darkClass);
//         }
//         else {
//             root.classList.remove(darkClass);
//         }
//     }, [isDarkMode]);

//     useEffect(() => {
//         setIsHome(location.pathname === '/');
//         setIsLogin(location.pathname === '/login');
//         setIsFixed(location.pathname === '/register' || location.pathname === '/login');
//     }, [location]);

//     useEffect(() => {
//         const handleScroll = () => {
//             const currentPosition = window.pageYOffset;
//             setScrollPosition(currentPosition);
//         };
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     useEffect(() => {
//         if (scrollPosition > 100) {
//             if (isHome) {
//                 setNavBg('bg-white backdrop-filter backdrop-blur-xl bg-opacity-0 dark:text-white text-black')

//             }
//             else {
//                 setNavBg('bg-white dark:bg-black dark:text-white text-black')
//             }
//         }
//         else {
//             setNavBg(`${isHome || location.pathname === '/' ? 'bg-transparent' : 'bg-white dark:bg-black'} dark:text-white text-white`)
//         }
//     }, [scrollPosition]);


//     // useEffect(() => {
//     //     if(scrollPosition > 100) {
//     //         if(isHome) {
//     //             setNavBg(`bg-white dark:bg-gray-900 backdrop-filter backdrop-blur-xl bg-opacity-0 dark:text-white text-black`);
//     //         } else {
//     //             setNavBg(`bg-white dark:bg-gray-900 dark:text-white text-black`);
//     //         }
//     //     } else {
//     //         setNavBg(`${isHome || location.pathname === '/' ? 'bg-transparent' : 'bg-white dark:bg-gray-900'} dark:text-white text-white`);
//     //     }
//     // }, [scrollPosition, isHome, location.pathname, isDarkMode]);

//     const handleLogout = (e) => {
//         e.preventDefault();
      
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You will be logged out!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, logout me!"
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 logout().then(() => {Swal.fire({
//                     title: "Goodbye!",
//                     text: "Your have been successfully logged out.",
//                     icon: "success"
//                   })
//                   console.log("logged out")
//                   navigate('/'); 
//                 }).catch((err) => Swal.fire("error!", err.message, "error"))
                 
//             }
            
//         });
//     }



//     return (
//         <motion.nav
//         initial={{opacity: 0}}
//         animate={{opacity: 1}}
//         transition={{duration: 0.5}}
//         className={`${isHome ? navBg : "bg-white dark:bg-black backdrop-blur-2xl"} ${isFixed ? 'static' : 'fixed'} top-0 transition-colors duration-500 ease-in-out w-full z-10`}>{/*className={`lg:w-[100%] mx-auto sm:px-6 ${navBg} dark:bg-black`} */}
//             <div className='lg:w-[95%] mx-auto sm:px-6'>
//                 <div className='px-4 py-4 flex items-center justify-between'>
//                     {/* logo */}
//                     <div onClick={()=> navigate('/')} className='flex-shrink-0 cursor-pointer pl-7 md:p-0 flex items-center'>
//                         <div>
//                         <h1 className='text-2xl inline-flex gap-3 items-center font-bold dark:text-white'>YogaMaster <img src="/yoga-logo.png" alt="" className='w-8 h-8' /></h1> {/* text-black dark:text-white */}
//                         <p className='font-bold text-[13px] tracking-[8px] dark:text-white'>Quick Explore</p> {/* text-black dark:text-white */}
//                         </div>
//                     </div>

//                     {/*mobile menu items */}
//                     <div className='md:hidden flex items-center'>
//                         <button type='button' onClick={toggleMobileMenu} className='text-gray-300 hover:text-white focus:outline-none'>
//                             <FaBars className='h-6 w-6 hover:text-primary'/>
//                         </button>
//                     </div>

//                     {/*navigational links */}
//                     <div className='hidden md:block text-black dark:text-white'>
//                         <div className='flex'>
//                             <ul className='ml-10 flex items-center space-x-4 pr-4'>
//                                 {
//                                     navLinks.map((link) => (
//                                         <li key={link.route}>
//                                             <NavLink to={link.route} style={{whiteSpace: "nowrap"}} className={({ isActive }) =>
//                                                 `font-bold ${isActive ? 'text-secondary' : `${navBg.includes(`bg-transparent`) ? 'text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-300`}>{link.name}</NavLink>
//                                         </li>
//                                     ))
//                                 }

//                                 {/*based on users */}
//                                 {
//                                     user ? null : isLogin ? <li>
//                                         <NavLink to="/register" className={({ isActive }) =>
//                                             `font-bold ${isActive ? 'text-secondary' : `${navBg.includes(`bg-transparent`) ? 'text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-300`}>Register</NavLink>
//                                     </li> : <li>
//                                         <NavLink to="/login" className={({ isActive }) =>
//                                             `font-bold ${isActive ? 'text-secondary' : `${navBg.includes(`bg-transparent`) ? 'text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-300`}>Login</NavLink>
//                                     </li>
//                                 }

//                                 {
//                                     user && <li>
//                                         <NavLink to='/dashboard' className={({ isActive }) =>
//                                             `font-bold ${isActive ? 'text-secondary' : `${navBg.includes(`bg-transparent`) ? 'text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-300`}>Dashboard</NavLink>
//                                     </li>
//                                 }

//                                 {
//                                     user && <li>
//                                         <img src={photoURL} alt='' className='h-[40px] rounded-full w-[40px]' />
//                                     </li>
//                                 }

//                                 {
//                                     user && <li><NavLink onClick={handleLogout} className={'font-bold px-3 py-2 bg-secondary text-white rounded-xl'}>Logout</NavLink></li>
//                                 }


//                                 {/*color toggle */}
//                                 <li>
//                                     <ThemeProvider theme={theme} >
//                                         <div className='flex flex-col justify-center items-center'>
//                                             <Switch onChange={() => setIsDarkMode(!isDarkMode)} />
//                                             <h1 className='text-[8px]'>Light/Dark</h1>
//                                         </div>
//                                     </ThemeProvider>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </motion.nav>
//     )
// }

// export default Navbar;

import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme, Switch } from '@mui/material';
import { motion } from 'framer-motion';
import photoURL from "../../assets/home/girl.jpg";
import { FaBars, FaTimes } from "react-icons/fa";
import Swal from 'sweetalert2';
import { AuthContext } from '../../utilities/providers/AuthProvider';
import useUser from '../../hooks/useUser';

const navLinks = [
    { name: 'Home', route: '/' },
    { name: 'Instructors', route: '/instructors' },
    { name: 'Classes', route: '/classes' },
];

const theme = createTheme({
    palette: {
        primary: { main: "#ff0000" },
        secondary: { main: "#00ff00" },
    },
});

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isHome, setIsHome] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isFixed, setIsFixed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [navBg, setNavBg] = useState('bg-[#15151580]');
    const { logout, user } = useContext(AuthContext);
    const {currentUser} = useUser();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        const darkClass = 'dark';
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add(darkClass);
        } else {
            root.classList.remove(darkClass);
        }
    }, [isDarkMode]);

    useEffect(() => {
        setIsHome(location.pathname === '/');
        setIsLogin(location.pathname === '/login');
        setIsFixed(location.pathname === '/register' || location.pathname === '/login');
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.pageYOffset;
            setScrollPosition(currentPosition);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (scrollPosition > 100) {
            if (isHome) {
                setNavBg('bg-white backdrop-filter backdrop-blur-xl bg-opacity-0 dark:text-white text-black');
            } else {
                setNavBg('bg-white dark:bg-black dark:text-white text-black');
            }
        } else {
            setNavBg(`${isHome || location.pathname === '/' ? 'bg-transparent' : 'bg-white dark:bg-black'} dark:text-white text-white`);
        }
    }, [scrollPosition]);

    const handleLogout = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout me!"
        }).then((result) => {
            if (result.isConfirmed) {
                logout().then(() => {
                    Swal.fire({
                        title: "Goodbye!",
                        text: "Your have been successfully logged out.",
                        icon: "success"
                    });
                    navigate('/');
                }).catch((err) => Swal.fire("Error!", err.message, "error"));
            }
        });
    };

    return (
        <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`${isHome ? navBg : "bg-white dark:bg-black backdrop-blur-2xl"} ${isFixed ? 'static' : 'fixed'} top-0 transition-colors duration-500 ease-in-out w-full z-10`}
        >
            <div className='lg:w-[95%] mx-auto sm:px-6'>
                <div className='px-4 py-4 flex items-center justify-between'>
                    {/* Logo */}
                    <div onClick={() => navigate('/')} className='flex-shrink-0 cursor-pointer pl-7 md:p-0 flex items-center'>
                        <div>
                            <h1 className='text-2xl inline-flex gap-3 items-center font-bold dark:text-white'>YogaMaster <img src="/yoga-logo.png" alt="" className='w-8 h-8' /></h1>
                            <p className='font-bold text-[13px] tracking-[8px] dark:text-white'>Quick Explore</p>
                        </div>
                    </div>

                    {/* Mobile Hamburger Icon */}
                    <div className='md:hidden flex items-center'>
                        <button type='button' onClick={toggleMobileMenu} className='text-red-800 hover:text-secondary focus:outline-none'>
                            {isMobileMenuOpen ? <FaTimes className='h-6 w-6' /> : <FaBars className='h-6 w-6' />}
                        </button>
                    </div>

                    {/* Desktop Menu */}
                    <div className='hidden md:block text-black dark:text-white'>
                        <div className='flex'>
                            <ul className='ml-10 flex items-center space-x-4 pr-4'>
                                {navLinks.map(link => (
                                    <li key={link.route}>
                                        <NavLink
                                            to={link.route}
                                            style={{ whiteSpace: "nowrap" }}
                                            className={({ isActive }) => `font-bold ${isActive ? 'text-secondary' : `${navBg.includes('bg-transparent') ? 'text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-300`}
                                        >
                                            {link.name}
                                        </NavLink>
                                    </li>
                                ))}

                                {user ? null : isLogin ? (
                                    <li>
                                        <NavLink to="/register" className={({ isActive }) => `font-bold ${isActive ? 'text-secondary' : `${navBg.includes('bg-transparent') ? 'text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-300`}>Register</NavLink>
                                    </li>
                                ) : (
                                    <li>
                                        <NavLink to="/login" className={({ isActive }) => `font-bold ${isActive ? 'text-secondary' : `${navBg.includes('bg-transparent') ? 'text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-300`}>Login</NavLink>
                                    </li>
                                )}

                                {user && (
                                    <>
                                        <li>
                                            <NavLink to='/dashboard' className={({ isActive }) => `font-bold ${isActive ? 'text-secondary' : `${navBg.includes('bg-transparent') ? 'text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-300`}>Dashboard</NavLink>
                                        </li>
                                        <li><img src={`${currentUser?.photoUrl}`} alt='' className='h-[40px] rounded-full w-[40px]' /></li>
                                        <li><NavLink onClick={handleLogout} className={'font-bold px-3 py-2 bg-secondary text-white rounded-xl'}>Logout</NavLink></li>
                                    </>
                                )}

                                {/* Light/Dark Toggle */}
                                <li>
                                    <ThemeProvider theme={theme}>
                                        <div className='flex flex-col justify-center items-center'>
                                            <Switch onChange={() => setIsDarkMode(!isDarkMode)} />
                                            <h1 className='text-[8px]'>Light/Dark</h1>
                                        </div>
                                    </ThemeProvider>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                {/* Mobile Menu Items */}
                {isMobileMenuOpen && (
                    <div className='md:hidden w-1/3 fixed right-0'>
                        <ul className='flex flex-col space-y-4 p-4 bg-gray-400 bg-opacity-50 dark:bg-gray-700 dark:bg-opacity-50 items-end rounded-md'>
                            {navLinks.map(link => (
                                <li key={link.route}>
                                    <NavLink
                                        to={link.route}
                                        className='font-bold text-black dark:text-white hover:text-secondary'
                                        onClick={toggleMobileMenu}
                                    >
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}

                            {user ? (
                                <>
                                    <li>
                                        <NavLink to='/dashboard' className='font-bold text-black dark:text-white hover:text-secondary' onClick={toggleMobileMenu}>Dashboard</NavLink>
                                    </li>
                                    <li><NavLink onClick={handleLogout} className='font-bold text-black dark:text-white hover:text-secondary'>Logout</NavLink></li>
                                </>
                            ) : (
                                <li>
                                    <NavLink to="/login" className='font-bold text-black dark:text-white hover:text-secondary' onClick={toggleMobileMenu}>Login</NavLink>
                                </li>
                            )}

                            <li>
                                <ThemeProvider theme={theme}>
                                    <div className='flex flex-col justify-center items-center'>
                                        <Switch onChange={() => setIsDarkMode(!isDarkMode)} />
                                        <h1 className='text-[8px] text-black dark:text-white'>Light/Dark</h1>
                                    </div>
                                </ThemeProvider>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </motion.nav>
    );
};

export default Navbar;
