import React from 'react'
import Cookies from 'js-cookie'
export default function status() {
    const email=Cookies.get('userEmail');
    const password=Cookies.get('userpass');
  return (
    <div>
      your status is {email} and password is {password}
    </div>
  )
}
