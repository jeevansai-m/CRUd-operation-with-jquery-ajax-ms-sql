/// <reference path="ref/angular.js" />
/// <reference path="ref/jquery-3.5.1.js" />
var countryDDL = $('#Country');
var statesDDL = $('#State');
var districtsDDL = $('#District');

$(document).ready(function () {
    var countryDDL = $('#Country');
    var statesDDL = $('#State');
    var districtsDDL = $('#District');
    loadData();
    country_bind();
   


    function country_bind() {
        $.ajax({
            url: 'DataService.asmx/GetCountries',
            method: 'post',
            dataType: 'json',
            success: function (data) {
                districtsDDL.empty();
                statesDDL.empty()
                countryDDL.append($('<option/>', { value: -1, text: 'Select Country' }));
                statesDDL.append($('<option/>', { value: -1, text: 'Select State' }));
                districtsDDL.append($('<option/>', { value: -1, text: 'Select Districts' }));

                $(data).each(function (index, item) {
                    countryDDL.append($('<option/>', { value: item.Id, text: item.Name }));
                    
                });
                States_bind();
            },
            error: function (err) {
                alert(err);
            }
        });
    }
    

    function States_bind() {
        countryDDL.change(function () {
            if ($(this).val() == "-1") {
                statesDDL.empty();
                districtsDDL.empty();
                statesDDL.append($('<option/>', { value: -1, text: 'Select State' }));
                districtsDDL.append($('<option/>', { value: -1, text: 'Select Districts' }));
                statesDDL.val('-1');
                districtsDDL.val('-1');
            }
            else {
                districtsDDL.empty();
                districtsDDL.append($('<option/>', { value: -1, text: 'Select Districts' }));
                districtsDDL.val('-1');
                $.ajax({
                    url: 'DataService.asmx/GetStatesByCountriesId',
                    method: 'post',
                    dataType: 'json',
                    data: { CountriesId: $(this).val() },
                    success: function (data) {
                        statesDDL.empty();
                        statesDDL.append($('<option/>', { value: -1, text: 'Select State' }));
                        $(data).each(function (index, item) {
                            statesDDL.append($('<option/>', { value: item.Id, text: item.Name }));
                            
                        });
                        statesDDL.val('-1');
                        District_bind();
                    },
                    error: function (err) {
                        alert(err);
                    }
                });
            }
        });
    }
    function District_bind() {
        statesDDL.change(function () {
            if ($(this).val() == "-1") {
                districtsDDL.empty();
                districtsDDL.append($('<option/>', { value: -1, text: 'Select Districts' }));
                districtsDDL.val('-1');
            }
            else {
                $.ajax({
                    url: 'DataService.asmx/GetDistrictsByStatesId',
                    method: 'post',
                    dataType: 'json',
                    data: { StatesId: $(this).val() },
                    success: function (data) {
                        districtsDDL.empty();
                        districtsDDL.append($('<option/>', { value: -1, text: 'Select Districts' }));
                        $(data).each(function (index, item) {
                            districtsDDL.append($('<option/>', { value: item.Id, text: item.Name }));
                        });
                        districtsDDL.val('-1');
                    },
                    error: function (err) {
                        alert(err);
                    }
                });
            }
        });
    }
    //$('#insertName').click(function () {
    //    var data = {}
    //    data.Name = $('#cname').val();
    //    $.ajax({
    //        url: 'DataService.asmx/AddEmployee',
    //        method: 'post',
    //        data: '{data: ' + JSON.stringify(data) + '}',
    //        contentType: "application/json; charset=utf-8",
    //        success: function () {
    //            resetForm();
    //            alert("inserted");
    //        },
    //        error: function (err) {
    //            alert(err);
    //        }
    //    });

    //});

     


    //------------inserting register function-------------------
    $('#Btn_Insert').click(function () {
            var res = validate();
        if (res == false) {
            return false;
        }
        var data = {}
        data.Id = $('#Id').val();
        data.Name = $('#Name').val();
        data.Email = $('#Email').val();
        data.Pnum = $('#Pnum').val();
        data.Country = $("#Country option:selected").text();
        data.State = $("#State option:selected").text();
        data.District = $("#District option:selected").text();
        data.Gender = $('input[name="Gender"]:checked').val();


        $.ajax({
            url: 'DataService.asmx/InsertRegister',
            method: 'post',
            data: '{data: ' + JSON.stringify(data) + '}',
            contentType: "application/json; charset=utf-8",
            success: function () { 
                if (data.Id == 0) {
                    alert("inserted");
                    openTab(event, 'Record');
                    loadData();
                } else {
                    alert("updated");
                    openTab(event, 'Record');
                    loadData();
                    
                }
            },
            error: function (err) {
                alert(err);
            }
        });
        ResetClear();
        $('#Id').val(0);
    });
    //--------- edit register function------------
    //Function for getting the Data Based upon Employee ID

   



    //on load end---------------
});
function Get_Search() {
    $('#Search_Table tr').remove();
    var Name =$('#txtsearchname').val();
    var Email = $('#txtsearchemail').val();
    var Status = $('#drpstatussearch').val();

    $.ajax({
        url: 'DataService.asmx/Search_Btn',
        method: 'post',
        data: { Name: Name, Email: Email, Status: Status },
        dataType: 'json',
        success: function (data) {
            btn_search(); 

            $(data).each(function (index, item) {
                var Status = item.Status;
                var res_status = '';
                var btnEditDelete;
                if (Status == 'Active') {
                    res_status = '<i class="fa fa-check" style="font-size:24px;color:green"></i> ';
                    btnEditDelete = '</td><td><a style="color: Green" onclick="getbyID(' + item.Id + ')">Edit</a> | <a style="color: red"  onclick="Deletes(' + item.Id + ')">Delete</a></td>';
                }
                else {
                    res_status = '<i st class="fa fa-close" style="font-size:24px;color:red"></i> ';
                    btnEditDelete = '</td><td><a >Edit</a> | <a >Delete</a></td>';
                }
                var row = '<tr><td>' + item.Name + '</td><td>' + item.Email + '</td><td>' + item.Pnum + '</td><td>' + item.Country
                    + '</td><td>' + item.State + '</td><td>' + item.District + '</td><td>' + item.Gender + '</td><td><a onclick="Status_Register(' + item.Id + ')">' + res_status + '</a>'
                    + btnEditDelete;
                $('#Search_Table').append(row);

            });
            ResetClear();
            Email_Register();
        },
        error: function (err) {
            alert(err);
        }
    });
}


