import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { FaBook, FaChartLine, FaUsers } from "react-icons/fa";
import { useGetAllUsersQuery } from "../../features/users/usersAPI";
import CountUp from 'react-countup';
import Titre from "../../components/Titre";
import Tabs from "../../components/Tabs";
import Card from "../../components/Card";
import AOS from "aos";
import "aos/dist/aos.css";
import Temoignage from "../../components/Temoignage";
import Rejoindre from "../../components/Rejoindre";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";

export default function Home() {
    const { data, isLoading } = useGetAllUsersQuery();
    const userCount = data?.length || 0;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleMessageClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    if (isLoading) {
        return <div><Loader /></div>;
    }

    const tabs = [
        {
            id: "Troisieme",
            label: "Troisieme",
            content: <Card programType="Troisieme" />
        },
        {
            id: "Seconde",
            label: "Seconde",
            content: <Card programType="Second" />
        },
        {
            id: "Premier",
            label: "Premier",
            content: <Card programType="Premier" />
        },
        {
            id: "Terminal",
            label: "Terminal",
            content: <Card programType="Terminal" />
        }
    ];

    const card = [
        { icon: <FaUsers color="white" />, number: userCount, text: "utilisateurs", cardText: "Nombre d'utilisateurs inscrits sur la plateforme." },
        { icon: <FaChartLine color="white" />, number: 231, text: "projets", cardText: "Projets réalisés par les utilisateurs." },
        { icon: <FaBook color="white" />, number: 1300, text: "Cours", cardText: "Cours disponibles sur la plateforme." }
    ];

    return (
        <div className="flex flex-col sm:my-5 space-y-4">
            <div className="flex flex-col items-center space-y-2">
                <p className="text-4xl font-bold text-center sm:text-2xl">Bienvenue sur Sen ~ Learning</p>
                <p className="text-center">
                    Dans cette plateforme, vous trouverez une multitude de cours et de{" "}
                    <br />
                    ressources pour améliorer vos compétences et vos connaissances. <br />
                    Inscrivez-vous dès aujourd'hui pour commencer votre parcours
                    d'apprentissage!
                </p>
            </div>
            <div className="flex space-x-4 items-center justify-center">
                <Link to={"/register"} className="btn-custom">Inscription</Link>
                <Link to={"/login"} className="btn-custom">Connexion</Link>
                <button onClick={handleMessageClick} className="btn-custom">Message</button>
            </div>
            <div className="flex sm:flex-col justify-center items-center gap-4 mt-3">
                {card.map((item, index) => (
                    <div
                        key={index}
                        className="bg-indigo-600 w-[300px] md:w-[240px] h-60 p-4 rounded-lg transition-custom hover:scale-105 shadow-lg"
                        data-aos="fade-up"
                    >
                        <div className="flex flex-col gap-3">
                            <span className="w-[50px] h-[50px] border-2 border-white rounded-full flex justify-center items-center">
                                {item.icon}
                            </span>
                            <span className="text-white font-bold text-xl">
                                <CountUp end={item.number} duration={2.5} /> {item.text}
                            </span>
                        </div>
                        <div className="border-b-4 mt-3 w-[100px] border-white"></div>
                        <div className="text-white font-bold mt-2">
                            <p>{item.cardText}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Titre titre={"----Les Programmes----"} size={"50px"} className={"text-center uppercase"} bold={true} />
            <div data-aos="zoom-in">
                <Tabs tabs={tabs} />
            </div>
            <Titre titre={"----Découvrez pourquoi les utilisateurs nous font confiance----"} size={"50px"} className={"text-center uppercase"} bold={true} />
            <div data-aos="fade-in">
                <Temoignage />
            </div>
            <div>
                <Rejoindre isOpen={isModalOpen} onModalClose={handleModalClose} />
            </div>
            <Footer />
        </div>
    );
}
