import { Fragment, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// @mui/material
import { Container, Typography, Paper, Box, TextField, IconButton, Stack, backdropClasses } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { problems } from '../../data/problems';


const ProblemItem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  // console.log(location);

  // const ProblemItem = location.state;
  // console.log(ProblemItem);
  
  const ProblemItem = problems.find((problem) => problem.id.toString() === params.id);
  console.log("param", ProblemItem);

  useEffect(() => {
    if (!ProblemItem) {
      navigate('/problems');
    }
  }, [ProblemItem, navigate]);

  return (
    <Fragment>
      <Container maxWidth="lg">
        <Paper sx={{
          height: '100vh',
          minWidth: { xs: 300, sm: 600, md: 900 }, py: { xs: 2, md: 4 }, px: { xs: 0, md: 5 },
          backgroundColor: '#f2f2f2'
        }} >
          {ProblemItem && (
            <Fragment>
              <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom>
                  Problems : {ProblemItem.problems}
              </Typography>

              <Paper sx={{ display: 'flex', flexDirection: 'column', height: 'auto', py: { xs: 2, md: 4 }, px: { xs: 0, md: 5 } }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  <Box fontWeight="fontWeightBold" mb={1}>
                    Description :
                  </Box>
                  {ProblemItem.description}
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom>
                  <Box fontWeight="fontWeightBold" mb={1}>
                    Input :
                  </Box>
                  {ProblemItem.input}
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom>
                  <Box fontWeight="fontWeightBold" mb={1}>
                    Output :
                  </Box>
                  {ProblemItem.output}
                </Typography>
              </Paper>
              
              <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom marginTop={4}>
                  History :
              </Typography>
              <Paper sx={{ height: 'auto', py: { xs: 2, md: 4 }, px: { xs: 0, md: 5 } }}>
                
              </Paper>
            </Fragment>
          )}
        </Paper>
      </Container>
    </Fragment >
  )
}

export default ProblemItem