import React from 'react';

const Progression = () => {

    const studentProgressData = [
        {
            studentName: "John Doe",
            courses: [
                { courseName: "Mathématiques", progress: 75 },
                { courseName: "Physique", progress: 60 },
            ],
        },
        {
            studentName: "Jane Smith",
            courses: [
                { courseName: "Mathématiques", progress: 90 },
                { courseName: "Physique", progress: 80 },
            ],
        },
        // Ajoute plus de données ici...
    ];

    return (
        <div className="space-y-4">
            {studentProgressData.map((progress, index) => (
                <div key={index} className="shadow-md p-4 rounded-lg bg-white">
                    <h3 className="font-bold mb-2">{progress.studentName}</h3>
                    {progress.courses.map((course, courseIndex) => (
                        <div key={courseIndex} className="mb-2">
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-700">{course.courseName}</span>
                                <span className="text-gray-500">{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Progression;
