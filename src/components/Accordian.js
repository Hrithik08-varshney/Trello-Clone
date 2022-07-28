import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import CollectionsIcon from '@mui/icons-material/Collections';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
/* import GridViewIcon from '@mui/icons-material/GridView';  */
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group'; 
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { Link } from "react-router-dom";

/* import CreditCardIcon from '@mui/icons-material/CreditCard'; */
export default function ControlledAccordions(props) {
  const data=[
    {
      idName:"leftBoards",
      icon:<NoteAltIcon/>,
      name:"Boards",
      to:props.titleName
    },
    {
       idName:"leftCollections",
       icon:<CollectionsIcon/>,
      name:"Collections",
      to:props.titleName
    },
    {
      idName:"leftHighlights",
      icon:<FavoriteBorderIcon/>,
     name:"Highlights"
   },
   /* {
    idName:"leftView",
    icon:<GridViewIcon/>,
   name:"View"
   }, */
   {
  idName:"leftMember",
  icon:<GroupIcon/>,
 name:"Members"
  },
 {
idName:"leftSettings",
icon:<SettingsIcon/>,
name:"Settings"
 },
 /* {
  idName:"leftBilling",
  icon:<CreditCardIcon/>,
 name:"Billing"
   } */
   ];
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (

    <div>
    
      <Accordion
        expanded={expanded === `panel1`}
        onChange={handleChange(`panel1`)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            <WorkspacesIcon />
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            <span className="leftBelowTittleName">{props.titleName}</span>
          </Typography>
        </AccordionSummary>
        {data.map((item, index) => {
          return (
            <AccordionDetails key={index}>
              <Link 
              to={`/${item.to}`}
              className="leftBelowContentDiv">
              <div className="leftBelowIcon">
                  {item?.icon}
                </div>
                <div className="leftBelowIconTitle">
                    {item?.name}
                </div>    
              </Link>
            </AccordionDetails>
          );
        })}
      </Accordion>
    </div>
  );
}

/*
 */
