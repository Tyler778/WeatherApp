import React, { Component } from 'react'
import Title from './Components/Title'
import Form from './Components/Form'
import Weather from './Components/Weather'


export default class App extends Component {
  state = {
    city: undefined,
    country: undefined,
    temperature: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
  }
  getWeather = async (e) => {
    //Disabling refresh
    e.preventDefault();

    //Grabbing values from Form.js
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const API_KEY = '1de36f8c19f786cefa15b4f8520c2604'
    //const units = "metric"

    //Calling API with variables above
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=imperial`);
    //Parsing data to json
    const data = await api_call.json()

    //No state update unless form completed
    if (city && country) {
      //Setting State with API Data
      this.setState({
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: "",
      })
    //Error if no form entry  
    } else {
      this.setState({
        error: "Please enter the values",
      })
    }
  }
  render() {
    return (

      <div className="wrapper">
        <div className="main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-5 title-container">
                <Title />
                <div className="col-xs-7 form-container">
                  <Form 
                  //Passing Method to Form.js
                  getWeather={this.getWeather} />
                  <Weather
                  //Passing fetched data to weather.js 
                  temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