//------------get register display function-------------------
function loadData() {
    $('#tblrecord tr').remove();
    $.ajax({
        url: 'DataService.asmx/GetRegister',
        method: 'post',
        dataType: 'json',
        success: function (data) {

            $(data).each(function (index, item) {
                var Status = item.Status;
                var res_status = '';
                var btnEditDelete;
                if (Status == 'Active') {
                    res_status = '<i class="fa fa-check" style="font-size:24px;color:green"></i> ';
                    btnEditDelete = '</td><td><a style="color: Green" onclick="getbyID(' + item.Id + ')">Edit</a> | <a style="color: red"  onclick="Deletes(' + item.Id + ')">Delete</a></td>';
                }
                else {
                    res_status = '<i st class="fa fa-close" style="font-size:24px;color:red"></i> ';
                    btnEditDelete = '</td><td><a >Edit</a> | <a >Delete</a></td>';
                }
                var row = '<tr><td>' + item.Name + '</td><td>' + item.Email + '</td><td>' + item.Pnum + '</td><td>' + item.Country
                    + '</td><td>' + item.State + '</td><td>' + item.District + '</td><td>' + item.Gender + '</td><td><a onclick="Status_Register(' + item.Id + ')">' + res_status + '</a>'
                    + btnEditDelete;
                $('#tblrecord').append(row);

            });
            ResetClear();
            Email_Register();
        },
        error: function (err) {
            alert(err);
        }
    });
}
var EmailArray = [];

function Email_Register() {
    EmailArray = [];
    $.ajax({
        url: 'DataService.asmx/GetRegister',
        method: 'post',
        dataType: 'json',
        success: function (data) {

            $(data).each(function (index, item) {
                EmailArray.push(item.Email);
            });

            ResetClear();
        },
        error: function (err) {
            alert(err);
        }
    });
}

