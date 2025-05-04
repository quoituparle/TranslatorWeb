'use client'

import React, {useState} from "react"
import LanguageSelector from "./LanguageSelector"
import ModelSelector from "./ModelSelector"
import { translateApi } from "../services/api"
import { Language, Model } from "../services/api"
import { useRouter } from "next/navigation"
import styles from '../css/Translation.module.css'
import '../css/global.css'


const availableLanguages: Language[] = [
    {code: 'en', name: 'English'},
    {code: 'ch', name: 'Chinese'},
    {code: 'fr', name: 'French'},
    {code: 'es', name: 'Spanish'},
    {code: 'auto', name: 'Auto'},
];

const availableModels: Model[] = [
    {id: 'gemini-2.5-flash-preview-04-17', name: 'Gemini 2.5 Flash'},
    {id: 'gemini-2.5-pro-preview-03-25', name: 'Gemini 2.5 Pro'},
    {id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash'},
    {id: 'gemini-2.0-flash-thinking-exp-01-21', name: 'Gemini 2.0 Flash Thinking'},
];

function Translation() {
    const [inputText, setInputText] = useState<string>('')
    const [outputText, setOutputText] = useState<string>('')
    const [sourceLanguage, setSourceLanguage] = useState<string>('Auto')
    const [targetLanuage, setTargetLanguage] = useState<string>('Chinese')
    const [selectedModel, setSelectedModel] = useState<string>('Gemini 2.5 Flash')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const router = useRouter()

    const toPolish = () => {
        router.push('/polish') 
    };

    const handleInputChange = (event: { target: { value: React.SetStateAction<string>} } ) => {
        setInputText(event.target.value)
    };

    const clearInput = () => {
        setInputText('')
        setError('')
        setError(null)
    };

    const handleTranslate = async () => {
        if (!inputText.trim()) {
            setError("Where's your text bro?")
            return
        };

        setIsLoading(true)
        setError(null)
        setOutputText('')

        try {
            const result = await translateApi({
                text: inputText,
                sourceLanguage: sourceLanguage,
                targetLanguage: targetLanuage,
                model: selectedModel,
            })
        } catch (error: any) {
            setError(error.message || 'Translation failed. Please try again')
        } finally {
            setIsLoading(false)
        };
    }

    return (
        <div className={styles.mainWindow}>
            <h1>Translator</h1>
            <div className={styles.selectionContainer}>
                <LanguageSelector
                    label="Source language"
                    language={availableLanguages}
                    selectedLanguage={sourceLanguage}
                    onChange={setSourceLanguage} />

                <LanguageSelector
                    label="Target language"
                    language={availableLanguages}
                    selectedLanguage={targetLanuage}
                    onChange={setTargetLanguage} />

                <ModelSelector
                    label="Model"
                    model={availableModels}
                    selectedModel={selectedModel}
                    onChange={setSelectedModel} />

                <button onClick={toPolish}>Polish</button> 
            </div>
            <div className={styles.textArea}> 
                <div className={styles.relative}> 
                    <textarea
                        id="inputText"
                        value={inputText}
                        onChange={handleInputChange}
                        placeholder="Enter text..."
                        className={styles.inputTextArea}
                        aria-label="Input text" />
                    {inputText && (
                        <button
                            onClick={clearInput}
                            className={styles.clearInputButton}
                            aria-label="Clear input"
                        >
                        </button>
                    )}
                </div>
                <div className={styles.relative}>
                    <textarea
                        id="outputText"
                        value={outputText}
                        readOnly
                        placeholder="Translation"
                        className={styles.outputTextArea}
                        aria-label="Output text"
                        aria-live="polite"
                    />
                </div>
            </div>
            <button
                onClick={handleTranslate}
                disabled={isLoading}
                className={styles.handleButton}
            >
                {isLoading ? 'Translating...' : 'Translate'}
            </button>

            {error && (
                <div className={styles.error}>
                    <strong>Error:</strong> {error}
                </div>
            )}
        </div>
    );
    


}

export default Translation