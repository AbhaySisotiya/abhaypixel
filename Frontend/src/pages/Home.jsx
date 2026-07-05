import React from "react";
import Service from "../pages/Service";
import { Helmet } from "react-helmet-async";

function Home() {
  return (
    <>
      <Helmet>
        <title>AbhayPixel | Free Online Image Converter</title>

        <meta
          name="description"
          content="Convert JPG, PNG, WEBP and AVIF images online for free using AbhayPixel. Fast, secure and easy image conversion tool."
        />

        <meta
          name="keywords"
          content="AbhayPixel,free image converter,image converter,jpg converter,png converter,webp converter,avif converter,Abhay Sisotiya,Sisotiya Abhay"/>

        <meta name="author" content="Abhay Sisotiya" />
      </Helmet>
      <section className="container hero-section">
        <div className="left">
          <h1 className="hero-heading">Craft your Image</h1>
          <p className="hero-para">
            Convert JPG, PNG, WEBP and AVIF images online for free using
            AbhayPixel. Fast, secure and easy image conversion tool.
          </p>
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
          <span>Privacy First - </span>Your images are never stored.
        </p>

        <p className="point">
          <span>Fast & Efficient - </span>Convert images to JPG, PNG, WebP, PDF,
          or AVIF formats.
        </p>

        <p className="point">
          <span>Simple & Clean Interface - </span>Designed for easy of use.
        </p>

        <p className="point">
          <span>Works Anywhere - </span>100% web-based. No software installation
          required.
        </p>
      </section>
    </>
  );
}

export default Home;
