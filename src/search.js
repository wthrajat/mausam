import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './search.css';
import {generateCard} from './index.js';

class CityWeather extends React.Component{
    constructor(){
      super();
      this.state = {
        data:{
          sys:{},
          main:{},
          weather:[{}],
          wind:{}
        },
        ico:'',
        temp:0,
        show:false
      }
    }

    renderData(){
      navigator.geolocation.getCurrentPosition((location)=>{
        if(!location.coords){
          alert('Location Not Found');
        }else{
            console.log(document.getElementById('cityName').value);
          axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${document.getElementById('cityName').value}&appid=22ea153019299dbbb2ee4028bd3ff603`)
          .then((weatherInf)=>{
            this.setState({data:weatherInf.data,ico:`http://openweathermap.org/img/w/${weatherInf.data.weather[0].icon}.png`,temp:parseInt(weatherInf.data.main.temp - 273.15)});
          }).catch((err)=>{
              alert('City Not Found');
          })
        }
      })
    }

    handleClick(){
        this.renderData();
    }
    render(){
      return (
          <div>
        <div className='weather-app-search-bar'>
            <input name='city' id='cityName' className='weather-app-search-bar-input' type='search' /> <button onClick={()=>this.handleClick()} className='w3-btn w3-blue weather-app-search-bar-button'>Search By City</button>
        </div>
        <div className='header w3-card-4 ' id='header'>
            <div className='w3-row'>
                <div className='w3-col l6 m12 s12'>
                    <div className='weather-app-search'>
                        {generateCard(this.state,'todaysWeather')}
                    </div>
                </div>
            </div>
        </div>
        </div>
    )}
  }

export default CityWeather;  