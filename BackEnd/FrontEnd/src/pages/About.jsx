import React from "react";
import { useAuth } from "../context/AuthProvider";

function About() {
  const { profile } = useAuth();
  console.log(profile);
  return (
    <div className="bg-pink-300">
    <div className="container mx-auto  p-4 space-y-9 ">
    <h1 className="text-3xl font-bold mb-6 text-blue-700">About Harbor</h1>
    <p className="text-lg leading-7">
      Welcome to{" "}
      <strong className="text-blue-800 font-semibold hover:scale-105 duration-500">
        Harbor
      </strong>
      , your safe haven for sharing thoughts, ideas, and stories. Inspired by the tranquility and strength of a harbor, this platform is designed to be a space where creators, writers, and thinkers can dock their creativity, explore new horizons, and connect with like-minded individuals.
    </p>
    <h2 className="font-semibold text-blue-800 text-xl">Our Mission</h2>
    <p>
      At Harbor, we believe that every voice matters. Our mission is to provide a
      user-friendly, secure, and visually captivating platform for bloggers and
      readers alike. Whether you're documenting your journey, sharing your
      expertise, or simply expressing yourself, Harbor ensures that your content
      finds a meaningful audience.
    </p>
    <h2 className="font-semibold text-blue-800 text-xl">What Makes Harbor Unique?</h2>
    <ul className="list-disc pl-6 space-y-2">
      <li>
        <strong className="text-blue-600">Seamless Design:</strong> Harbor boasts
        an intuitive interface, ensuring that your blogging experience is as
        smooth as it is enjoyable.
      </li>
      <li>
        <strong className="text-blue-600">Customization:</strong> Tailor your blog
        to reflect your personality and style, making your space truly unique.
      </li>
      <li>
        <strong className="text-blue-600">Community Focus:</strong> Engage with a
        supportive community of readers and writers who share your passion for
        ideas and storytelling.
      </li>
    </ul>
    <h2 className="font-semibold text-blue-800 text-xl">Why the Name "Harbor"?</h2>
    <p>
      A harbor symbolizes a place of safety, exploration, and connection. Just as
      ships find refuge and purpose at a harbor, our platform serves as a digital
      sanctuary for creators to dock their ideas and launch them into the world.
    </p>
    <h2 className="font-semibold text-blue-800 text-xl">
      Join the Journey
    </h2>
    <p>
      Whether you're an experienced blogger or just starting your creative
      adventure, Harbor is here to support and amplify your voice. Together,
      let's craft stories that inspire, educate, and connect us all.
    </p>
    <p className="text-center font-semibold text-blue-600">
      Welcome aboard Harbor—where creativity sets sail.
    </p>
  </div>
  </div>
  
  );
}

export default About;