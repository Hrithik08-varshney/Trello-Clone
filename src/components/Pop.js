import * as React from 'react';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HeadingBtn from './HeadingBtn';
export default function Pop(props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const buttonStyle={
    fontSize:"17px",
    color:"white",
    backgroundColor:"transparent",
    border:"none",
    cursor:"pointer"
  }
  return (
    <ClickAwayListener 
    onClickAway={handleClickAway}>
      <Box sx={{ 
        position: 'relative' }}>
        <button 
           style={buttonStyle}
        sx={{
            fontSize:30,
        }
        }
        type="button" onClick={handleClick}>
           {props.name} {`${props.check}`==="true"?<ExpandMoreIcon
           sx={{
            fontSize:15
        }}
           /> : null}
        </button>
        
        {open ? (
          <Box 
           sx={props.styling}
          >
          <HeadingBtn 
          func={handleClickAway}
            name={props.headingName} />
            {props.children}
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
}