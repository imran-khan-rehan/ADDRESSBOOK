
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import './styles/login.css';
import Headingwithborder from './headingwithborder';
const url = "http://127.0.0.1:3001"

export default function Login() {

  const [exist, setexist] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const email = formData.get('email'); // Get the value of the 'email' field
    const password = formData.get('password'); // Get the value of the 'password' field

    try {
      const response = await fetch(url + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        console.log("login successful:", data);
        Cookies.set("userEmail", email);
        Cookies.set("userpass", password);

        window.location.href = '/';
      } else {
        // Registration failed
        console.log("Registration failed:", data.error);
        setexist(true);

      }
    } catch (error) {
      console.log("An error occurred:", error);
      setexist(true);
    }
  };

  return (
    <>
      <div className='homecontainer'>
        <Headingwithborder content={'Login Here'} />
        <form id='loginform' onSubmit={handleSubmit}>
          <input type='email' name='email' required placeholder='Email' />
          <br />
          <input type='password' name='password' required placeholder='Password' />
          <br />
          <input type='submit' />
          <br /><br />
          <div className={exist ? 'exist' : 'notexist'} style={{ color: 'red' }}><p>This user not exist please signup or enter valid credientials</p></div>

        </form>

      </div>
    </>
  );
}
