import React from 'react';
import Logo from "../img/LOGO.png"
import "./Navbar.css"
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div>
 <nav class="navbar bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand"
    style={{objectFit:"cover"}}
    href="/">
      <img
       src="https://media.canva.com/v2/image-resize/format:PNG/height:356/quality:100/uri:s3%3A%2F%2Fmedia-private.canva.com%2F8f_TA%2FMAD3We8f_TA%2F1%2Fp.png/watermark:F/width:800?csig=AAAAAAAAAAAAAAAAAAAAALJlRp_gFFD0h6EJTQQC8AmY10A2olFBafQIPZAnV-9b&exp=1729869710&osig=AAAAAAAAAAAAAAAAAAAAAFIB-Q-0QBcvuq8M9X14ZwT8p9VnLV3E0YE9OXFn0yiY&signer=media-rpc&x-canva-quality=screen" 
       alt="Logo" width="150" height="60" class="d-inline-block align-text-top"/>
    </a>
    <span className='graduate-regular fs-3 text-success'
    style={{marginRight:"10%"}}
    >
    Wisdom Sprouts
    </span>

    <Link to="/excel">
   <span
    className='text-decoration-none text-black p-3 fs-5'
    style={{marginRight:"30px"}}>
    Excel
   </span>
</Link>

  </div>
</nav>
    </div>
  )
}

export default Navbar