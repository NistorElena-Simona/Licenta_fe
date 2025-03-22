// import React from 'react';
// import './page.css'; // pentru stiluri personalizate

// function ExercisesPage() {
//   const exercises = [
//     { name: 'Abs', count: 28 },
//     { name: 'Back', count: 25 },
//     { name: 'Biceps', count: 24 },
//     { name: 'Calf', count: 9 },
//     { name: 'Chest', count: 37 },
//     { name: 'Forearms', count: 4 },
//     { name: 'Legs', count: 40 },
//     { name: 'Shoulders', count: 22 },
//     { name: 'Triceps', count: 20 },
//   ];

//   return (
//     <div className="exercises-container text-indigo-600 dark:bg-black mb-8">
      
//       <div className="exercise-list ">
//         {exercises.map((exercise, index) => (
//           <div key={index} className="exercise-item flex items-center bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition">
//             <div className="exercise-item flex items-center bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition">
//               {/* Poți adăuga imagini specifice pentru fiecare parte a corpului */}
//               <img src={`images/${exercise.name.toLowerCase()}.png`} alt={`${exercise.name}`} />
//             </div>
//             <div className="exercise-info ">
//               <h2>{exercise.name}</h2>
//               <p className="text-black dark:text-white">{exercise.count} exercises</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ExercisesPage;




// import React from 'react';
// import './page.css'; // pentru stiluri personalizate


// function ExercisesPage() {
//   const exercises = [
//     { name: 'Abs', count: 28 },
//     { name: 'Back', count: 25 },
//     { name: 'Biceps', count: 24 },
//     { name: 'Calf', count: 9 },
//     { name: 'Chest', count: 37 },
//     { name: 'Forearms', count: 4 },
//     { name: 'Legs', count: 40 },
//     { name: 'Shoulders', count: 22 },
//     { name: 'Triceps', count: 20 },
//   ];

//   return (
//     <div className="exercises-container text-indigo-600 dark:bg-black mb-8">
//       <h1 className="text-3xl font-bold mb-6">Exercises</h1>
//       <div className="exercise-list space-y-4">
//         {exercises.map((exercise, index) => (
//           <div
//             key={index}
//             className="exercise-item flex items-center bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
//           >
//             {/* Imagine specifică pentru fiecare parte a corpului */}
//             <img
//               src={`/images/${exercise.name.toLowerCase()}.jpg`}
//               alt={exercise.name}
//               className="w-16 h-16 mr-4 rounded-full"
//             />
//             <div className="exercise-info">
//               <h2 className="text-xl font-semibold">{exercise.name}</h2>
//               <p className="text-black dark:text-white">{exercise.count} exercises</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ExercisesPage;


import React from "react";

function ExercisesPage() {
  const exercises = [
    { name: "Abs", count: 28 },
    { name: "Back", count: 25 },
    { name: "Biceps", count: 24 },
    { name: "Calf", count: 9 },
    { name: "Chest", count: 37 },
    { name: "Forearms", count: 4 },
    { name: "Legs", count: 40 },
    { name: "Shoulders", count: 22 },
    { name: "Triceps", count: 20 },
  ];

  return (
    <div className="p-6 bg-background text-foreground ">
      <h1 className="text-3xl font-bold mb-6">Exercises</h1>

      <div className="flex flex-col gap-5">
        {exercises.map((exercise, index) => (
          <div
            key={index}
            className="flex items-center bg-rowground border-2 border-gray-400 rounded-lg"
          >
            {/* Imagine specifică pentru fiecare exercițiu */}
            <img
              src={`/images/${exercise.name.toLowerCase()}.jpg`}
              alt={exercise.name}
              className="w-16 h-16 rounded-lg mr-4"
            />
            <div>
              <h2 className="text-xl font-semibold">{exercise.name}</h2>
              <p className="text-gray-700 dark:text-gray-300">{exercise.count} exercises</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExercisesPage;

