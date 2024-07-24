import React, { useState } from "react";

const Tabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <div>
            <div className="flex sm:flex-col sm:text-nowrap sm:space-x-0 justify-center space-x-12 md:justify-start md:space-x-40 lg:space-x-32 xl:space-x-50">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className="font-bold rounded-md px-4 cursor-pointer text-center md:text-lg focus:text-indigo-600 focus:underline"
                        onClick={() => handleTabClick(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="mt-2 p-2 mx-2">
                {tabs.map(
                    (tab) =>
                        activeTab === tab.id && <div key={tab.id}>{tab.content}</div>
                )}
            </div>
        </div>
    );
};

export default Tabs;
