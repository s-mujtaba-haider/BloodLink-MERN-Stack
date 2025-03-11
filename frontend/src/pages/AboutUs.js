import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <section id="about" className="about section py-5">
      <div className="container">
        <div className="row gy-4 gx-5">
          {/* Left Column - Image & Play Button */}
          <div
            className="col-lg-6 position-relative align-self-start"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <img src="assets/img/about.jpg" className="img-fluid" alt="About Us" />
            <Link
              to="https://www.youtube.com/watch?v=Y7f98aduVJ8"
              className="glightbox pulsating-play-btn"
            ></Link>
          </div>

          {/* Right Column - Content */}
          <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay="100">
            <h3>About Us</h3>
            <p>
              Dolor iure expedita id fuga asperiores qui sunt consequatur minima. Quidem voluptas
              deleniti. Sit quia molestiae quia quas qui magnam itaque veritatis dolores. Corrupti
              totam ut eius incidunt reiciendis veritatis asperiores placeat.
            </p>
            <ul className="list-unstyled">
              <li className="d-flex align-items-start mb-3">
                <i className="fa-solid fa-vial-circle-check fs-4 me-3 text-danger"></i>
                <div>
                  <h5>Ullamco laboris nisi ut aliquip consequat</h5>
                  <p>Magni facilis facilis repellendus cum excepturi quaerat praesentium libre trade</p>
                </div>
              </li>
              <li className="d-flex align-items-start mb-3">
                <i className="fa-solid fa-pump-medical fs-4 me-3 text-danger"></i>
                <div>
                  <h5>Magnam soluta odio exercitationem reprehenderi</h5>
                  <p>Quo totam dolorum at pariatur aut distinctio dolorum laudantium illo direna pasata redi</p>
                </div>
              </li>
              <li className="d-flex align-items-start">
                <i className="fa-solid fa-heart-circle-xmark fs-4 me-3 text-danger"></i>
                <div>
                  <h5>Voluptatem et qui exercitationem</h5>
                  <p>Et velit et eos maiores est tempora et quos dolorem autem tempora incidunt maxime veniam</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
