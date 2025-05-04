import React from "react";
import { Style } from "../services/api";

interface StyleSelectorProps {
    label: string;
    style: Style[];
    selectedStyle: string;
    onChange: (styleName: string) => void;
};

const StyleSelector: React.FC<StyleSelectorProps> = ({
    label,
    style,
    selectedStyle,
    onChange,
}) => {
    const handleChange = (e :React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value)
    };

    return(
        <div className="style-container">
            <label htmlFor={label} >{label}</label>
            <select 
                id={label}
                value={selectedStyle}
                onChange={handleChange}
            >
                {style.map((item) => (
                    <option key={item.code} value={item.name}>{item.name}</option>
                ))}
            </select>
        </div>
        
    )
}

export default StyleSelector