import React from 'react'
import Service from '../pages/Service'

function Home() {


    return (
        <>
      <section className="container hero-section">
      <div className="left">
          <h1 className="hero-heading">Craft your Image</h1>
          <p className="hero-para">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum voluptatum doloremque ullam animi magni doloribus repudiandae sapiente velit minima tempore, rem quisquam quam quae ipsa nulla iusto blanditiis illo veritatis consequuntur officiis? Impedit dolore voluptas perferendis?</p>
      </div>
      <div className="right">
          <div className="img">
              <img src="img_01.jpg" alt="img01" />
          </div>
          <div className="img">
              <img src="img_02.png" alt="img02" />
          </div>
      </div>
  </section>
    <Service />
    <section className="container service-card">
        <div className="card-heading">
            <h2>Why Choose Us</h2>
            <div className="line"></div>
        </div>
        <p className="point">
            <span>Privacy First - </span>Your images are never stored.</p>
        
        <p className="point">
        <span>Fast & Efficient - </span>Convert images to JPG, PNG, WebP, PDF, or AVIF formats.</p>
        
        <p className="point">
            <span>Simple & Clean Interface - </span>Designed for easy of use.</p>
        
        <p className="point">
            <span>Works Anywhere - </span>100% web-based. No software installation required.</p>
   
   
   
    </section>
  </>


  )
}

export default Home