//------------------------------edit Register get values fuction--------------------
function getbyID(Id) {
    $('#Name').css('border-color', 'lightgrey');
    $('#Email').css('border-color', 'lightgrey');
    $('#Pnum').css('border-color', 'lightgrey');
    $("#Country option:selected").css('border-color', 'lightgrey');
    $("#State option:selected").css('border-color', 'lightgrey');
    $("#District option:selected").css('border-color', 'lightgrey');
    $('input[name="Gender"]:checked').css('border-color', 'lightgrey');

    $.ajax({
        url: "DataService.asmx/On_Click_EditRegister",
        method: 'post',
        data: { Id: Id },
        dataType: "json",
        success: function (data) {
            $(data).each(function (index, item) {
                $('#Id').val(item.Id);
                $('#Name').val(item.Name);
                $('#Email').val(item.Email);
                $('#Pnum').val(item.Pnum);
                $('select[id="Country"]').find('option:contains(' + item.Country + ')').attr("selected", true);
                ////$('select[id="State"]').find('option:contains(' + item.State + ')').attr("selected", true);
                ////$('select[id="District"]').find('option:contains(' + item.District + ')').attr("selected", true);
                var Country = item.Country;
                var State = item.State;
                var District = item.District;

                
                $('#State').empty();
                $('#District').empty();
                $('#State').append($('<option/>', { value: -1, text: item.State }));
                $('#District').append($('<option/>', { value: -1, text: item.District }));
                $('select[id="State"]').find('option:contains(' + State + ')').attr("selected", true);
                $('select[id="District"]').find('option:contains(' + item.District + ')').attr("selected", true);
                $("#District option").each(function () {
                    if ($(this).text() == item.District) {
                        $(this).attr('selected', 'selected');
                    }
                });

                let result = item.Gender;

                if (result == "male") {

                    $("#male").prop("checked", true);
                }
                else if (result == "female") {
                    $("#female").prop("checked", true);
                }
                else if (result == "other") {
                    $("#other").prop("checked", true);
                }
                $('#Btn_Insert').val("Update");
                openTab(event, 'Form');
            });
        },
        error: function (err) {
            alert('error  on getId' + err);
        }
    });
}
//------------------validate---------------------------
function validate() {
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }
    if ($('#Email').val().trim() == "") {
        $('#Email').css('border-color', 'Red');
        isValid = false;
    }
    else {
        if (Id.value == 0) {
            for (let i = 0; i < EmailArray.length; i++) {
                if (EmailArray[i] == Email.value) {
                    alert('The Email already exist');
                    $('#Email').css('border-color', 'Red');
                    isValid = false;
                }
            }
        }
        $('#Email').css('border-color', 'lightgrey');
    }
    if ($('#State').val().trim() == "") {
        $('#State').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#State').css('border-color', 'lightgrey');
    }
    if ($('#Country').val().trim() == "") {
        $('#Country').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Country').css('border-color', 'lightgrey');
    }
    return isValid;
}
//--------------------------delete Register---------------
function Deletes(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "DataService.asmx/Delete",
            data: { Id: ID},
            type: "POST",
            dataType: "json",
            success: function (result) {
                alert("Successflly Deleted");
                
                
            },
        });
    }
    loadData();
}

//------------------------------Updte Register values fuction--------------------
//$('#Btn_Update').click(function () {
//    var res = validate();
//    if (res == false) {
//        return false;
//    }
//    var data = {}
//    data.Id = $('#Id').val();
//    data.Name = $('#Name').val();
//    data.Email = $('#Email').val();
//    data.Pnum = $('#Pnum').val();
//    data.Country = $("#Country option:selected").text();
//    data.State = $("#State option:selected").text();
//    data.District = $("#District option:selected").text();
//    data.Gender = $('input[name="Gender"]:checked').val();


//    $.ajax({
//        url: 'DataService.asmx/InsertRegister',
//        method: 'post',
//        data: '{data: ' + JSON.stringify(data) + '}',
//        contentType: "application/json; charset=utf-8",
//        success: function () {
//            $('#tblrecord tr').remove();
//            loadData();
//            alert("inserted");
//        },
//        error: function (err) {
//            alert(err);
//        }
//    });

//});
function Status_Register(ID) {
    var res = '';
    $.ajax({
        url: "DataService.asmx/On_Click_EditRegister",
        method: 'post',
        data: { Id: ID },
        dataType: "json",
        success: function (data) {
            $(data).each(function (index, item) {
                var result = '';
                if (item.Status == 'Active') {
                    result = 'InActive';
                } else {
                    result = 'Active';
                }
                var ans = confirm("Are you sure you want to Change Status?");
                if (ans) {
                    $.ajax({
                        url: "DataService.asmx/Status_Register",
                        data: { Id: ID, Status: result },
                        type: "POST",
                        dataType: "json"                       
                    });
                    alert("Successflly changed Status");
                    loadData();
                }

            });
        },
        error: function (err) {
            alert('error  on get ststus by Id' + err);
        }
    });
}





function ResetClear() {
    $('#Id').val(0);
    $('#Name').val("");
    $('#Email').val("");
    $('#Pnum').val("");
    $('#Country').val(-1);
    $('#State').empty();
    $('#District').empty();
    $('#State').append($('<option/>', { value: -1, text: 'Select State' }));
    $('#District').append($('<option/>', { value: -1, text: 'Select Districts' }));
    $("#male").prop("checked", false);
    $("#female").prop("checked", false);
    $("#other").prop("checked", false);
    $('#Btn_Insert').val("Submit");

}


function btn_search() {
    var x = document.getElementById("Tbl_Search");
    x.style.display = "block";
    //if (x.style.display === "none") {
    //    x.style.display = "block";
    //} else {
    //    x.style.display = "none";
    //}
}
function btn_search_Clear() {
    document.getElementById("txtsearchname").value = "";
    document.getElementById("txtsearchemail").value = "";
    document.getElementById("drpstatussearch").value = "";
    document.getElementById("Tbl_Search").style.display = "none";

}

function openTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
