import React from "react"
import { Link, navigate } from "gatsby"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/styles"
import { Typography } from "@material-ui/core"
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import '../styles/loader.css'

const styles = ({
    searchResult: {
        width: "100%",
        borderBottom: "0.1rem solid #f4f4f4",
        padding: "1rem 0",
        
    },
})

// if (typeof window !== `undefined`) {
//     window.onbeforeunload = () => {
//         navigate("/")
//     }
// }

const SearchResult = ({classes, data}) => {
    const [expanded, setExpanded] = React.useState(false)
    
    const showCompleteDescription = (event) => {
        if(event.target.nodeName == "svg")
            event.target.parentElement.style.transform += "rotate(180deg)"
        else if(event.target.nodeName == "path") event.target.parentElement.parentElement.style.transform += "rotate(180deg)"
            if(!expanded) {
        document.getElementById(data.Title + "description").innerHTML = data.Description
        // event.target.style.transform = "rotate(180deg)"
        }
        else {
        document.getElementById(data.Title + "description").innerHTML = data.Description.split(". ")[0] + ". " + data.Description.split(". ")[1] + ". "
        // event.target.style.transform = "rotate(-180deg)"  
        }
        console.log(event.target)
        setExpanded(!expanded)
    }
    return(
        <div className={classes.searchResult}>
            <Typography variant="h6" style={{color:"blue", textDecoration: "underline"}}>{data.Title}</Typography>
            <Typography variant="body1">{data.Unit}, {data.Frequency}, {data.Source}</Typography>
            <Typography variant="body2" id={data.Title + "description"}>
                {data.Description.split(". ")[0] + ". " + data.Description.split(". ")[1] + ". "}
            </Typography>
            <IconButton onClick={(event) => showCompleteDescription(event)} color="primary" style={{transitionDuration: "1s"}} aria-label="upload picture" component="span" style={{height: "0.5rem", width:"0.5rem", margin: "0", position:"relative", left: "-0.5rem"}}>
            <ExpandMoreIcon htmlColor="blue" />
            </IconButton>
        </div>
    )
}

const SearchResults = ({classes, data}) => {
    if(data.length == 0) {
        return(
            <Typography variant="body1" style={{opacity:"0.8"}}> No results found. Try another query.</Typography>
        )
    }
    else {
    return(
        <>
        {
            data.map((item) => {
                return(
                    <SearchResult classes={classes} data={item} />
                )
            })
        }
        </>
    )
    }
}

export default withStyles(styles)(SearchResults)