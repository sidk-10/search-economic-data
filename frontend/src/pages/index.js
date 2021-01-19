import React from "react"
import { Link } from "gatsby"
import { withStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { navigate } from 'gatsby-link'

const styles = ({
    container: {
        margin: "auto",
        width:"60vw",
        margin:"30vh 20vw"
    },
    searchBar: {
        boxSizing: "border-box",
        height: "3rem",
        padding: "0.75rem 1.5rem",
        width: "60vw",
        margin: "1rem 0",
        background: "#ededed",
        // outline: "none",
        border: "none",
        fontSize: "1.1rem",
        borderRadius: "0.5rem",
        '&:focus': {
            border: "none",
            outline: "none"
        }
    },
    searchButton: {
        borderRadius: "0.5rem",
        // position: "relative",
        // marginRight: 0
        float: "right",
        padding: "0.5rem 1.5rem"
    }
})

const IndexPage = ({classes}) => {
    const sendSearchQuery = (event) => {
        event.preventDefault()
        // console.log(document.getElementById("searchBar").value)
        if(document.getElementById("searchBar").value != "") {
            // location.state = document.getElementById("searchBar").value
            navigate("/searchResults", {state: {
                query: document.getElementById("searchBar").value
            }})
        }
    }
    return(
        <div className={classes.container}>
            <Typography variant="h3" style={{margin:"auto"}}>EconSearch</Typography>
            <input type="text" id="searchBar" className={classes.searchBar} placeholder="Enter your query..." />
            <Button onClick={(event) => {sendSearchQuery(event)}} className={classes.searchButton} variant="contained" color="primary" disableElevation={true}>Search</Button>
        </div>
    )
}

export default withStyles(styles)(IndexPage)
