import React from "react";
import { Language } from "../services/api";

interface LanguageSelectorProps {
    label: string;
    language: Language[];
    selectedLanguage: string;
    onChange: (languageName: string) => void;
};

const LanguageSelector : React.FC<LanguageSelectorProps> = ({
    label,
    language,
    selectedLanguage,
    onChange,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => { // replace any => React.ChangeEvent<HTMLSelectElement>
        onChange(e.target.value)
    }
    return (
        <div className="language-container">
            <label htmlFor={label}>{label}</label>
            <select
                id={label}
                value={selectedLanguage}
                onChange={handleChange}
                className="language-selector"
                >
                    {language.map((item) => (
                        <option key={item.code} value={item.name}>{item.name}</option> // every {language} contains structures like { code: 'en', name: 'English' }
                    ))}
                </select>
        </div>
    )
}

export default LanguageSelector
