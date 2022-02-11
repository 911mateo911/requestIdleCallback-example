import React, { useEffect, useLayoutEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Scheduler } from './Scheduler';
import { doPointlessComputationsWithBlocking } from './blockThread';

function App() {
    const [amount, setAmount] = useState(10000)

    /**
     * [line 28] 1 (no shcheduling)
     * [line 40] 3 (no shcheduling)
     * [line 44] painted (no shcheduling)
     * [line 51] scheduled task (no shcheduling)
     * 
     * [line 39] hello (timeout 1)
     * [line 46] 2, computations (timeout 1)
     * [line 50] hello after paint (timeout 10)
     * 
     * [line 30] fetch (timeout 100)
     * 
     * [line 35] 1 computations (timeout 1000)
     * 
     * [line 49] before block (timeout 1000)
     */

    useLayoutEffect(() => {
        console.log('1')
        Scheduler.scheduleTask(async () => {
            const haha = await fetch('https://jsonplaceholder.typicode.com/todos/');

            console.log(await haha.json())
        }, 100)
        Scheduler.scheduleTask(() => {
            console.log('1')
            doPointlessComputationsWithBlocking();
        }, 1000)
        // setInterval(() => console.log('frominterval'), 10)
        Scheduler.scheduleTask(() => console.log('hello'), 1);
        console.log('3')
    }, [])

    useEffect(() => {
        console.log('painted');
        Scheduler.scheduleTask(() => {
            console.log('2')
            doPointlessComputationsWithBlocking();
        }, 1)
        Scheduler.scheduleTask(() => console.log('before block'), 1000)
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
