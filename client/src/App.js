import './App.css';
import { DataGrid } from '@mui/x-data-grid';
import React, {useState, useEffect} from 'react';
import { Box, Container, Typography} from '@mui/material';



function App() {

  const [rows, setRows] = useState([])

  useEffect(() => {
    var unsorted = [
      { id: 1, name: 'Snow', points: 35, category: 'Lorem Ipsum' },
      { id: 2, name: 'Lannister', points: 42, category: 'Lorem Ipsum' },
      { id: 3, name: 'Lannister', points: 45, category: 'Lorem Ipsum' },
      { id: 4, name: 'Stark', points: 16, category: 'Lorem Ipsum' },
      { id: 5, name: 'Targaryen', points: 32, category: 'Lorem Ipsum' },
      { id: 6, name: 'Melisandre', points: 150, category: 'Lorem Ipsum' },
      { id: 7, name: 'Clifford', points: 44, category: 'Lorem Ipsum' },
      { id: 8, name: 'Frances', points: 36, category: 'Lorem Ipsum' },
      { id: 9, name: 'Roxie', points: 65, category: 'Lorem Ipsum' },
    ];

    unsorted.sort((a,b) => {
      return (a.points - b.points) * -1;
    })

    var rank = 1;

    for (var r of unsorted){
      r.rank = rank;
      rank++;
    }

    setRows(rows)
  }, [])

  




  const columns = [
    { field: 'rank', headerName: 'Rank', width: 140, sortable: false},
    { field: 'name', headerName: 'Name', width: 320, sortable: false},
    { field: 'points', headerName:'Points', width: 320, sortable: false, sortingOder: 'desc', },
    { field: 'category', headerName: 'Best Category', width: 320, sortable: false}
  ];



  return (
    <Box  style={{textAlign: 'center'}}>
      <h1> Trivia Leaderboard </h1>
      <Box style={{ height: 600, width: '80%', display:'flex', margin: 'auto' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowsPerPageOptions={[]}
          alignItems='center'
          display='flex'
        />
      </Box>
    </Box>
  );
}

export default App;
