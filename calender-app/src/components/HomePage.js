
import React, { Component } from "react";
 import GetUserToken from "../Util/GetUserToken";
 import { logoutUser } from "../actions/loginAction";
 import { connect } from "react-redux";

 import {getUserProfileDetails, addEventDetails, getEventDetails} from "../Api/Api"

import events from "./events";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)

let allViews = Object.keys(Views).map(k => Views[k])

 class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            eventDetails:[],
            Title:"",
            StartDate: new Date(),
            EndDate: null,
            Note:"",
            EventType:"",
            allDay: true,
            errorTitle: "",
            errorStartDate: "",
            errorEndDate: ""
        }

        const token = GetUserToken();
        if (!token) {
            this.props.history.push('/login')
        }
    }

    componentDidMount(){
      getUserProfileDetails().then(res => {
        this.setState({userName: res.data.firstname + " " + res.data.lastname})
      }).catch(err => {
        console.log("ERROR", err)
      })

      this.EventDetails()
      
    }

    EventDetails(){
      getEventDetails().then(res => {
        this.setState({eventDetails: res.data})
      }).catch(err => {
        console.log("ERROR", err)
      })
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    submitEventDetails = event => {
        event.preventDefault();
        let {
            Title,
            StartDate,
            EndDate,
            Note,
            EventType,
            allDay,
        } = this.state;
        if (this.validateEventDetails()) {
            let payload = {
                title: Title,
                start: new Date(StartDate).toISOString(),
                // start: new Date(StartDate),
                end:new Date(EndDate).toISOString(),
                desc: Note,
                type: EventType,
                  allDay,
            };
            addEventDetails(payload).then(res => {
              this.EventDetails()
              this.props.history.push('/')
              this.setState({
                  Title:"",
                  StartDate:  new Date(),
                  EndDate:null,
                  Note:"",
                  EventType:"",
                })
            }).catch(err => {
              console.log(err)
            })
            
        }
        else{
            alert("Please fill Mandatory fields")
        }
    };

    validateEventDetails = () => {
        let { Title,
            StartDate,
            EndDate,
            Note,
            EventType, } = this.state;
        let errorTitle = "";
        let errorStartDate = "";
        let errorEndDate = "";
        let formIsValid = true;
      
        if (!Title) {
            formIsValid = false;
            errorTitle = "Please enter Title";
        }
        
        if (!StartDate) {
            formIsValid = false;
            errorStartDate = "Please enter start date";
        }
        
        if (!EndDate) {
            formIsValid = false;
            errorEndDate = "Please enter end date";
        }
        this.setState({ errorTitle, errorStartDate, errorEndDate });
        return formIsValid;
    };

    Logout = () => {
      localStorage.clear();
      this.props.logoutUser()
      window.location = "/";
    }

    eventType = (val) => {
      this.setState({EventType:val})
    }

    eventStyleGetter =(events) => {
      var backgroundColor = events.type === "meeting" ? "pink" : "yellow";
      var style = {
          backgroundColor: backgroundColor,
          borderRadius: '0px',
          opacity: 0.8,
          color: 'black',
          border: '0px',
          display: 'block'
      };
      return {
          style: style
      };
  }

  handleStartDateChange = (date) => {
    if (this.state.EndDate === null) {
        this.setState({
            StartDate: date
        });
    } else {
        if (new Date(date).getTime() <= new Date(this.state.EndDate).getTime()) {
            this.setState({
                StartDate: date
            });
        }
        else {
            alert("Start Date Should Be Less Than End Date");
        }
    }
}

handleEndDateChange = (date) => {
  console.log("DATE--", date)
  this.setState({
    EndDate: date
});

  // if (this.state.StartDate) {
  //     if (new Date(this.state.StartDate).getTime() <= new Date(date).getTime()) {
  //         this.setState({
  //             EndDate: date
  //         });
  //     }
  //     else {
  //         //alert("select correct date & Time")
  //         alert("Select correct date and time");
  //     }
  // }
  // else {
  //     //alert("Select Start Date First")
  //     alert("Select start date first");
  // }
}
  


    render() {
      console.log("Events", this.state.eventDetails)
      let Today = new Date()
        return (
            <div>
                <div className="next-btn">
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#MeetingModal" onClick={() => this.eventType("meeting")} >Meeting</button>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#MeetingModal" onClick={() => this.eventType("appointment")} >Appointment</button>    
                </div>
                <div align="right">
                <span style={{"margin": "20px"}}>
                  <b>
                {this.state.userName}
                </b>
                </span>
                <button type="button" className="btn btn-primary" onClick={this.Logout} >Logout</button>
                </div>
               
                <br/><br/>

                <div>
                 <Calendar
                    localizer={localizer}
                    events={this.state.eventDetails}
                    // events={events}
                    Views={allViews}
                    step={60}
                    showMultiDayTimes
                    defaultDate={new Date()}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    eventPropGetter={(this.eventStyleGetter)}
                 />
                </div>


<div className="modal fade" id="MeetingModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
      {this.state.EventType === "meeting" ? 
      <h5 className="modal-title" id="exampleModalLabel">Create Meeting Event</h5>
      :
      <h5 className="modal-title" id="exampleModalLabel">Create Appointment Event</h5>
      }
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form onSubmit={this.submitEventDetails}>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Title*:</label>
            <input type="text" className="form-control" id="recipient-name" 
            name="Title"
            value={this.state.Title}
            onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="message-text" className="col-form-label">Date & Time *:</label>
            <br />
            <DatePicker
                selected={this.state.StartDate}
                onChange={this.handleStartDateChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={60}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="time"
                minDate={new Date()}
                minTime={moment(this.state.StartDate).format("DD MMMM  YYYY") === moment(Today).format("DD MMMM  YYYY") ? moment().hour(Today.getHours()).toDate() : moment().hour(0).minute(0).toDate()}
                maxTime={moment().hour(23).toDate()}
                placeholderText="Start Date"
            />
<br/><br/>
            <DatePicker
                selected={this.state.EndDate}
                onChange={this.handleEndDateChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={60}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="time"
                minDate={new Date(this.state.StartDate)}
                // minTime={moment(this.state.EndDate).format("DD MMMM  YYYY") === moment(Today).format("DD MMMM  YYYY") ? moment().hour(Today.getHours()).toDate() : moment().hour(0).minute(0).toDate()}
                // maxTime={moment().hour(23).toDate()}
                placeholderText="End Date"
            />
            
          </div>
          <div className="form-group">
            <label htmlFor="message-text" className="col-form-label">Note:</label>
            <textarea className="form-control" id="message-text"
            name="Note"
            value={this.state.Note}
            onChange={this.handleChange}></textarea>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
        <button type="button" className="btn btn-primary" onClick={this.submitEventDetails} data-dismiss="modal">Save</button>
      </div>
    </div>
  </div>
</div>

          </div>
        )
    }

}


const mapStateToProps = state => {
  return {
     
  };
};
export default connect(
  mapStateToProps,
  {  logoutUser }
)(HomePage);



