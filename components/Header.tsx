import React from 'react'
import Link from 'next/link'

function Header() {


  return (
    <div>
      <div className="nav-container">
        <h1 className="title">OFS Playground</h1>
        <div>
        <Link href="/products">
          <button className="button">Products</button>
        </Link>
        <Link href="/about">
          <button className="button">About</button>
        </Link>
        <Link href="/">
          <button className="button">Home</button>
        </Link>
        
      </div>
    </div>
    </div >
  )
}

export default Header