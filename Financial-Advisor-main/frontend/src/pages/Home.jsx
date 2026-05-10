import { React, useState } from "react";
import "../styles/Home.css";
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';


const Home = () => {
  const [isshown, setIsShown] = useState(true);

  setTimeout(() => setIsShown(false), 1999);
  return (
    <>
      <div className="welcome">
          <div className="content">
            <h1 className="title">
              WELCOME
              <div className="aurora">
                <div className="aurora__item"></div>
                <div className="aurora__item"></div>
                <div className="aurora__item"></div>
                <div className="aurora__item"></div>
              </div>
            </h1>
            <p className="subtitle">
              <svg
                viewBox="0 0 24 24"
                fill="#FFFFFF"
                width="50px"
                xmlns="http://www.w3.org/2000/svg"
                id="arrowHover"
                
              >
                {!isshown ? (
                  <>
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M9.02621 13.75L8.98116 14.4986C8.99616 14.4995 9.01119 14.5 9.02621 14.5V13.75ZM8.10183 14.2842L8.77299 14.619L8.77299 14.619L8.10183 14.2842ZM8.23121 15.344L7.6603 15.8304C7.6644 15.8352 7.66857 15.84 7.67279 15.8447L8.23121 15.344ZM11.1952 18.65L10.6368 19.1507L10.6379 19.1519L11.1952 18.65ZM11.9902 19L11.9964 18.2499L11.984 18.25L11.9902 19ZM12.7852 18.65L13.3426 19.1519L13.3437 19.1506L12.7852 18.65ZM15.7482 15.344L16.3067 15.8446C16.3109 15.8399 16.3151 15.8352 16.3191 15.8304L15.7482 15.344ZM15.8776 14.2842L15.2064 14.619H15.2064L15.8776 14.2842ZM14.9532 13.75V14.5C14.9682 14.5 14.9833 14.4995 14.9983 14.4986L14.9532 13.75ZM11.2402 13.75C11.2402 14.1642 11.576 14.5 11.9902 14.5C12.4044 14.5 12.7402 14.1642 12.7402 13.75H11.2402ZM12.7402 5C12.7402 4.58579 12.4044 4.25 11.9902 4.25C11.576 4.25 11.2402 4.58579 11.2402 5H12.7402ZM11.9902 13H9.02621V14.5H11.9902V13ZM9.07126 13.0014C8.38379 12.96 7.73806 13.3332 7.43067 13.9495L8.77299 14.619C8.81199 14.5408 8.89393 14.4934 8.98116 14.4986L9.07126 13.0014ZM7.43067 13.9495C7.12329 14.5658 7.21367 15.3061 7.6603 15.8304L8.80213 14.8576C8.74545 14.7911 8.73398 14.6972 8.77299 14.619L7.43067 13.9495ZM7.67279 15.8447L10.6368 19.1507L11.7536 18.1493L8.78964 14.8433L7.67279 15.8447ZM10.6379 19.1519C10.9842 19.5365 11.4788 19.7543 11.9964 19.75L11.984 18.25C11.8958 18.2508 11.8116 18.2137 11.7526 18.1481L10.6379 19.1519ZM11.984 19.75C12.5016 19.7543 12.9962 19.5365 13.3426 19.1519L12.2279 18.1481C12.1689 18.2137 12.0846 18.2508 11.9964 18.25L11.984 19.75ZM13.3437 19.1506L16.3067 15.8446L15.1897 14.8434L12.2267 18.1494L13.3437 19.1506ZM16.3191 15.8304C16.7658 15.3061 16.8561 14.5658 16.5488 13.9495L15.2064 14.619C15.2454 14.6972 15.234 14.7911 15.1773 14.8576L16.3191 15.8304ZM16.5488 13.9495C16.2414 13.3332 15.5956 12.96 14.9082 13.0014L14.9983 14.4986C15.0855 14.4934 15.1674 14.5408 15.2064 14.619L16.5488 13.9495ZM14.9532 13H11.9902V14.5H14.9532V13ZM12.7402 13.75V5H11.2402V13.75H12.7402Z"
                        fill="#FFFFFF"
                      />
                    </g>
                  </>
                ) : null}
              </svg>

            </p>
          </div>
        </div>
      
      <section className="hero__section">
        <div className="container">
          <div className="hero__wrapper">
            <div className="hero__content">
              <div className="hero__title" id="hero_title">
                <h1>Your Financial Compass!</h1>
                <p>Analyze, Optimize, and Strategically Grow Your Wealth by Unlocking Tailored Financial Insights, Expert Guidance, and Proven Strategies to Secure a Prosperous Future.  </p>
                <Link to="/dashboard" className="btn">Go to Dashboard!</Link>
              </div>

              <div className="hero__counter">
                <div className="counter__item">
                  <h2>10+</h2>
                  <span className="counter__line yellow"></span>
                  <p>Years of Experience</p>
                </div>

                <div className="counter__item">
                  <h2>15+</h2>
                  <span className="counter__line purple"></span>
                  <p>Risk Assessments</p>
                </div>

                <div className="counter__item">
                  <h2>100%</h2>
                  <span className="counter__line iris"></span>
                  <p>Client Satisfaction</p>
                </div>
              </div>
            </div>

            <div className="hero__img">
              <div className="hero__img-wrapper">
                <img className="main__img" src="/images/finimg1.jpg" alt="Main doctor" />
                <div className="secondary-images">
                  <img className="secondary__img top" src="/images/finimg2.jpg" alt="Second doctor" />
                  <img className="secondary__img bottom" src="/images/finimg3.jpg" alt="Third doctor" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="services">
        <div className="container">
          <div className="services__header">
            <h2>Welcome to Byte Hogs, where your financial dreams meet smart solutions.</h2>
            <p>World class for everyone. Our financial system offers unmatched experience for your asset management.</p>
          </div>

          <div className="services__wrapper">
            <div className="service__item">
              <div className="service__icon">
                <img src="/images/exp.jpg" alt="Find a Doctor" width={120} />
              </div>
              <div className="service__content">
                <h2>Expense Tracker</h2>
                <p>Easily track your daily expenses and stay on top of your spending.</p>
                <Link to="/Tracker" className="arrow__link">
                  <BsArrowRight />
                </Link>
              </div>
            </div>

            <div className="service__item">
              <div className="service__icon">
                <img src="/images/budget.jpg" alt="Find a Location" width={120} />
              </div>
              <div className="service__content">
                <h2>Budgeting</h2>
                <p>Set personalized budgets to save more and spend smarter.</p>
                <Link to="/budgeting" className="arrow__link">
                  <BsArrowRight />
                </Link>
              </div>
            </div>

            <div className="service__item">
              <div className="service__icon">
                <img src="/images/income.jpg" alt="Book Appointment" width={120} />
              </div>
              <div className="service__content">
                <h2>Manage Income</h2>
                <p>Optimize your income streams for better financial stability.</p>
                <Link to="/income-management" className="arrow__link">
                  <BsArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;