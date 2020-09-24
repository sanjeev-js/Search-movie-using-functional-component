import React, { useState } from 'react';

// File Imports
import PassInputData from '../../context/input-data';
import './search.css';
import SearchList from '../searchlist/searchlist';

// Search component
const search = () => {

    // Using state
    const [ input, setInput ] = useState('');
    const [ clicked , setClicked ] = useState(false);

    // Click handler
    const handleClick = (e) => {
        e.preventDefault();
        setClicked(true);
    };

    return (
        // Diaplaying input box for searching the movie
        <React.Fragment>
            <div className ="header" >
                <form >
                    <input type="text" 
                    value={input} 
                    onChange ={e => setInput(e.target.value)}/>
                    <button 
                    onClick={e => handleClick(e)}
                    type='button'
                    >Search</button>
                </form>
            </div>
            {/* Passing input value from input box to context api, so I can consume it on another component  */}
            {clicked ? <PassInputData.Provider value ={input}>
                <SearchList />
            </PassInputData.Provider> : null}
            
        </React.Fragment>
    );
};

export default search;