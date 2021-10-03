import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { withStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// *************************************************************************
// Following consts StyledTableCell and StyledTableRow are for styling the
// Material UI table
// *************************************************************************

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

// *************************************************************************
// Following const App is the main function where the API request calls are
// made
// *************************************************************************

const App = () => {
  //Webpage title
  const title = 'Planetary attributes from Star Wars';
  const [planets, setPlanets] = useState([]); //Hook which contains planet data

  const getPlanetData = async () => {

    try{
      let result = []
      let data = await axios.get("https://swapi.dev/api/planets/");
      result = result.concat(data.data.results)
      let next = data.data.next

      //Since there are many pages that contain planets, the "next" field
      //from the data -> data -> results section is checked to see if there
      //is a next page. If yes, another get request is sent and concatenated
      //to the results array.
      while(next !=null){
        data = await axios.get(next);
        result = result.concat(data.data.results)
        next = data.data.next
      }
      //The hook is populated with the results array.
      setPlanets(result);

    } catch(e){
      
      console.log(e);
    }
  };
  useEffect(() => {
    getPlanetData();
  }, [])

  return (
    <div className="App">
      <div className = "content">
        <h1> {title} </h1>
      </div>
    
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Name</StyledTableCell>
          <StyledTableCell align="right">Population</StyledTableCell>
          <StyledTableCell align="right">Rotation Period</StyledTableCell>
          <StyledTableCell align="right">Orbital Period</StyledTableCell>
          <StyledTableCell align="right">Diameter</StyledTableCell>
          <StyledTableCell align="right">Climate</StyledTableCell>
          <StyledTableCell align="right">Surface Water</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {planets.map((item) => (
          <StyledTableRow key={item.id}>
            <StyledTableCell component="th" scope="row">
              {item.name}
            </StyledTableCell>
            <StyledTableCell align="right">{item.population}</StyledTableCell>
            <StyledTableCell align="right">{item.rotation_period}</StyledTableCell>
            <StyledTableCell align="right">{item.orbital_period}</StyledTableCell>
            <StyledTableCell align="right">{item.diameter}</StyledTableCell>
            <StyledTableCell align="right">{item.climate}</StyledTableCell>
            <StyledTableCell align="right">{item.surface_water}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</div>
  );
}

//Exporting the functions for access outside of App.js
export default App;
