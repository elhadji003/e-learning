import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { usePostCoursMutation } from '../../features/cours/coursAPI';

const AddCours = () => {
    const [postCours] = usePostCoursMutation();
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        category: '',
        level: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await postCours(courseData).unwrap();
            toast.success('Cours créé avec succès !');
            setCourseData({ title: '', description: '', category: '', level: '' });
        } catch (error) {
            toast.error('Erreur lors de la création du cours : ' + error.message);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-5 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Créer un Cours</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="title">Titre</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={courseData.title}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={courseData.description}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="category">Catégorie</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={courseData.category}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="level">Niveau</label>
                    <select
                        id="level"
                        name="level"
                        value={courseData.level}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Sélectionnez un niveau</option>
                        <option value="troisieme">Troisième</option>
                        <option value="seconde">Seconde</option>
                        <option value="premier">Première</option>
                        <option value="terminal">Terminale</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Créer le Cours
                </button>
            </form>
        </div>
    );
};

export default AddCours;
