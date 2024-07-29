import React, { useState } from "react";

const Tabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <div>
            <div className="flex sm:text-sm sm:text-nowrap sm:space-x-0 justify-center space-x-12 md:justify-start md:space-x-10 lg:space-x-32 xl:space-x-50 w-fit m-auto shadow-xl">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`font-bold rounded-md px-4 cursor-pointer text-center md:text-lg ${activeTab === tab.id ? "underline" : ""
                            }`}
                        onClick={() => handleTabClick(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="flex items-center justify-center p-4 my-5">
                {tabs.map(
                    (tab) =>
                        activeTab === tab.id && <div key={tab.id}>{tab.content}</div>
                )}
            </div>
        </div>
    );
};

export default Tabs;
