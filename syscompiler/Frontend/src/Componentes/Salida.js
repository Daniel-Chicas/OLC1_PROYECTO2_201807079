import React from 'react'
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import '../Estilos/Editor.css'
import Consola from '../Componentes/Consola.js'

function TabPanel(props) {

    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        style = {{width:"100%"}}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

function Salida(props) {
    const [js, setJs] = React.useState("")
    //console.log(props.Texto, "entrada")
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
        <div>
            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 350 }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
            className = "General"
          >
          </Tabs>
              <TabPanel value={value} index={0}>
                <Consola 
                  id={"Editor Salida"}
                  language = "javascript"
                  displayName = "Salida"
                  value={js}
                  onChange={setJs}
                  disable = "true"
                />
              </TabPanel>
        </Box>
        </div>
    )
}

export default Salida
