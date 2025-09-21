import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleButtonClick = (action:any) => {
    setMessage(`Action: "${action}" was clicked!`);
    setTimeout(() => setMessage(''), 3000);
  };

  const menuItems = [
    { name: 'Features', href: '#features' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Pricing', href: '#pricing' },
  ];

  const features = [
    {
      title: 'Real-Time Sync',
      description: 'Attendance data is instantly synced across all devices, ensuring everyone has the most up-to-date information.',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8.01l-9 9z"/>
        </svg>
      ),
    },
    {
      title: 'Automated Reporting',
      description: 'Generate insightful reports on attendance trends, absentees, and more with just a few clicks.',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM5 19V5h14l.001 14H5zm2-3h10v2H7v-2zm0-4h10v2H7v-2zm0-4h10v2H7V9z"/>
        </svg>
      ),
    },
    {
      title: 'Easy Student Management',
      description: 'Quickly add, edit, or remove students and classes with an intuitive, user-friendly interface.',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z"/>
        </svg>
      ),
    },
    {
      title: 'Secure & Private',
      description: 'All data is encrypted and securely stored, ensuring the privacy of your students and staff.',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99l-5 2.5V12l5-2.5 5 2.5v2.49l-5-2.5zm0-2.49l-5-2.5V8.5l5-2.5 5 2.5V9.5z"/>
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Message Box for UI feedback */}
      <div
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full text-white bg-blue-600 shadow-xl transition-opacity duration-500 ease-in-out ${
          message ? 'opacity-100 block' : 'opacity-0 hidden'
        }`}
      >
        {message}
      </div>

      {/* Header & Navigation */}


      {/* Hero Section */}
      <main className="bg-gray-100 py-16 md:py-24 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Seamless Attendance. <br className="hidden sm:inline" /> Simplified for Schools.
          </h2>
          <p className="mt-4 md:mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            AttenDone streamlines the entire attendance process, saving teachers valuable time and providing real-time insights for administrators.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button onClick={() => navigate('/login')} className="w-full sm:w-auto px-8 py-3 rounded-full bg-blue-500 text-white font-semibold text-lg shadow-xl hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105">
              Start with Free Account
            </button>
           
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 px-4 md:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900">Key Features</h3>
          <p className="text-center text-gray-600 mt-2 max-w-xl mx-auto">Designed to make attendance tracking as simple and efficient as possible for everyone involved.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col items-start text-left hover:shadow-lg transition-shadow duration-300">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mb-4">{feature.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section id="testimonials" className="py-16 md:py-24 px-4 md:px-8 lg:px-12 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900">What Our Schools Say</h3>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-200">
              <p className="text-gray-700 italic leading-relaxed">
                "Attendance Pro has completely transformed our morning routine. What used to take 15 minutes now takes less than 2, and the reporting for our district is a lifesaver."
              </p>
              <div className="mt-4 text-sm font-semibold text-gray-900">
                <p>— Emily Carter</p>
                <p className="text-gray-500 font-normal">Principal, Oakwood Elementary School</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-200">
              <p className="text-gray-700 italic leading-relaxed">
                "My teachers love the simplicity and ease of use. The system is intuitive, and we can pull attendance records instantly for parent meetings or audits."
              </p>
              <div className="mt-4 text-sm font-semibold text-gray-900">
                <p>— John Davis</p>
                <p className="text-gray-500 font-normal">Superintendent, Northwood School District</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Pricing/CTA Section */}
      <section id="pricing" className="py-16 md:py-24 px-4 md:px-8 lg:px-12 bg-blue-600 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold">Ready to Simplify Attendance?</h3>
          <p className="mt-4 text-lg md:text-xl opacity-90">
            Join thousands of schools that are saving time and gaining valuable insights with our platform. Get started for free today!
          </p>
          <button onClick={() =>navigate('/login')} className="mt-8 px-10 py-4 rounded-full bg-white text-blue-600 font-semibold text-lg shadow-xl hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105">
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 lg:px-12 bg-gray-800 text-gray-300 text-center text-sm">
        <p>© 2024 AttenDone. All rights reserved.</p>
        <div className="mt-2 flex justify-center space-x-4">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <span className="text-gray-500">|</span>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
