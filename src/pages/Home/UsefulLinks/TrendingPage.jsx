import React, { useState, useEffect } from 'react';
import topImg from "../../../assets/dashboard/topimgyoga.jpg";
import topicImg1 from "../../../assets/dashboard/topic1.jpg";
import topicImg2 from "../../../assets/dashboard/topic2.jpg";
import topicImg3 from "../../../assets/dashboard/topic3.jpg";
import topicImg5 from "../../../assets/dashboard/topic5.jpg";
import topicImg6 from "../../../assets/dashboard/topic6.jpg";
import topicImg7 from "../../../assets/dashboard/topic7.jpg";
import topicImg4 from "../../../assets/dashboard/topic4.png";
import { FaFacebook, FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const TrendingPage = () => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    // Toggle dark mode
    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
    };
  
    useEffect(() => {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }, [isDarkMode]);

  const topics = [
    {
      name: 'Yoga Retreats',
      image: topicImg1,  // Replace with actual image paths
      text: 'Yoga retreats are becoming increasingly popular among yogis who seek to escape from the stresses of modern life and immerse themselves in yoga and mindfulness practices. Retreats offer serene, natural settings that provide the perfect backdrop for self-reflection and rejuvenation. Attending a yoga retreat can help a person deepen their practice and reconnect with themselves, whether they are a seasoned yogi or a beginner. '
    },
    {
      name: 'Yoga for Kids',
      image: topicImg2,
      text: (<>
        Introducing children to yoga at an early age can have numerous benefits for their physical and emotional well-being. Teaching yoga to kids can help improve their focus, concentration, and flexibility, while also promoting creativity and relaxation. Parents are increasingly looking for ways to connect with their children and encourage healthy habits, which has led to a surge in interest in kids yoga classes. Interested in exploring the world of kids yoga? Check out <a href="https://www.swastiyogacenter.com/swasti-yoga-sanskaram/" className="text-red-800 hover:text-secondary font-bold" target="_blank" rel="noopener noreferrer">Kids Yoga Sanskaram</a>{" "} for an enriching and fun-filled experience!
      </>)
    },
    {
      name: 'Hybrid Yoga Programs',
      image: topicImg3,
      text: 'In the wake of the COVID-19 pandemic, hybrid yoga programs have become increasingly popular. This trend combines online and in-person classes, allowing students to have the flexibility to practice yoga in both virtual and physical spaces. This means that you can access a wider range of classes and teachers while still having the opportunity to practice in person. Hybrid yoga programs provide flexibility, which is essential in todays fast-paced world. Moreover, hybrid yoga combines the benefits of both worlds- Offline classes allow yogis to have a more personalized experience and build a close-knit community. At the same time, online classes are more flexible and offer variety. In addition to flexibility, hybrid yoga programs also offer affordability and accessibility for all yogis. By promoting the flexibility and accessibility of hybrid yoga programs, we can empower people from all walks of life to access the incredible benefits of yoga.'
    },
    {
      name: 'Yoga Meets Technology',
      image: topicImg4,
      text: 'Yoga-meets-tech is a trend that is expected to take off in 2024, as technology has become an integral part of our daily lives. There is now a growing market for gadgets like smart yoga mats, wearable technology, and heart rate monitors that can help individuals track and analyze their biometric data in real-time. Instructors are already experimenting with virtual reality meditation classes and using biometric data to customize classes based on individual needs. The integration of technology in a yoga practice opens up a whole new world of opportunity for fitness practices.'
    },
    {
      name: 'Outdoor Yoga',
      image: topicImg5,
      text: 'Many yogis prefer to practice in the great outdoors and connect with nature. Practicing yoga in a serene, natural setting can be deeply therapeutic and rejuvenating. This trend became increasingly popular because of the rise of eco-tourism, and due to the pandemic, many people turned to outdoor practices for the natural release of their anxieties.'
    },
    {
      name: 'Aqua Yoga',
      image: topicImg6,
      text: (<>
        Aqua Yoga is a yoga trend that involves practicing yoga poses in a swimming pool or other aquatic environment. This practice combines the benefits of traditional yoga like improved flexibility, reduced stress, and increased strength with the low-impact nature of water exercise. The buoyancy of the water makes it easier to perform certain poses that might otherwise be challenging, making this an excellent option for people of all fitness levels and abilities. The water also creates a soothing, meditative environment that can enhance the relaxation and mindfulness aspects of a yoga practice. Aqua Yoga is an emerging trend in the yoga world and is expected to continue growing in popularity in years to come. Curious about the healing benefits of Aqua Yoga? Dive into <a href="https://www.swastiyogacenter.com/aqua-yoga-therapy/" className="text-red-800 hover:text-secondary font-bold" target="_blank" rel="noopener noreferrer">Aqua Yoga Therapy Courses</a>{" "}today!
      </>)
    },
    {
      name: 'Pranayama / Breathwork Classes',
      image: topicImg7,
      text: 'Pranayama, or breathwork, has long been a fundamental part of traditional yoga practice. In recent years, however, it has emerged as a distinct and increasingly popular trend in the yoga world. Pranayama classes are dedicated to teaching individuals various breathing techniques that can help them achieve greater relaxation, focus, and control over their physical and emotional states. Often led by dedicated pranayama instructors, these classes can range from simple introductory sessions to more advanced courses focused on specific techniques. Breathwork classes can help individuals better cope with stress, anxiety, and other mental and emotional challenges, making it a particularly important trend for modern practitioners.'
    },
  ];

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      {/* Light/Dark Mode Toggle */}
      <div className="fixed top-4 right-4">
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-opacity-50 bg-gray-700 text-white rounded-full hover:bg-opacity-75 transition-all duration-300"
        >
          {isDarkMode ? '🔆' : '🌙'}
        </button>
      </div>

      {/* Top big image */}
      <div className="h-[80vh] bg-cover bg-center" style={{ backgroundImage: `url(${topImg})` }}>
        <div className="bg-black bg-opacity-40 h-full flex items-center justify-center">
          <h1 className="text-5xl text-white font-bold">Trending in Yoga</h1>
        </div>
      </div>

      {/* Yoga Description Paragraph */}
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg">
        Yoga is more than just a workout it is a practice that encompasses physical, mental, and spiritual well-being. 
          Whether you are looking to improve your flexibility, reduce stress, or find a sense of inner peace, yoga offers a 
          variety of techniques to suit your needs. From mindfulness and meditation to strength-building poses, yoga is 
          a holistic way to nurture your body and mind.</p>
      </div>

      {/* Trending Topics */}
      <div className="container mx-auto py-10">
        {topics.map((topic, index) => (
          <div key={index} className="mb-10">
            <h2 className="text-3xl font-bold mb-4">{index + 1}. {topic.name}</h2>
            <img src={topic.image} alt={topic.name} className="w-full h-auto rounded-lg mb-4 shadow-lg" />
            <p className="text-lg">{topic.text}</p>
          </div>
        ))}
      </div>

      {/* Conclusion */}
      <div className={`py-10 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Conclusion</h2>
          <p className="text-lg">
          Yoga continues to evolve, and these trends reflect the diverse ways people are embracing the practice.
          Whether you're looking for mindfulness, strength, or relaxation, there's a yoga style suited for everyone. In conclusion, these 7 latest yoga trends in 2024 highlight the evolution and development of yoga as a practice. With new technologies, innovative twists, and a focus on health, wellness, and relaxation, yoga continues to grow and adapt to meet the diverse needs of its practitioners.</p>
        </div>
      </div>
      <footer className='bg-gray-800 text-white py-8'>
            {/* Social Media Icons */}
            <div className='flex justify-center space-x-6 mb-4'>
                <a href='https://youtube.com' target='_blank' rel='noreferrer' className='hover:text-red-600'>
                    <FaYoutube size={30} />
                </a>
                <a href='https://facebook.com' target='_blank' rel='noreferrer' className='hover:text-blue-600'>
                    <FaFacebook size={30} />
                </a>
                <a href='https://instagram.com' target='_blank' rel='noreferrer' className='hover:text-pink-400'>
                    <FaInstagram size={30} />
                </a>
            </div>

            {/* Navigation Links */}
            <div className='flex justify-center space-x-10'>
                <NavLink to="/" className='hover:text-secondary'>
                    Home
                </NavLink>
                <NavLink to="/classes" className='hover:text-secondary'>
                    Classes
                </NavLink>
                <NavLink to="/instructors" className='hover:text-secondary'>
                    Instructors
                </NavLink>
                <NavLink to="/contact-us" className='hover:text-secondary'>
                    Contact Us
                </NavLink>
            </div>
            {/* Copyright Section */}
            <div className='text-center text-sm text-gray-400 my-2'>
                © {new Date().getFullYear()} YogaMaster. All rights reserved.
            </div>
        </footer>
    </div>
    
  );
};

export default TrendingPage;
