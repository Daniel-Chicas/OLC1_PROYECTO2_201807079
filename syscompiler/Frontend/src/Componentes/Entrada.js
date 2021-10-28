import React from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Editor from '../Componentes/Editor.js'
//VER LAS ID DE LOS COMPONENTES PARA EMPEZAR A ELIMINAR :D

function TabPanel(props) {

    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`Editor${index}`}
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
  
  function a11yProps(index) {
    return {
      id: `Editor${index}`,
      'aria-controls': `Editor${index}`,
    };
  }

function Entrada(props) {
    const [val, setVal] = React.useState("")
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    if(props.Texto.length === 0){
      var datosPes = localStorage.getItem('datosPes')
      var datosP = JSON.parse(datosPes)
      return (
        <div>
            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 350, width: '100%'}}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
            className = "General"
          >
            {datosP.map((dato, index) => (
              <Tab label={"Pestaña "+index} {...a11yProps(index)} />
            ))}
          </Tabs>
          {datosP.map((dato, index) => (
              <TabPanel value={value} index={index} >
                <Editor 
                  id={"Editor"+index}
                  language = "javascript"
                  value = {val}
                  setValue = {setVal}
                />
              </TabPanel>
          ))}
        </Box>
        </div>
    )
    }else{
    return (
        <div>
            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 350, width: '100%'}}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
            className = "General"
          >
            {props.Texto.map((dato, index) => (
              <Tab label={"Pestaña "+index} {...a11yProps(index)} />
            ))}
          </Tabs>
          {props.Texto.map((dato, index) => (
              <TabPanel value={value} index={index} >
                <Editor 
                  id={"Editor"+index}
                  language = "javascript"
                  value = {val}
                  setValue = {setVal}
                  />
              </TabPanel>
          ))}
        </Box>
        </div>
    )
  }
}

export default Entrada
