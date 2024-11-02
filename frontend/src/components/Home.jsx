import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const userToken = useSelector((state) => state.user.token);

  return (
    <div className="bg-gray-100 text-gray-800">
      <section className="bg-blue-600 text-white md:py-20 py-12">
        <div className="container mx-auto text-center">
          <h1 className="md:text-4xl text-3xl font-bold md:mb-4 mb-2">
            Welcome to the Helpdesk
          </h1>
          <p className="mb-8">Your go-to solution for all support needs.</p>
          {!userToken && (
            <Link
              to="/register"
              className="bg-white text-blue-600 font-semibold py-2 px-4 rounded shadow-lg transition duration-300 hover:bg-blue-500 hover:text-white"
            >
              Get Started
            </Link>
          )}
        </div>
      </section>

      <section className="md:py-20 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold md:mb-6 mb-2">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-white rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-2">Easy Ticketing</h3>
              <p>Quickly submit your tickets and get support within minutes.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p>
                Receive real-time updates on your ticket status and actions.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-2">
                User-friendly Interface
              </h3>
              <p>Navigate through our platform with ease and efficiency.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-800 text-white md:py-20 py-12">
        <div className="container mx-auto text-center">
          <h2 className="md:text-3xl text-2xl font-bold md:mb-6 mb-2">
            About Us
          </h2>
          <p className="mb-8 p-2">
            We are dedicated to providing top-notch support services to our
            users. Our team of experts is committed to resolving your issues
            swiftly and efficiently, ensuring a seamless experience. With our
            innovative ticketing system, you can rest assured that your concerns
            are in good hands.
          </p>
          <Link
            to="/register"
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-lg transition duration-300 hover:bg-blue-500"
          >
            Learn More
          </Link>
        </div>
      </section>

      <section className="md:py-20 py-12">
        <div className="container mx-auto text-center">
          <h2 className="md:text-3xl text-2xl font-bold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-white rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-2">
                Step 1: Submit a Ticket
              </h3>
              <p>
                Fill out a simple form detailing your issue, and submit your
                ticket.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-2">
                Step 2: Get Updates
              </h3>
              <p>
                Receive timely notifications about the status of your ticket.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-2">
                Step 3: Resolve the Issue
              </h3>
              <p>
                Our team will work to resolve your issue as quickly as possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-800 text-white md:py-20 py-12">
        <div className="container mx-auto text-center">
          <h2 className="md:text-3xl text-2xl font-bold md:mb-6 mb-2">FAQs</h2>
          <div className="space-y-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold">What is a support ticket?</h4>
              <p>
                A support ticket is a request for assistance submitted by a user
                regarding an issue they are facing.
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold">How do I submit a ticket?</h4>
              <p>
                You can submit a ticket through our ticketing system available
                in your dashboard.
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold">
                What should I include in my ticket?
              </h4>
              <p>
                Be sure to provide a detailed description of your issue,
                including any relevant screenshots or files.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="md:py-20 py-12">
        <div className="container mx-auto text-center">
          <h2 className="md:text-3xl text-2xl font-bold md:mb-6 mb-2">
            Contact Us
          </h2>
          <p className="mb-8">
            If you have any questions or need further assistance, feel free to
            reach out to us!
          </p>
          <Link
            to="/contact"
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-lg transition duration-300 hover:bg-blue-500"
          >
            Contact Support
          </Link>
        </div>
      </section>

      <section className="md:py-20 py-12 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="md:text-3xl text-2xl font-bold md:mb-6 mb-2">
            Join Us Today
          </h2>
          <p className="mb-8">
            Create your account to start enjoying our services.
          </p>
          {!userToken && (
            <Link
              to="/register"
              className="bg-white text-blue-600 font-semibold py-2 px-4 rounded shadow-lg transition duration-300 hover:bg-blue-500 hover:text-white"
            >
              Sign Up
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
