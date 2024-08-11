import React, { useState } from 'react';
import { useGetAllUsersQuery } from "../features/users/usersAPI";
import Profile from '../assets/user.png'; // Remplacez par le chemin correct vers votre image de profil par défaut

const IconWithDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: users, isLoading } = useGetAllUsersQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Filtrer pour récupérer uniquement les administrateurs
  const adminUsers = users?.filter(user => user.role === 'enseignant') || [];

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative p-2">
      <div className="rounded-full flex items-center cursor-pointer">
        {adminUsers && adminUsers.slice(0, 5).map((admin, index) => (
          <img
            key={index}
            src={admin.profileImageUrl || Profile}
            alt="Souscrit avatar"
            className={`w-[41px] h-[41px] object-cover rounded-full ${index !== 0 && "-ml-3"} bg-gray-100`}
          />
        ))}
        <div
          onClick={handleToggleDropdown}
          className="border rounded-full bg-white w-[41px] h-[41px] p-2 object-cover flex items-center justify-center cursor-pointer -ml-3"
        >
          {adminUsers.length || "0"}+
        </div>
      </div>
      {isOpen && (
        <div className="absolute w-[18rem] sm:text-sm bg-white shadow-lg rounded-md p-2 z-10">
          <div className="flex justify-between border-b pb-2 mb-2">
            <div className="left">
              <span className="font-bold">Tous</span>
              <span className="ml-2">({adminUsers.length})</span>
            </div>
            <div className="right">
              <button className="font-bold text-sm" onClick={handleToggleDropdown}>X</button>
            </div>
          </div>
          <ul className="border-b">
            {adminUsers && adminUsers.map((admin, k) => (
              <li className="flex items-center gap-2 mb-2" key={k}>
                <img src={admin.profileImageUrl || Profile} alt="Une image" className="w-8 h-8 object-cover rounded-full" />
                <span>{admin.username} {admin.nom}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IconWithDropdown;
