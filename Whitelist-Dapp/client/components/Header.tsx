import React from 'react'

const Header = () => {
  return (
    <header className={`flex justify-between max-w-7xl p-5`}>
      <div>Welcome</div>
      <div className={`flex space-x-5`}>
        <h2 className={`border px-4 rounded-full py-1`}>About</h2>
        <h2 className={`rounded-full py-1`}>Info</h2>
      </div>
    </header>
  )
}

export default Header
