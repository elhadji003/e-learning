import React from "react";

function Titre({ titre, bold, size }) {
    const titleStyle = {
        fontWeight: bold ? "bold" : "500",
        fontSize: size ? "25px" : "",
        color: 'var(--tertiary-color)',
        padding: '16px 16px',
        textAlign: 'left'
    };

    return (
        <div style={titleStyle}>{titre}</div>
    );
}

export default Titre;
