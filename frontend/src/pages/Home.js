import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-grow">
        {/* Hero Section */}
        <section id="hero" className="hero section light-background w-full">
          <img
            src={`${process.env.PUBLIC_URL}/assets/img/hero-bg.jpg`}
            alt="Hero Background"
            className="w-full h-auto"
          />

          <div className="container position-relative">
            <div className="welcome position-relative" data-aos="fade-down" data-aos-delay="100">
              <h2>WELCOME TO Blood Link</h2>
              <p>Connecting Lives, One Drop at a Time.</p>
            </div>

            <div className="content row gy-4">
              <div className="col-lg-4 d-flex align-items-stretch">
                <div className="why-box" data-aos="zoom-out" data-aos-delay="200">
                  <h3>Why Choose BloodLink?</h3>
                  <p>BloodLink connects donors and recipients instantly, ensuring fast, safe, and reliable blood donations. Save lives with just one click!</p>
                  <div className="text-center">
                    <Link to="/aboutus" className="more-btn">
                      <span>Learn More</span> <i className="bi bi-chevron-right"></i>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-lg-8 d-flex align-items-stretch">
                <div className="d-flex flex-column justify-content-center">
                  <div className="row gy-4">
                    <div className="col-xl-4 d-flex align-items-stretch">
                      <div className="icon-box" data-aos="zoom-out" data-aos-delay="300">
                        <i className="bi bi-clipboard-data"></i>
                        <h4>Corporis voluptates officia</h4>
                        <p>Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi ut aliquip</p>
                      </div>
                    </div>

                    <div className="col-xl-4 d-flex align-items-stretch">
                      <div className="icon-box" data-aos="zoom-out" data-aos-delay="400">
                        <i className="bi bi-gem"></i>
                        <h4>Ullamco laboris ladore pan</h4>
                        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt</p>
                      </div>
                    </div>

                    <div className="col-xl-4 d-flex align-items-stretch">
                      <div className="icon-box" data-aos="zoom-out" data-aos-delay="500">
                        <i className="bi bi-inboxes"></i>
                        <h4>Labore consequatur incidid dolore</h4>
                        <p>Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut maiores omnis facere</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>  
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="stats section light-background">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row">
              {[
                { icon: "fa-user-doctor", label: "Doctors", count: 85 },
                { icon: "fa-hospital", label: "Departments", count: 18 },
                { icon: "fa-flask", label: "Research Labs", count: 12 },
                { icon: "fa-award", label: "Awards", count: 150 },
              ].map((stat, index) => (
                <div key={index} className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
                  <i className={`fa-solid ${stat.icon}`} style={{ fontSize: "24px" }}></i>
                  <div className="stats-item">
                    <CountUp start={0} end={stat.count} duration={5} />
                    <p>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="services section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Services</h2>
            <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
          </div>

          <div className="container">
            <div className="row gy-4">
              {[
                { icon: "fa-heartbeat", title: "Nesciunt Mete", desc: "Provident nihil minus qui consequatur non omnis maiores. Eos accusantium minus dolores iure perferendis tempore et consequatur." },
                { icon: "fa-pills", title: "Eosle Commodi", desc: "Ut autem aut autem non a. Sint sint sit facilis nam iusto sint. Libero corrupti neque eum hic non ut nesciunt dolorem." },
                { icon: "fa-hospital-user", title: "Ledo Markt", desc: "Ut excepturi voluptatem nisi sed. Quidem fuga consequatur. Minus ea aut. Vel qui id voluptas adipisci eos earum corrupti." },
                { icon: "fa-dna", title: "Asperiores Commodit", desc: "Non et temporibus minus omnis sed dolor esse consequatur. Cupiditate sed error ea fuga sit provident adipisci neque." },
                { icon: "fa-wheelchair", title: "Velit Doloremque", desc: "Cumque et suscipit saepe. Est maiores autem enim facilis ut aut ipsam corporis aut. Sed animi at autem alias eius labore." },
                { icon: "fa-notes-medical", title: "Dolori Architecto", desc: "Hic molestias ea quibusdam eos. Fugiat enim doloremque aut neque non et debitis iure. Corrupti recusandae ducimus enim." },
              ].map((service, index) => (
                <div key={index} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={100 * (index + 1)}>
                  <div className="service-item position-relative">
                    <div className="icon">
                      <i className={`fas ${service.icon}`}></i>
                    </div>
                    <a href="#" className="stretched-link">
                      <h3>{service.title}</h3>
                    </a>
                    <p>{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Departments Section */}
        <section id="departments" className="departments section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Departments</h2>
            <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
          </div>

          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row">
              <div className="col-lg-3">
                <ul className="nav nav-tabs flex-column">
                  {[
                    "Cardiology",
                    "Neurology",
                    "Hepatology",
                    "Pediatrics",
                    "Eye Care",
                  ].map((dept, index) => (
                    <li className="nav-item" key={index}>
                      <a
                        className={`nav-link ${index === 0 ? "active show" : ""}`}
                        data-bs-toggle="tab"
                        href={`#departments-tab-${index + 1}`}
                      >
                        {dept}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-lg-9 mt-4 mt-lg-0">
                <div className="tab-content">
                  {[
                    {
                      title: "Cardiology",
                      desc: "Qui laudantium consequatur laborum sit qui ad sapiente dila parde sonata raqer a videna mareta paulona marka",
                      img: "assets/img/departments-1.jpg",
                    },
                    {
                      title: "Et blanditiis nemo veritatis excepturi",
                      desc: "Qui laudantium consequatur laborum sit qui ad sapiente dila parde sonata raqer a videna mareta paulona marka",
                      img: "assets/img/departments-2.jpg",
                    },
                    {
                      title: "Impedit facilis occaecati odio neque aperiam sit",
                      desc: "Eos voluptatibus quo. Odio similique illum id quidem non enim fuga.",
                      img: "assets/img/departments-3.jpg",
                    },
                    {
                      title: "Fuga dolores inventore laboriosam ut est accusamus",
                      desc: "Totam aperiam accusamus. Repellat consequuntur iure voluptas iure porro quis delectus.",
                      img: "assets/img/departments-4.jpg",
                    },
                    {
                      title: "Est eveniet ipsam sindera pad rone matrelat sando reda",
                      desc: "Omnis blanditiis saepe eos autem qui sunt debitis porro quia.",
                      img: "assets/img/departments-5.jpg",
                    },
                  ].map((dept, index) => (
                    <div
                      key={index}
                      className={`tab-pane ${index === 0 ? "active show" : ""}`}
                      id={`departments-tab-${index + 1}`}
                    >
                      <div className="row">
                        <div className="col-lg-8 details order-2 order-lg-1">
                          <h3>{dept.title}</h3>
                          <p className="fst-italic">{dept.desc}</p>
                        </div>
                        <div className="col-lg-4 text-center order-1 order-lg-2">
                          <img src={dept.img} alt={dept.title} className="img-fluid" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
