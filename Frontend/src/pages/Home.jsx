import React from 'react'

function Home() {


    return (
      <section className="container hero-section">
      <div className="left">
          <h1 className="hero-heading">Craft your Image</h1>
          <p className="hero-para">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum voluptatum doloremque ullam animi magni doloribus repudiandae sapiente velit minima tempore, rem quisquam quam quae ipsa nulla iusto blanditiis illo veritatis consequuntur officiis? Impedit dolore voluptas perferendis?</p>
          <a href="#" className="btn">Explore us</a>
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
  )
}

export default Home
