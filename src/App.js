import nexaLogo from './images/nexa-logo-mark-text-white.svg';
import Button from '../src/components/Button';
import './App.css';
import {useGetRichListsQuery} from "./redux/features/getRichListQuery";

const App = () => {

    const { data, error, isLoading, isSuccess, refetch } = useGetRichListsQuery();
    const handleClick = () => {

        console.log('click');
    }
    console.log(data);

    return (
        <div className="App">
            <header className="App-header">
                <div className="logo-container">
                    <img src={nexaLogo} className="nexa-logo" alt="logo"/>
                </div>
            </header>
            <Button  />
        </div>
    );
};

export default App;