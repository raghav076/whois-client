import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import './App.css';

// const server = 'http://localhost:3000';
const server = 'https://whois-raghav.herokuapp.com';
const defaultResult = {
    URL: '',
    Domain: '',
    Updated_Date: '',
    Creation_Date: '',
    Expiration_Date: '',
    Registrar: '',
    Reg_Country: '',
};

const App = () => {
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setError('');
            setLoading(true);
            const res = await fetch(`${server}/whois?url=${url}`).then((res) => res.json());
            // console.log(res)
            if (res.error) {
                setError(res.error);
                setResult(defaultResult);
            } else
                setResult(res);
            setLoading(false);
        } catch (err) {
            setError(err.msg);
        }
    }

    const getDomainDetails = () => {
        let arr = [];
        for (let d in result) {
            arr.push(<li key={d}><div className="key">{d}</div> : {loading ? <div className="value loading">Loading...</div> : <div className="value">{result[d]}</div>}</li>)
        }
        return <ul className={error ? "hide" : ""}>
            {arr.map((a) => a)}
        </ul>
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <form className="search" onSubmit={handleSubmit}>
                    <input type="text" placeholder="google.com" value={url} onChange={(e) => setUrl(e.target.value)} />
                    <i className="fa-solid fa-magnifying-glass" type="submit" onClick={handleSubmit}></i>
                </form>
                <div className="result">
                    <h2 className="head">Domain Information</h2>
                    <div className={`error ${error ? '' : 'hide'}`}>{error}</div>
                    {getDomainDetails()}
                    {/* <div style={{wordWrap: 'break-word'}}>{result}</div> */}
                </div>
            </div>
        </>
    )
}

export default App