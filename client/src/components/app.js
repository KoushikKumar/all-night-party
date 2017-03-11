import React, { Component } from 'react';
import { connect } from 'react-redux';
import Video from './video_background';
import { getRestaurantsList, signInUser, changeNumberOfPeopleGoing } from '../actions';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      "inputSearchText":"", 
      "counter":0,
      "isFirstRequestSent":false
    }
  }

  renderInputText(e) {
    this.setState({"inputSearchText":e.target.value});
  }

  renderHotelData(e) {
    if (e.key === 'Enter' && this.state.inputSearchText) {
      this.setState({"isFirstRequestSent":true});
      this.props.getRestaurantsList(this.state.inputSearchText);
    }
  }

  renderPreviousRestaurant() {
    if(this.state.counter-1<0) {
      this.setState({"counter":this.props.restaurantsList.length-1});
    } else {
      this.setState({"counter":this.state.counter - 1});
    }
  }

  renderNextRestaurant() {
    if(this.state.counter+1 >= this.props.restaurantsList.length ) {
      this.setState({"counter":0});
    } else {
      this.setState({"counter":this.state.counter + 1});
    }
  }

  userInterested() {
    if(this.props.isAuthenticated) {
      this.props.changeNumberOfPeopleGoing(this.props.restaurantsList[this.state.counter]);
    } else {
      this.props.signInUser();
    }
  }

  renderHotelInfo() {
    if(this.props.error) {
      return (
        <div className="errorMessage">
          {this.props.error}
        </div>
      );
    }
    if(this.props.restaurantsList && this.props.restaurantsList.length > 0){
      const hotel = this.props.restaurantsList[this.state.counter];
      const heartColor = {};
      if(hotel.peopleInterested.indexOf(this.props.userId) > -1) {
        heartColor.color ="green";
      } else {
        heartColor.color ="red";
      }
      return (
        <div className="hotel-info-container">
          <div className="row">
            <div className="col-xs-1 col-xs-offset-3">
              <i onClick={() => this.renderPreviousRestaurant()} 
                 className="fa fa-angle-left fa-5x font-awesome-angle-right" 
                 aria-hidden="true"></i>
            </div>
            <div className="hotel-info col-xs-4">
                <a href={hotel["url"]} target="_blank"><h3 className="hotel-title">{hotel["name"]}</h3></a>
                <p className="hotel-review">{hotel["snippet_text"]}</p>
                <div>
                  <h3 className="hotel-interested">
                    <span>
                      <i onClick={() => this.userInterested()} 
                         className="fa fa-heart" 
                         style={heartColor} 
                         aria-hidden="true"></i>
                    </span> 
                     {" " + hotel["noOfPeopleGoing"]} Going
                  </h3> 
                </div>
              </div>
            <div className="col-xs-1 col-xs-offset-3">
              <i onClick={() => this.renderNextRestaurant()} 
                 className="fa fa-angle-right fa-5x font-awesome-angle-left" 
                 aria-hidden="true"></i>
            </div>
          </div>
        </div>
      );
    }
    if(this.state.isFirstRequestSent) {
      return(
        <div className="loadingIcon">
          <i className="fa fa-moon-o fa-spin fa-4x fa-fw"></i>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="container">
        <Video />
        <div className="content">
          <h1>All Night Party</h1>
          <input onChange={event => this.renderInputText(event)} 
                 onKeyPress={event => this.renderHotelData(event)}
                 type="text" 
                 name="search" 
                 placeholder="Where Are You?(Ex: London, America ..)" 
                 value={this.state.inputSearchText} />
          {this.renderHotelInfo()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    restaurantsList: state.restaurantsData.restaurantsList,
    isAuthenticated: state.auth.authenticated,
    userId : state.auth.userId,
    error : state.restaurantsData.error
  }
}

export default connect(mapStateToProps, { getRestaurantsList, signInUser, changeNumberOfPeopleGoing })(App);