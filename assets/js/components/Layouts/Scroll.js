import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExapndLessIcon from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
    toTop: {
        zIndex: 2,
        position: 'fixed',
        bottom: '2vh',
        backgroundColor: '#3f51b5',
        color: 'white',
        "&;hover, &.Mui-focusVisible": {
            transition: '0.3s',
            color: 'green',
            backgroundColor: '#3f51b5'
        },
        right: '5%',
    },
}));

{/* <Scroll showBelow={250}/> */}

const Scroll = (showBelow) => {
    const classes = useStyles();
    const [show, setShow] = useState(showBelow ? false : true)
    const handleScroll = () => {
        if (window.pageYOffset > showBelow.showBelow) {
            if (!show) setShow(true)
        } else {
            if (show) setShow(false)
        }
    }


    const handleClick = () => {
        window['scrollTo']({ top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        if (showBelow) {
            window.addEventListener('scroll', handleScroll)
            return () => window.removeEventListener('scroll', handleScroll)
        }
    })


    return (
        <div>
            {show &&
                <IconButton onClick={handleClick} className={classes.toTop}>
                    <ExapndLessIcon />
                </IconButton>
            }
        </div>

    )
}


export default Scroll