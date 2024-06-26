import nexaLogo from './images/nexa-logo-mark-text-white.svg';
import Button from '../src/components/Button';
import './App.css';
import {useEffect, useState} from "react";
import Input from "./components/Input";
import Table from "./components/Table";
import gifError from './images/jp.gif';
import {useGetRichListsQuery} from "./redux/features/getRichListQuery";

/**
 * App Component
 *
 * This is the main component of the NEXA Contest Project. It includes the core functionality
 * and user interface for the application, such as handling user inputs, validating answers,
 * and displaying content conditionally based on user interactions.
 */
const App = () => {

    const { data, error, isLoading } = useGetRichListsQuery(true);
    const [inputs, setInputs] = useState(['', '', '', '']);
    const [binaryString, setBinaryString] = useState('');
    const [clear, setClear] = useState(false);
    const correctAnswer = ['n', 'e', 'x', 'a'];
    const correctAnswerUpper = ['N', 'E', 'X', 'A'];
    const [clickTop5, setClickTop5] = useState(false);
    const [sendResponse, setSendResponse] = useState(false);

    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };


    const isAnswerCorrect = inputs.every((input, index) => {
        if (input === correctAnswer[index])
            return true;
        return input === correctAnswerUpper[index];

    });

    const handleClick = (e) => {

        if (e.target.id === "3") {
            setClear(true);
            setInputs(['', '', '', '']);

        }

        if (e.target.id === "4") {
            setSendResponse(true);
        } else
            setSendResponse(false);

        if (e.target.id === "2") {
            console.log(data);
            setClickTop5(true);
        } else
            setClickTop5(false);

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

        document.title = 'NEXA Contest Proyect';

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
                <p className="question-style">I came to life on January 3rd, two thousand nine,
                    A digital ledger, a creation so fine.
                    My name's akin to a treasure most sought,
                    What am I, can you give it a thought?</p>
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
            <div className="inline-buttons">
                <Button text={"Clear"} id={"3"} onClick={handleClick} small={true}/>
                <Button text={"Send"} id={"4"} onClick={handleClick} small={true}/>
            </div>
            {(isAnswerCorrect && sendResponse) ? (
                <div className="inline-buttons">
                    <Button text={"Top 10 tokens"} id={"2"} onClick={handleClick} small={false}/>
                </div>
            ) : (
                (sendResponse && !isAnswerCorrect) && (
                    <div className="inline-buttons">
                        <img className="inline-wrapper-gif" src={gifError} alt="GIF alternativo"/>
                    </div>
                )
            )}
            {(isAnswerCorrect && clickTop5) && (

                <Table data={data} isLoading={isLoading} error={error} />
            )}
            <div className="footer">
                &copy; 2024 <a href="https://www.nexa.org" target="_blank" className="anchor-color" rel='noopener noreferrer'>NEXA</a>. All rights
                reserved.
                Created by Sebastian Cabeza for the NEXA Contest.
            </div>
        </div>);

};

export default App;