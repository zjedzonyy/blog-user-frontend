import { Outlet } from "react-router-dom"
import  '../styles/App.module.css';
import SignupForm from "./SignUpForm";
import Navbar from "./Navbar";


export default function App() {


    return(
        <>
        <Navbar></Navbar>
        {/* <SignupForm></SignupForm> */}
        <main>
            <Outlet />
        </main>
        </>
    )
}