import React from "react"
import { Link } from "gatsby"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/styles"
import { AccordionDetails, Typography } from "@material-ui/core"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Accordion from '@material-ui/core/Accordion'
import Checkbox from '@material-ui/core/Checkbox'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Divider from '@material-ui/core/Divider'
import $ from 'jquery'
import config from '../../config.json'
import '../styles/loader.css'

import SearchResults from '../components/searchResults'

const styles = ({
    header: {
        background: "#ededed",
        // margin: "0 1rem",
        padding: "0.5rem 1rem",
        borderTop: "0.1rem solid #fff",
    },
    searchResult: {
        width: "100%",
        borderBottom: "0.1rem solid #f4f4f4",
        padding: "1rem 0",
        marginRight: "1rem"
    },
    filters: {
        height: "100%",
        marginTop: "1rem"
    },
    filter: {
        // display: "flex",
        padding: "1rem",
        // background: "#f5f5f5",
        borderBottom: "0.1rem solid #f4f4f4",
    }
})

const Filter = ({classes, name, types, callback}) => {
    // console.log(types)
    // const handleFilters = (isChecked, name, item) => {
    //     console.log("filter", isChecked, name, item)
    //     if(!isChecked) {
    //         let tempResults = []
    //         results[0].map((result) => {
    //             if(result[name] != item) tempResults.push(result)
    //         })
    //         callback(tempResults)
    //     }
    //     else {
    //         console.log(results[0].length, results[1].length)
    //         let tempResults = results[1]
    //         results[0].map((result) => {
    //             if(result[name] == item) {
    //                 tempResults.push(result)
    //                 // console.log(result)
    //             }
    //         })
    //         console.log(tempResults, tempResults.length)
    //         callback(tempResults)
    //         // csole.log(results[1].length)
    //     }
    // }
    return(
        // <Grid xs={9} justify="center" alignContent="center">
            <Accordion square style={{width:"100%", background:"#f0f0f0", marginRight: "1.5rem"}} elevation={0}> 
                <AccordionSummary aria-controls={name + "d-content"} id={name + "d-header"} expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">{name}</Typography>
                </AccordionSummary>  
                <AccordionDetails style={{display:"flex", flexDirection:"column", justifyItems: "center", alignContent:"center"}}>
                    
                        {Array.from(types[0]).map((item) => {
                            return(<Typography>
                            <Checkbox
                                defaultChecked
                                color="primary"
                                onChange={() => callback(name, item)}
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                style={{}}
                            />
                            {item} <Typography variant="caption">({types[1][item]})</Typography>
                        </Typography>)
                        
                        })}
                    
                </AccordionDetails>
            </Accordion>
        // </Grid>
    )
}

const SearchResultsContainer = ({classes, location}) => {
    const [loading, setLoading] = React.useState(false)
    const [filters, setFilters] = React.useState({
        Unit: [new Set(), {}, {}],
        Source: [new Set(), {}, {}],
        Frequency: [new Set(), {}, {}]
    })

    const handleFiltersChange = (name, item) => {
        let tempFilter = {...filters}
        tempFilter[name][2][item] = !tempFilter[name][2][item] 
        setFilters(tempFilter)
    }

    React.useEffect(() => {
        let tempResults = []
        searchResults.map((result) => {
            if(filters["Unit"][2][result["Unit"]] && filters["Source"][2][result["Source"]] && filters["Frequency"][2][result["Frequency"]]) {
                tempResults.push(result)
            }
        })
        setDisplayedSearchResults(tempResults)
    }, [filters])

    const [searchResults, setSearchResults] = React.useState([{
        Title: "",
        Description: "",
        Unit: "",
        Source: "",
        Frequency: ""
    }])
    const [displayedSearchResults, setDisplayedSearchResults] = React.useState([{
        Title: "",
        Description: "",
        Unit: "",
        Source: "",
        Frequency: ""
    }])

    React.useEffect(() => {
        fetchData()
    }, [])
    const fetchData = () => {
        let url = config["baseUrl"] + 'api/search'
        // console.log(url)
        setLoading(true)
        $.ajax({
            url: url,
            data: {
                query: location.state.query
            },
            method: "GET",
            success: (response) => {
                // console.log(response, response.length)
                let tempFilters = {
                    Unit: [new Set(), {}, {}],
                    Source: [new Set(), {}, {}],
                    Frequency: [new Set(), {}, {}]
                }
                // console.log("first", tempFilters)
                response.map((item) => {
                    tempFilters["Unit"][0].add(item.Unit)
                    if(item.Unit in tempFilters["Unit"][1]) tempFilters["Unit"][1][item.Unit] += 1
                    else tempFilters["Unit"][1][item.Unit] = 1
                    tempFilters["Unit"][2][item.Unit] = true

                    tempFilters["Source"][0].add(item.Source)
                    if(item.Source in tempFilters["Source"][1]) tempFilters["Source"][1][item.Source] += 1
                    else tempFilters["Source"][1][item.Source] = 1
                    tempFilters["Source"][2][item.Source] = true

                    tempFilters["Frequency"][0].add(item.Frequency)
                    if(item.Frequency in tempFilters["Frequency"][1]) tempFilters["Frequency"][1][item.Frequency] += 1
                    else tempFilters["Frequency"][1][item.Frequency] = 1
                    tempFilters["Frequency"][2][item.Frequency] = true
                })
                setFilters(tempFilters)
                setSearchResults(response)
                setDisplayedSearchResults(response)
                setLoading(false)
            },
            error: (response) => {
                // console.log(response)
                setLoading(false)
            }
        })
    }
    return(
        <Grid container>
            <Grid item xs={12} className={classes.header}>
                <Typography variant="h5" style={{paddingBottom:"1rem"}}>Search Results</Typography>
                <Typography variant="body2">Displaying {searchResults.length} results for <strong>{location.state != undefined ? location.state.query : ""}</strong>.</Typography>
            </Grid>
            <Grid xs={12} className={classes.header} style={{height:"2rem", borderBottom:"0.1rem solid #e8e8e8"}}>
            </Grid>
            <Grid container xs={3} justify="center" className={classes.filters}>
                <Filter classes={classes} name="Unit" types={filters["Unit"]} callback={handleFiltersChange} />
                <Filter classes={classes} name="Source" types={filters["Source"]}  callback={handleFiltersChange} />
                <Filter classes={classes} name="Frequency" types={filters["Frequency"]} callback={handleFiltersChange} />
            </Grid>
            <Grid container xs={9} className={classes.searchResults} alignItems="center" justify="center">
                {
                    loading ? (<div className="loader"></div>) : (<SearchResults classes={classes} data={displayedSearchResults} />) 
                }
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(SearchResultsContainer)
