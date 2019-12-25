import React from "react"
import "./css/card.css"
class Card extends React.Component {

    constructor(props) {
        super(props);
    }

    createManagers() {
        let table = this.props.managers;
        let r = []

        for (let key in table) {
            r.push(<li>{table[key]}</li>);
        }

        return r;
    }
    render () {
        return (
            <div className="card">
                <header>{this.props.project_name}</header>
                <div className="card-content">
                    <ul>
                        {this.createManagers()}
                    </ul>
                    
                </div>
            </div>
        );
        
    }
}

export default Card