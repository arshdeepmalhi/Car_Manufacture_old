//run the LoadTable function when the page has loaded
//$(document).ready(function () {
//    //alert("hi"); checked the file is linked or not
//    LoadTable();
//});

const uri = "/api/Cars"; //the api as a global variable
// alert("API " + uri);
let allCar = null; //holds the data in a global
//Loads up the <p id="counter"> </p> with a count of the staff, data come from the LoadTable Function where this is called
function getCount(data) {
    // alert("getcount " + datas);
    const theCount = $("#counter"); //bind TheCount to the counter
    if (data) { //if any data exists
        // alert("We have data " + data);
        theCount.text("There are " + data + " Cars");
    } else {
        theCount.text("There are no Cars");
        alert("No data");
    }
}
//this function reloads the table of staff after any changes
function LoadTable() {
    $.ajax({
        type: "GET", //use the GET controller
        url: uri, //the uri from the global
        cache: false, //don't cache the data in browser reloads, get a fresh copy
        success: function (data) { //if the request succeeds ....
            const tBody = $("#allCar"); //for the tbody bind with allcar <tbody id="allcar"></tbody>
            allCar = data; //pass in all the data to the global allcar use it in Edit
            $(tBody).empty(); //empty out old data
            getCount(data.length); //count for the counter function
            //a foreach through the rows creating table data
            $.each(data,
                function (key, item) {
                    const tr = $("<tr></tr>")
                        .append($("<td></td>").text(item.name)) //inserts content in the tags
                        .append($("<td></td>").text(item.model))
                        .append($("<td></td>").text(item.year))
                        .append($("<td></td>").text(item.color))
                        .append($("<td></td>")
                            .append($("<button href='#editCarModal' class='btn-success' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Edit'>&#xE254;</i></button>)")
                                .on("click",
                                    function () {
                                        editItem(item.id);
                                    }) //in the empty cell append in an edititem button
                            )
                        )
                        .append(
                            $("<td></td>")
                                .append(
                                    $('<button  href="#deleteCarModal" data-toggle="modal" class="btn-success" ><i class="material - icons" data-toggle="tooltip" title="Delete">&#xE872;</i></button>')
                                        .on("click", function () {
                                            $("#delete-id").val(item.id);
                                        }
                                            //in an empty cell add in a deleteitem button
                                        )
                                )
                        );
                    tr.appendTo(tBody);//add all the rows to the tbody
                });
        }
    });
}
//Add an person to the database
function addItem() {
    const item = {
        name: $("#add-name").val(),
        model: $("#add-model").val(),
        year: $("#add-year").val(),
        color: $("#add-color").val(),
    };
    $.ajax({
        type: "POST", //this calls the POST in the API controller
        accepts: "application/json",
        url: uri,
        contentType: "application/json",
        data: JSON.stringify(item),
        //if there is an error
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong!");
        },
        //if it is successful
        success: function (result) {
            LoadTable();
            $("#add-name").val(""); //clear entry boxes
            $("#add-model").val("");
            $("#add-year").val("");
            $("#add-color").val("");

            alert("Car Detail added successfully");
        }
    });
}
//Delete a person from the database
function deleteItem(id) {

    $.ajax({
        url: uri + "/" + id, //add the ID to the end of the URI
        type: "DELETE", //this calls the DELETE in the API controller
        success: function (result) {
            LoadTable();
        }
    });
}
//click event for edit button to load details into form. Go through each entry held in allCar and add in the one that matches the id from the click
function editItem(id) {
    $.each(allCar,
        function (key, item) {
            if (item.id === id) {//where the ID == the one on the click
                $("#edit-name").val(item.name); //add it to the form field
                $("#edit-id").val(item.id);
                $("#edit-model").val(item.model);
                $("#edit-year").val(item.year);
                $("#edit-color").val(item.color);;
            }
        });
}
//$(".my-form").on("submit", //saving the edit to the db
function saveItem() {
    const item = { //pass all the data on the form to a variable called item use later to send to server
        name: $("#edit-name").val(),
        model: $("#edit-model").val(),
        year: $("#edit-year").val(),
        color: $("#edit-color").val(),
        id: $("#edit-id").val()
    };
   // alert($("#edit-color").val());
    $.ajax({
        url: uri+"/"+$("#edit-id").val(), //add the row id to the uri
        type: "PUT", //send it to the PUT controller
        accepts: "application/json",
        contentType: "application/json",
        data: JSON.stringify(item), //take the item data and pass it to the serever data is moved to server
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong!");
        },
        success: function (result) {
            alert("data upated successfully!!");
            LoadTable(); //load the table fresh
        }
    });
    return false;
};