import React, { Component } from 'react'
import { FaUserPlus } from "react-icons/fa/";
import './InviteMember.css';
import Button from "react-bootstrap/Button"

export default class InviteMember extends Component {
    constructor(props){
        super(props)
    }

    addMemberListener(memberName){

        const member = {
            id: this.props.teamSize,
            name: memberName,
            teamName: this.props.teamName,
            tasks: []
        }
        //pass in member to Teamsection (parent compoennet), and execute the function
        // to add member to the current team
        this.props.addMember(member);
    }
    render() {
        return (
            <div className="container h-100"> 
                <div className="d-flex justify-content-center h-100">
                    <div className="searchbar"> 
                        <input className="search_input" id="search_input" type="text" name="" placeholder="Invite..." />
                        
                        <Button className="btnAddUser" onClick={() => this.addMemberListener(document.getElementById("search_input").value)}><FaUserPlus/>
                        </Button>
                        
                   
                    </div>
                    </div> 
                </div>        

        )
    }
}
