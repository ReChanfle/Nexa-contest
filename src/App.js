import nexaLogo from './images/nexa-logo-mark-text-white.svg';
import Button from '../src/components/Button';
import './App.css';
import {useGetRichListsQuery} from "./redux/features/getRichListQuery";
import {useEffect, useState} from "react";
import Input from "./components/Input";

const App = () => {

    const {data, error, isLoading, isSuccess, refetch} = useGetRichListsQuery();

    const [inputs, setInputs] = useState(['', '', '', '']);
    const [binaryString,setBinaryString] = useState('');
    const [clear, setClear] = useState(false);
    const correctAnswer = ['1', '2', '3', '4']; // Replace with the correct answer

    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    const isAnswerCorrect = inputs.every((input, index) => input === correctAnswer[index]);

    const handleClick = (e) => {

        if(e.target.id === "3") {
            setClear(true);
            setInputs(['', '', '', '']);
        }

    }

    const resetAnimation = (clear) => {
        setClear(clear);
    }


    const generateBinaryString = (length) => {
        const characters = '01abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };


    useEffect(() => {
        const interval = setInterval(() => {
            const newBinaryString = generateBinaryString(1);
            setBinaryString(newBinaryString);
        }, 70);

        return () => clearInterval(interval);
    }, []);



    return (
        <div className="App">
            <header className="App-header">
                <div className="logo-container">
                    <img src={nexaLogo} className="nexa-logo" alt="logo"/>
                </div>
            </header>
            <div className="question-container">
                <p className="question-style">Aca quiero agregar un texto que sea una pregunta, que si la respuesta es correcta se muestran los 2
                    botones de abajo, las cuatro lineas de abajo simbolizan 4 inputs</p>
                <div className="inputs-container">
                    {inputs.map((input, index) => (
                        <Input
                            key={index}
                            value={input}
                            binaryString={binaryString}
                            clear={clear}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            resetAnimation={resetAnimation}
                        />
                    ))}
                </div>
            </div>
            <Button text={"Clear"}  id={"3"} onClick={handleClick} />
            {isAnswerCorrect && (
                <div className="inline-buttons">
                    <Button text={"Total network transactions"} id={"1"} onClick={handleClick}/>
                    <Button text={"Top 20"} id={"2"} onClick={handleClick} />
                </div>
            )}
        </div>);

};

export default App;