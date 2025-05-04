'use client'

import React, {useState} from "react"
import ModelSelector from "./ModelSelector"
import StyleSelector from "./StyleSelector"
import { polishApi } from "../services/api"
import { Style, Model } from "../services/api"
import { useRouter } from "next/navigation"
import styles from '../css/Translation.module.css'
import '../css/global.css'

const availableModels: Model[] = [
    {id: 'gemini-2.5-flash-preview-04-17', name: 'Gemini 2.5 Flash'},
    {id: 'gemini-2.5-pro-preview-03-25', name: 'Gemini 2.5 Pro'},
    {id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash'},
    {id: 'gemini-2.0-flash-thinking-exp-01-21', name: 'Gemini 2.0 Flash Thinking'},
];

const polishStyles: Style[] = [
    {code: 'an article of ILETS 8.5', name: 'ilets essay'},
    {code: 'an email', name: 'email'},
    {code: 'an essay academic', name: 'academic'},
    {code: 'a daily conversation', name: 'daily conversation'},
    {code: 'a business contact', name: 'busniss'},
    {code: 'a creative writing', name: 'creative writing'},

]

function Polishment() {
        const [inputText, setInputText] = useState<string>('')
        const [outputText, setOutputText] = useState<string>('')
        const [selectedModel, setSelectedModel] = useState<string>('Gemini 2.5 Flash')
        const [style, setStyle] = useState<string>('ilets essay')
        const [isLoading, setIsLoading] = useState<boolean>(false)
        const [error, setError] = useState<string | null>(null)

        const router = useRouter()

        const toTranslate = () => {
            router.push('/translate')
        };

        const handleInputChange = (event: { target: { value: React.SetStateAction<string> } }) => {
            setInputText(event.target.value)
        };

        const clearInput = () => {
            setInputText('')
            setError('')
            setError(null)
        };

        const handlePolish = async () => {
            if (!inputText.trim()){
                setError("Where's your text bro?")
                return
            };

            setIsLoading(true)
            setError(null)
            setOutputText('')

            try {
                const result = await polishApi({
                    text: inputText,
                    model: selectedModel,
                    style: style,
                })
            } catch(error: any){
                setError(error.message || 'Polishment failed. Please try again')
            } finally {
                setIsLoading(false)
            };
        }
        return (
            <div className={styles.mainWindow}>
                <h1>Polisher</h1>
                <div className={styles.selectionContainer}>    
                    <ModelSelector
                        label="Model"
                        model={availableModels}
                        selectedModel={selectedModel}
                        onChange={setSelectedModel} />

                    <StyleSelector
                        label="Style"
                        style={polishStyles}
                        selectedStyle={style}
                        onChange={setStyle} />
    
                    <button onClick={toTranslate}>Translate</button> 
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
                            placeholder="Polishment"
                            className={styles.outputTextArea}
                            aria-label="Output text"
                            aria-live="polite"
                        />
                    </div>
                </div>
                <button
                    onClick={handlePolish}
                    disabled={isLoading}
                    className={styles.handleButton}
                >
                    {isLoading ? 'Polishing...' : 'Polish'}
                </button>
    
                {error && (
                    <div className={styles.error}>
                        <strong>Error:</strong> {error}
                    </div>
                )}
            </div>
        );
}

export default Polishment