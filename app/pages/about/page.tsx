"use client";

import { Image } from "@nextui-org/react";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6">Why Choose Us?</h2>
        <p className="text-2xl max-w-4xl mx-auto mb-12 text-gray-600 leading-relaxed">
        Welcome to Fitness-App, your all-in-one platform for discovering, learning, and tracking exercises tailored to every muscle group. Whether you are a beginner or an advanced athlete, our application helps you explore detailed exercise instructions, muscle anatomy, and video demonstrations to ensure proper form and maximize your results.
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
            Our platform is optimized for speed, ensuring that you can browse exercises, watch videos, and manage your workouts without any delays. Enjoy a seamless and responsive experience, whether you’re at home, in the gym, or on the go.

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
            Fitness-App allows you to personalize your workout experience. As an admin, you can easily add new exercises, update muscle information, and enrich each entry with images and video tutorials. The intuitive interface makes it simple for everyone to find and manage the content they need.
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
            Explore detailed muscle anatomy and understand how each exercise targets specific muscle groups. Our visual guides and video demonstrations help you perform every movement with correct form, reducing the risk of injury and maximizing your progress.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
