import * as React from 'react';
import Popover from '@mui/material/Popover';
import HeadingBtn from './HeadingBtn';
export default function BasicPopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <div aria-describedby={id} onClick={handleClick} key={props.index} className="rightDivBtn">
                  <div className="rightDivBtnIcon">{props.itemIcon}</div>
                  <div className="rightDivBtnTitle">{props.itemTitle}</div>
                  </div>    
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
      <div className='listBtnPopper'>
        <HeadingBtn 
          func={handleClose}
            name={props.itemTitle} />
           </div>
           {props.children}
      </Popover>
    </div>
  );
}