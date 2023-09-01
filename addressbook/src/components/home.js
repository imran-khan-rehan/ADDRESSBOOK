import {React,useEffect} from 'react'
import './home.css'
import Cookies  from 'js-cookie';
export default function Home() {
  useEffect(() => {
    const userEmail = Cookies.get('userEmail');

      console.log("the email in home is ",userEmail);
    
  }, []);
  return (
    <>
    fsdf
    </>
  )
}
