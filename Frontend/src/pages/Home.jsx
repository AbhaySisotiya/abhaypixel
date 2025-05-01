import React from 'react'


function Home() {

  const apiUrl= import.meta.env.VITE_DEMO;
  
  console.log(`API URL: ${apiUrl}`);
    return (
    <div>

      home page
    </div>
  )
}

export default Home
