import { Box, Stack, Typography } from '@mui/material'

/**
 * An panel that introduce the web service.
 */
const WelcomePanel = () => {
  return (
    <Box sx={{ display:{xs:'none', sm:'none', md:'none', lg:'block'}, 
      backgroundImage:'linear-gradient(to top left, #133a37ff, #127067)',
      height:'100vh', flex:'inline', float:'left'}}>
      <Stack sx={{padding:5}}>
        <Typography  style={{ color:"#e7f1f1ff", fontWeight:'bold', 
          fontSize:'80px' }}>Smart Health Predictive</Typography>
        <Typography noWrap={true} style={{ color:"#e7f1f1ff", fontWeight:'bold', 
          fontSize:'80px' }}> </Typography>
        <Typography style={{ color:"#cae4e4ff" }}>
          Smart Health Predictive empowers individuals to take control of their
          well-being through data-driven insights. Using AI-powered health analytics,
          WellAI helps you understand potential health risks early and make informed
          lifestyle choices for a better, healthier future.
        </Typography>
      </Stack>  
    </Box>
  );
}

export default WelcomePanel;
