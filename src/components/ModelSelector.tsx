import React from "react";
import { Model } from "../services/api";

interface ModelSelectorProps {
    label: string;
    model: Model[];
    selectedModel: string;
    onChange: (modelName: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
    label,
    model,
    selectedModel,
    onChange,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value)
    };

    return(
        <div className="model-container">
            <label htmlFor={label}>{label}</label>
            <select
                id={label}
                value={selectedModel}
                onChange={handleChange}
            >
                {model.map((item) => (
                    <option key={item.id} value={item.name}>{item.name}</option>
                ))}
            </select>
        </div>
    )
}

export default ModelSelector