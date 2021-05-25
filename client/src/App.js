import React, { Component} from 'react'
import './index.css'
import Table from './Table'

class App extends Component {

    getVar() {
        return "Hello";
    }

    render() {

        const characters = [
            {
                name: 'Charlie',
                job: 'Janitor',
            },
            {
                name: 'Mac',
                job: 'Bouncer',
            },
            {
                name: 'Dee',
                job: 'Aspring actress',
            },
            {
                name: 'Dennis',
                job: 'Bartender',
            }
        ];

        return (
        <div className="container">
                <Table characterData={characters} />
            </div>
        )
}
}

export default App;