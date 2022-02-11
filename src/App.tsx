import React, { useEffect, useLayoutEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Scheduler } from './Scheduler';
import { doPointlessComputationsWithBlocking } from './blockThread';

function App() {
    const [amount, setAmount] = useState(10000)

    useLayoutEffect(() => {
        console.log('1')
        Scheduler.scheduleTask(() => {
            console.log('1')
            doPointlessComputationsWithBlocking();
        }, 0)
        // setInterval(() => console.log('frominterval'), 10)
        Scheduler.scheduleTask(() => console.log('hello'), 1000);
        console.log('3')
    }, [])

    useEffect(() => {
        console.log('painted');
        Scheduler.scheduleTask(() => {
            console.log('2')
            doPointlessComputationsWithBlocking();
        }, 1)
        Scheduler.scheduleTask(() => console.log('before block'), 1)
        Scheduler.scheduleTask(() => console.log('hello after paint'), 10);
        console.log('scheduled task');
    }, [])

    // useEffect(() => {
    //     Scheduler.scheduleTask(() => {
    //         doPointlessComputationsWithBlocking();
    //     })
    // }, [])

    return (
        <div className="App">
            {Array(amount).fill('').map((_, is) => <p key={is} >Hlelo</p>)}
        </div>
    );
}

export default App;
