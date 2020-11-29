import './App.css';
import {Grid, Cell,Textfield, Button} from 'react-mdl';
import React, {Component} from 'react';
import {useState, useEffect} from 'react';
import MyDatePicker from './DatePicker/MyDatePicker'
import * as d3 from "d3";
import BarChart from './BarChart';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { axisRight } from 'd3';
import {TextField} from '@material-ui/core';

function onChange(timestamp) {
  console.log(timestamp);
}

function ifClicked(value, value2){
  alert(value + " and " + value2 + " are selected");
}

function App (){
  const [value,setValue]=useState('');
  const handleSelect=(e)=>{
    console.log(e);
    setValue(e)
  }

  const [value2,setValue2]=useState('');
  const handleSelect2=(e)=>{
    console.log(e);
    setValue2(e)
  }

    return (
      <div className="App">
       <div style={{width: '80%', margin: 'auto'}}>
      <Grid className="demo-grid-ruler">
  
            <Cell col={1}><label>Date:</label></Cell>
            <form>
              <TextField type="date" InputLabelProps={{shrink: true,}}/>
            </form>
          
            <Cell col={1}>
            <label>Type:</label></Cell>
            <Cell col={2}>
            <DropdownButton title={value} id="Building-Type" onSelect={handleSelect}>
              <Dropdown.Item eventKey="Residential">Residential</Dropdown.Item>
              <Dropdown.Item eventKey="Non-residential">Non-residential</Dropdown.Item>
            </DropdownButton>
            </Cell>
  
            <Cell col={1}>
            <label>Location:</label></Cell>
            <Cell col={2}>
            <DropdownButton title={value2} id="Building-Location" onSelect={handleSelect2}>
            <Dropdown.Item eventKey="Calgary">Calgary</Dropdown.Item>
            <Dropdown.Item eventKey="Edmonton">Edmonton</Dropdown.Item>
            <Dropdown.Item eventKey="Halifax">Halifax</Dropdown.Item>
            <Dropdown.Item eventKey="Moncton">Moncton</Dropdown.Item>
            <Dropdown.Item eventKey="Montreal">Montreal</Dropdown.Item>
            <Dropdown.Item eventKey="Ottawa-Gatineau">Ottawa-Gatineau</Dropdown.Item>
            <Dropdown.Item eventKey="Saskatoon">Saskatoon</Dropdown.Item>
            <Dropdown.Item eventKey="St.John's">St.John's</Dropdown.Item>
            <Dropdown.Item eventKey="Toronto">Toronto</Dropdown.Item>
            <Dropdown.Item eventKey="Vancouver">Vancouver</Dropdown.Item>
            <Dropdown.Item eventKey="Winnipeg">Winnipeg</Dropdown.Item>
            </DropdownButton>
            </Cell>
  
            <Cell col={2}>{/* Numeric Textfield with floating label */}
            <Button raised colored onClick={() => ifClicked(value, value2)}>Predict</Button>
            </Cell>

            <BarChart/>

      </Grid>
      </div>
      </div>
    )
}



export default App;
