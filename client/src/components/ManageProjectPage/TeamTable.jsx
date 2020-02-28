import React, { Component } from 'react'
import { Card, ListGroup} from 'react-bootstrap';
import CreateTeamForm from './CreateForms/CreateTeamForm';
import {createTeam} from "../../actions/project";

export default class TeamTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamList: this.props.teams
        }
    }
    
    onSelectTeam(e) {
        console.log(e.target.value)
        this.props.selectTeam(e.target.value)
    }

    onCreateTeam(newTeam) {
        console.log(this.props.pid)
        const team = {
            name: newTeam.name,
            contributors: newTeam.contributors,
            pid: this.props.pid,
            manager: ""
        }
        createTeam(team).then((e) => {
            console.log(e)
        })
        // console.log(newTeam)
        // this.state.teamList.push(team);
        // this.setState({
        //   teamList: this.state.teamList
        // })
        console.log(newTeam)
        // window.location.reload();
        //call database for post request
      }

    render() {
        return (
            <div className="" style={{width: 300}}>
                 <Card border="dark" style={{ width: '18rem' }}>
                    {/* <Card.Header>Project Jinx</Card.Header> */}
                    <Card.Body>
                    <div className="float-right mt-0"> 
                        <CreateTeamForm createTeam={this.onCreateTeam.bind(this)}/>
                    </div>
                    <Card.Title className="h2 display-flex">Teams 
                       
                    </Card.Title> 
                    <ListGroup className="mt-4" variant="flush">
                        {this.props.teams.map(t => {
                        return (<ListGroup.Item value={t.name} action onClick={(e) => this.onSelectTeam(e)}> {'Team: ' + t.name} </ListGroup.Item>);
                        })}
                    </ListGroup>
                    </Card.Body>
                </Card>
                <br />
            
            

            </div>

            
            
        )
    }
}
