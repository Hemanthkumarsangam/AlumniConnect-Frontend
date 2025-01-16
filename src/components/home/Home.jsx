import React from 'react';
import './home.css';
import { FaSquareXTwitter, FaSquareInstagram, FaLinkedin } from "react-icons/fa6";
import Navbar from './Navbar';
import { Carousel } from 'react-responsive-carousel'; // New slider import
import { Link } from 'react-router-dom'; // Import Link for navigation
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

function Home() {
  const alumni = [
    {sno: "1", name: "John", designation: "Software Developer", location: 'Los Angeles', imageURL: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2460'},
    {sno: "2", name: "Jane", designation: "Product Manager", location: 'New York', imageURL: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2460'},
    {sno: "3", name: "Alex", designation: "UI/UX Designer", location: 'San Francisco', imageURL: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2460'},
    // additional alumni...
  ];

  const eventPics = [
    {imgUrl: 'https://media.istockphoto.com/id/1486287149/photo/group-of-multiracial-asian-business-participants-casual-chat-after-successful-conference-event.jpg?s=612x612&w=0&k=20&c=aWW3omXKHjxBkd58NouVo8GsapvA2KXO9RwuokHhvFk=', type: 'Event Type'},
    {imgUrl: 'https://media.istockphoto.com/id/1486287149/photo/group-of-multiracial-asian-business-participants-casual-chat-after-successful-conference-event.jpg?s=612x612&w=0&k=20&c=aWW3omXKHjxBkd58NouVo8GsapvA2KXO9RwuokHhvFk=', type: 'Event Type'},
    {imgUrl: 'https://media.istockphoto.com/id/1486287149/photo/group-of-multiracial-asian-business-participants-casual-chat-after-successful-conference-event.jpg?s=612x612&w=0&k=20&c=aWW3omXKHjxBkd58NouVo8GsapvA2KXO9RwuokHhvFk=', type: 'Event Type'},
    // additional events...
  ];

  return (
    <div className="home">
      <div className="header">
        <Navbar />
        <div className="bg-section text-white relative">
          <div className="overlay text-center" style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '2rem',
          }}>
            <h1 className="text-6xl font-bold mb-3">Alumni Connect</h1>
            <pre className="text-2xl font-semibold">Reconnect   Inspire   Empower</pre>
          </div>
        </div>
      </div>

      {/* Celebrating Excellence Section */}
      <div className="celebrating-excellence text-center py-16" style={{ backgroundColor: '#f8f8f8' }}>
        <h2 className="text-4xl font-semibold text-black">Celebrating Excellence</h2>
        <p className="mt-4 text-xl text-gray-700">Highlighting the achievements and impact of our top alumni who are making a difference in the world.</p>
      </div>

      <div className="userCardHolder mt-10">
        {alumni.map((user, key) => (
          <div key={key} className={`userCard bg-white shadow-md rounded-lg p-4 ${key % 2 === 0 ? 'left' : 'right'}`}>
            <center><img src={user.imageURL} alt="user" className="rounded-full w-24 h-24" /></center>
            <b className="block mt-3 text-lg">{user.name}</b>
            <p>{user.designation}</p>
            <p>{user.location}</p>
            <center>
              <button className="p-2 rounded-lg mt-2 bg-red-950 hover:bg-red-700 text-white transition-all">
                View Profile
              </button>
            </center>
          </div>
        ))}
      </div>

      <div className="event-highlights text-center py-16" style={{ backgroundColor: '#f8f8f8' }}>
        <h2 className="text-4xl font-semibold text-black">Event Highlights</h2>
      </div>

      {/* Event Slider with Random Text Beside */}
      <div className="flex justify-between px-10 py-4">
        <div className="slider-container" style={{ width: '75%' }}>
          <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
            {eventPics.map((event, key) => (
              <div className="eventCard" key={key}>
                <img src={event.imgUrl} alt="event" className="eventCardImg" />
                <p className="text-center mt-2 text-lg">{event.name}</p>
              </div>
            ))}
          </Carousel>
        </div>

        <div className="event-description" style={{ width: '20%' }}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia urna at scelerisque facilisis. Fusce nec ex at metus cursus posuere. Ut bibendum arcu ut mauris posuere, et pretium dui mollis. Integer lacinia tristique est. Duis elementum lorem et orci vehicula, in scelerisque felis tincidunt.</p>
          
          {/* View More Events Button below text */}
          <div className="text-center py-4">
            <Link to="/events">
              <button className="view-more-button">
                View More Events
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="footer" style={{ backgroundColor: '#333333', color: '#fff', padding: '30px 0' }}>
  <div className="footer-content container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
    {/* Footer Left - Contact Info */}
    <div className="footer-left">
      <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
      <p className="mb-2">Email: <a href="mailto:support@alumni-connect.com" className="text-red-500 hover:text-red-700">support@alumni-connect.com</a></p>
      <p className="mb-2">Phone: <span>+1 (123) 456-7890</span></p>
      <p>Address: <span>123 Alumni St, City, Country</span></p>
    </div>

    {/* Footer Center - Institution Info and Image */}
    <div className="footer-center">
      <h3 className="text-2xl font-semibold mb-4">About the Institution</h3>
      <p className="text-gray-300 mb-4">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia urna at scelerisque facilisis. Fusce nec ex at metus cursus posuere. Ut bibendum arcu ut mauris posuere, et pretium dui mollis. Integer lacinia tristique est. Duis elementum lorem et orci vehicula, in scelerisque felis tincidunt.
      </p>
      <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSddivehiS2C1N_YmqZNRftN-q_VWDP262iMw&s" 
        alt="Institution Building" 
        className="w-full rounded-md mt-4"
        style={{ maxHeight: '250px', objectFit: 'cover' }} 
      />
    </div>

    {/* Footer Right - Social Media and Legal */}
    <div className="footer-right">
      <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
      <div className="flex justify-center space-x-6 mb-4">
        <a href="https://twitter.com" target="_blank" className="text-2xl text-gray-300 hover:text-white transition-all">
          <FaSquareXTwitter />
        </a>
        <a href="https://instagram.com" target="_blank" className="text-2xl text-gray-300 hover:text-white transition-all">
          <FaSquareInstagram />
        </a>
        <a href="https://linkedin.com" target="_blank" className="text-2xl text-gray-300 hover:text-white transition-all">
          <FaLinkedin />
        </a>
      </div>
      
      {/* Footer Bottom - Legal and Feedback */}
      <div className="footer-bottom text-center py-4 border-t border-gray-700 mt-6">
        <p className="text-sm text-gray-300">© 2025 Alumni Connect. All Rights Reserved.</p>
        <div className="mt-2 space-x-4">
          <Link to="/privacyPolicy" className="text-gray-300 hover:text-white">Privacy Policy</Link>
          <Link to="/terms" className="text-gray-300 hover:text-white">Terms & Conditions</Link>
          <Link to="/feedback" className="text-gray-300 hover:text-white">Feedback</Link>
        </div>
      </div>
    </div>
  </div>
</div>


    </div>
  );
}

export default Home;