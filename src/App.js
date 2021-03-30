import './App.css';
import {Grid, Cell, Button} from 'react-mdl';
import React from 'react';
import {useState} from 'react';
import CurrencyInput from 'react-currency-input-field';
import BarChart from './BarChart';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ErrorChart from './ErrorChart';
import axios from 'axios';
import {Layout, Drawer, Content} from 'react-mdl';

var User_history = [];    //define array

function App (){
  const [state,setState]=useState(()=>{return {plotActualValues:[],plotErrValues:[],plotPredValues:[],startYear:1980}});

  const [value,setValue]=useState('');
  const handleSelect=(e)=>{
    setValue(e)
    setClicked(false);
  }

  const [value2,setValue2]=useState('');
  const handleSelect2=(e)=>{
    setClicked(false);
    setValue2(e)
  }

  const [value3,setValue3]=useState('');
  const handleSelect3=(e)=>{
    setClicked(false);
    setValue3(e)
  }

  const [value4,setValue4]=useState('');
  const handleSelect4=(e)=>{
    setClicked(false);
    setValue4(e)

  }
  const [price,setPrice]=useState('');
  const handlePrice=(e)=>{
    setClicked(false);
    setPrice(e)

  }
  const [final_price, setFinal]=useState('');
  const [clicked, setClicked]=useState('');

  //for User History
  const [Userhistory, setHistory]=useState('');
  const [clicked2, setClicked2]=useState('');

    return (
      <div className="App">

      {/*********************header and drawer***********************************/}


      <Layout >
           <Drawer title="Session History">

          <p><Button raised colored onClick={() =>{
           setClicked(false);
           //setClicked2(false);
           setHistory(User_history);
           setClicked2(true);
         }}>Get Latest</Button></p>

        {  clicked?<div className="history">
           {Userhistory.map(his=>(<li>Date: {his[0]} {his[1]}, Type: {his[2]} and Location: {his[3]}. 
           The initial value CAD{his[4]} became CAD{his[5]}.</li>))}
           </div>:null }
        {  clicked2?<div className="history">
           {Userhistory.map(his=>(<li>Date: {his[0]} {his[1]}, Type: {his[2]} and Location: {his[3]}. 
           The initial value CAD{his[4]} became CAD{his[5]}.</li>))}
           </div>:null }

           </Drawer> 

          <Content>
          <div style={{width: '85%', margin: 'auto'}}>
          <Grid className="demo-grid-ruler">
           <Cell col={1}><label>Initial Value:</label></Cell>
            <Cell col={1}><CurrencyInput
              id="input-example"
              name="input-name"
              placeholder="Enter Price"
              prefix="$"
              style={{width:"95px"}}
              decimalsLimit={2}
              onValueChange={handlePrice}
            /></Cell>

<Cell col={1}><label>Start Year:</label></Cell>

            <Cell col={1}>
            <DropdownButton title={value3} id="Year" onSelect={handleSelect3}>
              <Dropdown.Item eventKey="1981">1981</Dropdown.Item>
              <Dropdown.Item eventKey="1982">1982</Dropdown.Item>
              <Dropdown.Item eventKey="1983">1983</Dropdown.Item>
              <Dropdown.Item eventKey="1984">1984</Dropdown.Item>
              <Dropdown.Item eventKey="1985">1985</Dropdown.Item>
              <Dropdown.Item eventKey="1986">1986</Dropdown.Item>
              <Dropdown.Item eventKey="1987">1987</Dropdown.Item>
              <Dropdown.Item eventKey="1988">1988</Dropdown.Item>
              <Dropdown.Item eventKey="1989">1989</Dropdown.Item>
              <Dropdown.Item eventKey="1990">1990</Dropdown.Item>
              <Dropdown.Item eventKey="1991">1991</Dropdown.Item>
              <Dropdown.Item eventKey="1992">1992</Dropdown.Item>
              <Dropdown.Item eventKey="1993">1993</Dropdown.Item>
              <Dropdown.Item eventKey="1994">1994</Dropdown.Item>
              <Dropdown.Item eventKey="1995">1995</Dropdown.Item>
              <Dropdown.Item eventKey="1996">1996</Dropdown.Item>
              <Dropdown.Item eventKey="1997">1997</Dropdown.Item>
              <Dropdown.Item eventKey="1998">1998</Dropdown.Item>
              <Dropdown.Item eventKey="1999">1999</Dropdown.Item>
              <Dropdown.Item eventKey="2000">2000</Dropdown.Item>
              <Dropdown.Item eventKey="2001">2001</Dropdown.Item>
              <Dropdown.Item eventKey="2002">2002</Dropdown.Item>
              <Dropdown.Item eventKey="2003">2003</Dropdown.Item>
              <Dropdown.Item eventKey="2004">2004</Dropdown.Item>
              <Dropdown.Item eventKey="2005">2005</Dropdown.Item>
              <Dropdown.Item eventKey="2006">2006</Dropdown.Item>
              <Dropdown.Item eventKey="2007">2007</Dropdown.Item>
              <Dropdown.Item eventKey="2008">2008</Dropdown.Item>
              <Dropdown.Item eventKey="2009">2009</Dropdown.Item>
              <Dropdown.Item eventKey="2010">2010</Dropdown.Item>
              <Dropdown.Item eventKey="2011">2011</Dropdown.Item>
              <Dropdown.Item eventKey="2012">2012</Dropdown.Item>
              <Dropdown.Item eventKey="2013">2013</Dropdown.Item>
              <Dropdown.Item eventKey="2014">2014</Dropdown.Item>
              <Dropdown.Item eventKey="2015">2015</Dropdown.Item>
              <Dropdown.Item eventKey="2016">2016</Dropdown.Item>
              <Dropdown.Item eventKey="2017">2017</Dropdown.Item>
              <Dropdown.Item eventKey="2018">2018</Dropdown.Item>
              <Dropdown.Item eventKey="2019">2019</Dropdown.Item>
              <Dropdown.Item eventKey="2020">2020</Dropdown.Item>
              <Dropdown.Item eventKey="2021">2021</Dropdown.Item>
            </DropdownButton>
            </Cell>

            <Cell col={1}><label>Quarter:</label></Cell>
            <Cell col={1}>
            <DropdownButton title={value4} id="Quarter" onSelect={handleSelect4}>
              <Dropdown.Item eventKey="Q1">Q1</Dropdown.Item>
              <Dropdown.Item eventKey="Q2">Q2</Dropdown.Item>
              <Dropdown.Item eventKey="Q3">Q3</Dropdown.Item>
              <Dropdown.Item eventKey="Q4">Q4</Dropdown.Item>
            </DropdownButton>
            </Cell>

            <Cell col={1}>
            <label>Type:</label></Cell>
            <Cell col={2}>
            <DropdownButton title={value} id="Building-Type" onSelect={handleSelect}>
              <Dropdown.Item eventKey="School">School</Dropdown.Item>
              <Dropdown.Item eventKey="Shopping">Shopping</Dropdown.Item>
              <Dropdown.Item eventKey="Industrial">Industrial</Dropdown.Item>
              <Dropdown.Item eventKey="Office">Office</Dropdown.Item>
              <Dropdown.Item eventKey="Warehouse">Warehouse</Dropdown.Item>
              <Dropdown.Item eventKey="Factory">Factory</Dropdown.Item>
              <Dropdown.Item eventKey="Commercial">Commercial</Dropdown.Item>
              <Dropdown.Item eventKey="Institutional">Institutional</Dropdown.Item>
              <Dropdown.Item eventKey="Non-residential">Non-residential</Dropdown.Item>
            </DropdownButton>
            </Cell>

            <Cell col={1}>
            <label>Location:</label></Cell>
            <Cell col={1}>
            <DropdownButton title={value2} id="Building-Location" onSelect={handleSelect2}>
            <Dropdown.Item eventKey="Calgary">Calgary</Dropdown.Item>
            <Dropdown.Item eventKey="Edmonton">Edmonton</Dropdown.Item>
            <Dropdown.Item eventKey="Halifax">Halifax</Dropdown.Item>
            <Dropdown.Item eventKey="Moncton">Moncton</Dropdown.Item>
            <Dropdown.Item eventKey="Montreal">Montreal</Dropdown.Item>
            <Dropdown.Item eventKey="Ottawa-Gatineau">Ottawa-Gatineau</Dropdown.Item>
            <Dropdown.Item eventKey="Saskatoon">Saskatoon</Dropdown.Item>
            <Dropdown.Item eventKey="St. John's">St. John's</Dropdown.Item>
            <Dropdown.Item eventKey="Toronto">Toronto</Dropdown.Item>
            <Dropdown.Item eventKey="Vancouver">Vancouver</Dropdown.Item>
            <Dropdown.Item eventKey="Winnipeg">Winnipeg</Dropdown.Item>
            </DropdownButton>
            </Cell>


            <Cell col={1}>
            <Button raised colored onClick={() =>{
              //App.toPredict = 1;
              var quarter_converter = {"Q1":".0","Q2":".25","Q3":".5","Q4":".75"};
              var start=new Date();
              var start_time=start.getTime();
              axios({
                method: 'get',
                url: `https://yifei-capstone-server.herokuapp.com/act/${value2}/${value3+quarter_converter[value4]}/${value}`
              })
              .then(res=>{
                if(res.data!=null)
                  setState(prevState=>{return {...prevState,plotActualValues:res.data.Values}});
              })
              .catch(err=>{
                console.log("Caught Error");
              });
              axios({
                method: 'get',
                url: `https://yifei-capstone-server.herokuapp.com/err/${value2}/${value3+quarter_converter[value4]}/${value}`
              })
              .then(res=>{
                if(res.data!=null)
                  setState(prevState=>{return {...prevState,plotErrValues:res.data.Values}});
              })
              .catch(err=>{
                console.log("caught");
              });
              axios({
                method: 'get',
                url: `https://yifei-capstone-server.herokuapp.com/pred/${value2}/${value3+quarter_converter[value4]}/${value}`
              })
              .then(res=>{
                if(res.data!=null){
                  setState(prevState=>{return {...prevState,plotPredValues:res.data.Values,startYear:res.data.Year,}});
                  setFinal(parseFloat(price)*parseFloat(res.data.Values[res.data.Values.length-1])/100,res.data.Values);
                  var d = new Date();
                  var n = d.getTime();
                  console.log("Start Time:",start_time,"End Time:",n,"Time Elapsed:",n-start_time);
                  setClicked(true);
                }
                else
                  alert("No data for these inputs yet");

              })
              .catch(err=>{
                alert("Invalid input, please try again");
              });

              ////////////////////User History////////////////////////////////////////////
              setClicked2(false);
              var parameters = [value3, value4, value, value2, price, final_price];
              User_history.push(parameters);
              //alert(User_history);
              setHistory(User_history);
              ////////////////////////////////////////////////////////////////////////////
            }}>Predict</Button>
            </Cell>
            
            { 
            
            (clicked && value2 === "Moncton")?<Cell col={12} style={{fontSize:"40"}}><div className="prediction" style={{margin:"15px"}}>
              Note: Moncton is a city without data before 2017 Q1, so the model used was a composition of 18.3% Toronto, 25.1% Montreal, 29.9% Ottawa, 26.7% Halifax.
              </div> </Cell>:null }
           

            
              { (clicked && value2 === "St. John's")?<Cell col={12} style={{fontSize:"40"}}><div className="prediction" style={{margin:"15px"}}>
                      Note: St. John's is a city without data before 2017 Q1, so the model used was a composition of 23.1% Toronto , 26.2% Montreal, 23.3% Ottawa, 27.5% Halifax.
                      </div></Cell>:null }
                    

        
              {  (clicked && value2 === "Saskatoon")?<Cell col={12} style={{fontSize:"40"}}><div className="prediction" style={{margin:"15px"}}>
                Note: Saskatoon is a city without data before 2017 Q1, so the model used was a composition of 32.0% Vancouver, 33.7% Calgary, 34.3% Edmonton.
                </div> </Cell>:null }
                    

        
                    {  (clicked && value2 === "Winnipeg")?<Cell col={12} style={{fontSize:"40"}}><div className="prediction" style={{margin:"15px"}}>
          Note: Winnipeg is a city without data before 2017 Q1, so the model used was a composition of 32.1% Vancouver, 33.5% Calgary, 34.4% Edmonton.
          </div> </Cell>:null }
           
            
            {  (clicked && final_price)?<Cell col={12} ><div className="prediction" style={{fontSize:"30px"}}>
              Predicted Building Price in {parseFloat(value3)+5} {value4}: {final_price.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}

              </div> </Cell>:null }
           
            

            <BarChart style={{margin:"auto"}}pred={state.plotPredValues} acc={state.plotActualValues} startYear={state.startYear}/>
            <ErrorChart err={state.plotErrValues} startYear={state.startYear}/>

            </Grid>
            </div>
         </Content>


         </Layout>


  
      </div>
    )
}



export default App;