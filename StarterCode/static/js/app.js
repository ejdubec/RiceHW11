// from data.js
var tableData = data;

// YOUR CODE HERE!
/*
PLAN:   First create a filtering function (returns true when the record should remain)
        Second create a table-filtering function (takes data and applies ^ to it)
            This should also make the table, actually
        Third create input and submit markers/functions to actually do ^
*/

// note that date here is an object in data array, requestDate will be the input from user
// note I had to modify this filter function because JavaScript is only slightly more intuitive than Malbolge
function filterDate(date, requestDate) {
    return function(date) {
        return date.datetime === requestDate;
    }
}

// note that I've incorporated the submit function into this (slight deviation from plan)

function makeTable() {
    d3.event.preventDefault();
    let requestDate = d3.select('#datetime').property('value');
    let newTable = data.filter(filterDate(data, requestDate));
//    console.log(newTable);
    let tbl = d3.select('#ufo-table');
    let tbody = tbl.select('tbody');

//  get rid of old stuff
//  note, there's almost certainly a better way to do this (maybe replace with empty tbody or something)
    tbl.selectAll('tbody tr').remove();
// the table has structure Date, City, State, Country, Shape, Duration, Comments
// corresponds to obj.datetime, .city, .state, .country, .shape, .durationMinutes, .comments
    newTable.forEach(function(date) {
        let row = tbody.append('tr');
        row.append('td').text(date.datetime);
        row.append('td').text(date.city);
        row.append('td').text(date.state);
        row.append('td').text(date.country);
        row.append('td').text(date.shape);
        row.append('td').text(date.durationMinutes);
        row.append('td').text(date.comments);
    });
}

// I'll put the main table on the page
let ufoTable = d3.select('#ufo-table');
let ufoBody = ufoTable.select('tbody');
data.forEach(function(date) {
    let row = ufoBody.append('tr');
    row.append('td').text(date.datetime);
    row.append('td').text(date.city);
    row.append('td').text(date.state);
    row.append('td').text(date.country);
    row.append('td').text(date.shape);
    row.append('td').text(date.durationMinutes);
    row.append('td').text(date.comments);
});

// apparently if I say makeTable() within the .on it calls it immedaitely??????
d3.select('#filter-btn').on('click', makeTable);