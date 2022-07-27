import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ArrWorkspace } from "../context/arr.context";
import { useContext } from 'react';


export default function VisibilityAccordian(props) {
  const [titleVal,setTitleVal]=React.useState(props.title);
  const [expanded, setExpanded] = React.useState(false);
  const {arrWork, setArrWork} = useContext(ArrWorkspace);

  const handleSubmit=(e)=>{
  setTitleVal(e.target.innerText);
  props.setUrlVal(e.target.innerText);
  props.setBackData({...props.backData,workspaceName:e.target.innerText})
   setExpanded(false);
  }
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ color: 'text.secondary' }}> {titleVal}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {
          Object.values(arrWork).map((item,index)=>{
              return (
                <div key={index}
                 onClick={handleSubmit} className='visibilityAccordian'>
                    <div className='visibilityWorkspace'>
                      {item.title}
                    </div>
                </div>
              )
            })
        }
          
        </AccordionDetails>
        </Accordion>
    </div>
  );
}
