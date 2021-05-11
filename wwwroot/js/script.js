
const uri = "/api/Cars"; //the api as a controller name
// alert("API " + uri);
let allCar = null; //holds the data 


function getCounted(data) {
   
}
//this function reloads the table 
function LoadTable() {
    $.ajax({
        type: "GET", //use the GET controller
        url: uri, 
        cache: false, 
        success: function (data) { //if the request succeeds ....
            const tBody = $("#allCar"); //for the tbody bind with allcar <tbody id="allcar"></tbody>
            allCar = data; //pass in all the data to allcar use it in Edit
            $(tBody).empty(); //empty out old data
            getCounted(data.length); //counted for the  function
            //foreach data will appear in rows
            $.each(data,
                function (key, item) {
                    const tr = $("<tr></tr>")
                        .append($("<td></td>").text(item.name)) //fill content in the tags
                        .append($("<td></td>").text(item.model))
                        .append($("<td></td>").text(item.year))
                        .append($("<td></td>").text(item.color))
                        .append($("<td></td>")
                            //creating link for editing data
                            .append($("<a href='#editCarModal' data-toggle='modal'><i class='material-icons' style='font-size:30px; color: blue;' title='Edit'>&#xE254;</i></a>)")
                              
                                    .on("click",
                                        function () {
                                            editItem(item.id);
                                        }) 
                                )
                            )
                            .append($("<td></td>") //creating link for delete data
                                .append($("<a  href='#deleteCarModal' data-toggle='modal'><i class='material-icons' style='font-size:30px; color: red;' data-toggle='tooltip' title='Delete'>&#xE872;</i></a>)")
                                   
                                                    .on("click", function () {
                                                        $("#delete-id").val(item.id);
                                                    }
                                                        
                                                    )
                                        
                                )
                            
                            
                             );
                    tr.appendTo(tBody);//add all the rows to the tbody
                });
        }
    });
}
//Add an Information of car to the database
function addItem() {
    const item = {
        name: $("#add-name").val(),
        model: $("#add-model").val(),
        year: $("#add-year").val(),
        color: $("#add-color").val(),
    };
    $.ajax({
        type: "POST", //Here the POST is calles in the API controller
        accepts: "application/json",
        url: uri,
        contentType: "application/json",
        data: JSON.stringify(item),
        //if there is an error
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong !!");
        },
        //if it is successfully added
        success: function (result) {
            LoadTable();
            $("#add-name").val(""); //clear entry boxes
            $("#add-model").val("");
            $("#add-year").val("");
            $("#add-color").val("");

            alert("Car Detail added successfully !!");
        }
    });
}
//Delete car detail from the database
function deleteItem(id) {

    $.ajax({
        url: uri + "/" + id, //add the ID to the end of the URI
        type: "DELETE", //Here DELETE is called in the API controller
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
//$(".my-form").on("submit", //saving the edited information in database
function saveItem() {
    const item = { //pass all the data on the form to a variable called item use later to send to server
        name: $("#edit-name").val(),
        model: $("#edit-model").val(),
        year: $("#edit-year").val(),
        color: $("#edit-color").val(),
        id: $("#edit-id").val()
    };
    alert("Information updated successfully!!");

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


