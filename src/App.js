import logo from './logo.svg';
import './App.css';
import {Grid, Cell,Textfield, Button} from 'react-mdl';
function App() {
  return (
    <div className="App">
     <div style={{width: '80%', margin: 'auto'}}>
    <Grid className="demo-grid-ruler">
          <Cell col={3}>{/* Textfield with floating label */}
            {/* Simple textfield */}
            <Textfield
                onChange={() => {}}
                label="Date..."
                style={{width: '200px'}}
                floatingLabel
            />
            </Cell>
            <Cell col={3}>{/* Numeric Textfield with floating label */}
            <Textfield
                onChange={() => {}}
                label="Type..."
                style={{width: '200px'}}
                floatingLabel
            />
          </Cell>
          <Cell col={3}>{/* Numeric Textfield with floating label */}
          <Textfield
                onChange={() => {}}
                label="Location..."
                style={{width: '200px'}}
                floatingLabel
            />
          </Cell> 
          <Cell col={3}>{/* Numeric Textfield with floating label */}
          <Button raised colored style={{marginTop:'15px'}}>Return Model Prediction</Button>
          </Cell> 
    </Grid>

    <Grid className="output-grid-1">
        <Cell col={2} >Predictions</Cell>
        <Cell col={2} >Year 1:</Cell>
        <Cell col={2} >Year 2:</Cell>
        <Cell col={2} >Year 3:</Cell>
        <Cell col={2} >Year 4:</Cell>
        <Cell col={2} >Year 5:</Cell>
    </Grid>
    <Grid className="output-grid-2">
        <Cell col={2} >Actual Values</Cell>
        <Cell col={2} >Year 1:</Cell>
        <Cell col={2} >Year 2:</Cell>
        <Cell col={2} >Year 3:</Cell>
        <Cell col={2} >Year 4:</Cell>
        <Cell col={2} >Year 5:</Cell>
    </Grid>
    <Grid className="output-grid-3">
        <Cell col={2} >Accuracy:</Cell>
    </Grid>
    <Grid className="graph-grid">
        <Cell col={12} style={{background:"white"}} >Graph Goes Here (Later)<img src={logo}></img></Cell>
    </Grid>
</div>
</div>

  );
}

export default App;
