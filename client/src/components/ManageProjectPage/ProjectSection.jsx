import React, { Component } from 'react'
import Simple from './Simple';
import TeamTable from './TeamTable';
import TeamSection from './TeamSection'
import { Button, Card, Row, Col} from 'react-bootstrap';
import projectData from './data.json';
import {getProjectInfo} from "../../actions/project";


export default class ProjecSection extends Component {
    constructor(props){
        super(props);
        this.state = {
            currTeam: "No Team Selected",
            projectName: "default",
            teamList: []

        }
        this.selectTeamListenner = React.createRef();

    }
    onSelectTeam(team) {
        this.setState({
          currTeam: team
        })
        console.log(team)
        this.selectTeamListenner.current.handleTeamChange(team);
      }

      componentDidMount() {
          console.log("onMount: " + this.props.project_id)
        getProjectInfo(this.props.project_id).then(response => {
          if (!response) {
            console.log("project does not exist!");
          } else {
            const data = response.data;
            console.log(data)
            this.setState({
              projectName: data.name,
              teamList: data.teamList,
              description: data.description,
              pid: this.props.project_id,
              manager: ""
            })
          }
        }).catch((e) => console.log("something happened"))
    
      }
    
    render() {
        return (
            <div>
                <Row>
                <Col md={"auto"}> 
                    <TeamTable selectTeam={this.onSelectTeam.bind(this)}  teams={this.state.teamList} pid={this.state.pid}/>
                </Col>
                <Col className="border border-primary pd-2" md={"auto"}  style={{minWidth: '200px', backgroundColor: "white"}}> 
                    <Simple className="mr-2" ref={this.selectTeamListenner} />
                </Col>
            </Row>
            <Row className="mt-3">
            <TeamSection ref={this.selectTeamListenner} teams={this.state.teamList}/>
                
            </Row>

            </div>
            
        )
    }
}
