import React from "react";

function Titre({ titre, bold, size, className }) {
    const titleStyle = {
        fontWeight: bold ? "bold" : "500",
        fontSize: size ? "25px" : "",
        color: 'var(--tertiary-color)',
        padding: '16px 16px',
    };

    return (
        <div style={titleStyle} className={className}>{titre}</div>
    );
}

export default Titre;
