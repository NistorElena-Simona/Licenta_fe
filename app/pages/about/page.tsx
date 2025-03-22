"use client";

import { Image } from "@nextui-org/react";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6">Why Choose Us?</h2>
        <p className="text-2xl max-w-4xl mx-auto mb-12 text-gray-600 leading-relaxed">
          We provide developers with an intuitive and fully customizable React UI library 
          that allows you to create beautiful, responsive websites with minimal effort. 
          Whether you're a beginner or a seasoned developer, our library is designed to 
          streamline your workflow and enhance your design experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-64 w-full relative overflow-hidden rounded-xl shadow-lg">
            <Image
              src="https://img.freepik.com/free-photo/muscular-man-doing-deadlift-training-gym_651396-1095.jpg"
              alt="Fitness Overview"
              classNames={{
                wrapper: "w-full h-full",
                img: "w-full h-full object-cover"
              }}
            />
          </div>
          <div className="p-4 text-center">
            <h3 className="text-2xl font-semibold mb-3">Fast Performance</h3>
            <p className="text-gray-600">
              Our components are optimized for fast performance and quick load times, 
              ensuring a seamless experience for your users.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="h-64 w-full relative overflow-hidden rounded-xl shadow-lg">
            <Image
              src="https://facerealumii.ro/wp-content/uploads/2017/11/corpul-uman-capodopera-creatiei-1024x585.jpg"
              alt="Easy Customization"
              classNames={{
                wrapper: "w-full h-full",
                img: "w-full h-full object-cover"
              }}
            />
          </div>
          <div className="p-4 text-center">
            <h3 className="text-2xl font-semibold mb-3">Easy Customization</h3>
            <p className="text-gray-600">
              Customize the appearance and behavior of every component with simple 
              and clear API options to fit your brand and style.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="h-64 w-full relative overflow-hidden rounded-xl shadow-lg">
            <Image
              src="https://media.ziaruldeiasi.ro/2024/01/220541_142344_stiri_corp-uman.jpg"
              alt="Human Body"
              classNames={{
                wrapper: "w-full h-full",
                img: "w-full h-full object-cover"
              }}
            />
          </div>
          <div className="p-4 text-center">
            <h3 className="text-2xl font-semibold mb-3">Human Body</h3>
            <p className="text-gray-600">
              Our library is built to be flexible, allowing you to create a wide 
              variety of designs, from minimal to complex layouts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
