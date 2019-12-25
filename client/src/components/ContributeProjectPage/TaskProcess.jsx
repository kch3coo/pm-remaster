import React, { Component } from "react";
import "./TaskProcess.css";
import {Button} from "react-bootstrap";

export default class TaskProcess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxChecked: [],
      meter: 0,
      completed: this.props.completed,
      numTasks: 6
      
    };
    
  }

  init_task_circle(){
      let checkboxChecked = this.setProgress(this.state.completed + 1);
      this.updateProgressVal(checkboxChecked);
  }

  setCheckBoxProgress(curr_check_box_id) {
    let checkboxChecked = [];
    var checkbox = document.getElementsByName('progress-tasks')
    
    const curr = curr_check_box_id;
    for (let i = 0; i < this.state.numTasks; i++) {
      if (i < curr) {
        checkboxChecked.push(checkbox[i]);
        checkbox[i].checked = true;
      } else {
        checkbox[i].checked = false;
      }
    }
    // console.log(checkbox)
    return checkboxChecked;
  }
  
  updateProgressVal(checkboxChecked) {
    let meterCurrVal = Math.floor(
      (checkboxChecked.length / this.state.numTasks) * 100
    );
    this.setState({ meter: meterCurrVal, checkboxChecked: checkboxChecked, completed: checkboxChecked.length });
    this.transformRaidiusPie((360 / 100) * meterCurrVal);
    console.log(checkboxChecked);
  }
  transformRaidiusPie(deg) {
    var progRadiusPie = document.querySelector("#slice .pie");
    progRadiusPie.style.mozTransform = "rotate(" + deg + "deg)";
    progRadiusPie.style.webkitTransform = "rotate(" + deg + "deg)";
    progRadiusPie.style.oTransform = "rotate(" + deg + "deg)";
    progRadiusPie.style.msTransform = "rotate(" + deg + "deg)";
    progRadiusPie.style.transform = "rotate(" + deg + "deg)";
  }
  progRadius() {
    const meterCurrVal = this.state.meter;

    if (meterCurrVal > 50) {
      return (
        <>
          <div className="percent"> </div>
          <div className="gt50" id="slice">
            <div className="pie"></div>
            <div className="pie fill"></div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="percent"> </div>
          <div id="slice">
            <div className="pie"></div>
          </div>
        </>
      );
    }
  }

  onClickCheckBox(e){
    const curr_check_box = e.target;
    console.log(curr_check_box.value + " clicked");
    this.setProgress(parseInt(curr_check_box.value));
    // let checkboxChecked = this.setProgress(parseInt(curr_check_box.value));
    // this.updateProgressVal(checkboxChecked);
  }

  setProgress(i){
    let checkboxChecked = this.setCheckBoxProgress(i);
    this.updateProgressVal(checkboxChecked);
  }

  componentDidMount(){
      this.setProgress(this.state.completed)
  }

  submitCompletion(){
    const numOfCompletedTasks = this.state.checkboxChecked.length
    console.log("from process: " + numOfCompletedTasks)
    console.log(this.props)
    this.props.submitCompletion(numOfCompletedTasks)
}

  render() {
    return (
      <div>
  {/* <div>Task completed: {this.setProgress(this.state.completed)} </div> */}
        <form className="task-form">
          <div className="prog">{this.progRadius()}</div>
          <input
            type="checkbox"
            name="progress-tasks"
            id="progress-task1"
            value="1"
            onChange={e => this.onClickCheckBox(e)}
            required
          />
          <label htmlFor="progress-task1" class="progress-task">
            Task 1
          </label>
          <input
            type="checkbox"
            name="progress-tasks"
            id="progress-task2"
            value="2"
            onChange={e => this.onClickCheckBox(e)}
            required
          />
          <label htmlFor="progress-task2" class="progress-task">
            Task 2
          </label>
          <input
            type="checkbox"
            name="progress-tasks"
            id="progress-task3"
            value="3"
            onChange={e => this.onClickCheckBox(e)}
            required
          />
          <label htmlFor="progress-task3" class="progress-task">
            Task 3
          </label>
          <input
            type="checkbox"
            name="progress-tasks"
            id="progress-task4"
            value="4"
            onChange={e => this.onClickCheckBox(e)}
            required
          />
          <label htmlFor="progress-task4" class="progress-task">
            Task 4
          </label>
          <input
            type="checkbox"
            name="progress-tasks"
            id="progress-task5"
            value="5"
            onChange={e => this.onClickCheckBox(e)}
            required
          />
          <label htmlFor="progress-task5" class="progress-task">
            Task 5
          </label>
          <input
            type="checkbox"
            name="progress-tasks"
            id="progress-task6"
            value="6"
            onChange={e => this.onClickCheckBox(e)}
            required
          ></input>
          <label htmlFor="progress-task6" class="progress-task">
            Task 6
          </label>
          <label
            htmlFor="progress-tasks-percentage"
            class="progress-tasks-completed"
          >
            <span>{this.state.meter}</span>
            <sup>%</sup> Completed
          </label>
          <progress
            id="progress-tasks-percentage"
            name="progress-tasks-percentage"
            min="0"
            max="100"
          ></progress>
        </form>
        <div className="text-center mt-2 d-flex">
        <Button onClick={() => this.submitCompletion()} style={{zIndex: 1}}>Submit </Button>
        </div>
        
      </div>
    );

  }

  
}

