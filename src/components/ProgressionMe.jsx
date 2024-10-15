import React from 'react';

const ProgressionMe = () => {

    const studentProgressData = [
        {
            courses: [
                { courseName: "Mathématiques", progress: 75 },
                { courseName: "Physique-Chimie", progress: 60 },
                { courseName: "Histoire et Géographie", progress: 60 },
                { courseName: "Français", progress: 100 },
                { courseName: "Anglais", progress: 60 },
                { courseName: "Espanol", progress: 60 },
                { courseName: "SVT", progress: 60 },
                { courseName: "Arabe", progress: 60 },
            ],
        },

    ];

    const isFinish = (progress) => progress === 100

    return (
        <div className="space-y-4">
            {studentProgressData.map((progress, index) => (
                <div key={index} className="shadow-md p-4 rounded-lg bg-white grid grid-cols-2 gap-x-3 sm:grid-cols-1 mt-2">
                    {progress.courses.map((course, courseIndex) => (
                        <div key={courseIndex} className="mb-2">
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-700">{course.courseName}</span>
                                <span className="text-gray-500">{isFinish(course.progress) ? "terminé" : `${course.progress}`}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className={`h-2 rounded-full ${isFinish(course.progress) ? 'bg-green-500' : 'bg-indigo-600'}`} style={{ width: `${course.progress}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ProgressionMe;
