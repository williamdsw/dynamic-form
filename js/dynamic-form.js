"use strict";

//---------------------------------------------------------------------------------//
// PARAMETERS

const TOTAL_NUMBER_OF_ROWS = 10;

let elements = 
[{
    nameID: "name_", nameValue: "",
    ageID: "age_", ageValue: "",
    materialStatusID: "marital_status_", maritalStatusValue: "",
    birthdayID: "birthday", birthdayValue: "",
    inputClass: "form-control"
}];

//---------------------------------------------------------------------------------//
// HELPER FUNCTIONS

$(document).ready (function ()
{
    $("#dynamic_form").submit (function (ev)
    {
        ev.preventDefault ();
    });

    listArray ();
});

/**
 * Add new row to array
 */
function addRow ()
{
    if (elements.length < TOTAL_NUMBER_OF_ROWS)
    {
        elements.push 
        ({
            nameID: "name_", nameValue: "",
            ageID: "age_", ageValue: "",
            materialStatusID: "marital_status_", maritalStatusValue: "",
            birthdayID: "birthday", birthdayValue: "",
            inputClass: "form-control"
        });

        listArray ();
    }
}

/**
 * Block the rows inputs
 */
function blockRow (row)
{
    let index = $(row).index ();

    $(row).find ("input, select").each (function ()
    {
        let actualClass = $(this).attr ("class");
        $(this).attr ("class", actualClass === "form-control" ? "form-control disabled" : "form-control");
        elements[index - 1].inputClass = $(this).attr ("class");
    });
}

/**
 * Deletes a row from array
 */
function deleteRow (index)
{
    if (elements.length > 1)
    {
        elements.splice (index, 1);
        listArray ();
    }
}

/**
 * List all itens of array
 */
function listArray ()
{
    let template =
    `<div class="row text-center">

        <!-- Counter (Text) -->
        <div class="col-1 d-none d-lg-block">
            <div class="form-group">
                <label class="font-weight-bold"> # </label>
            </div>
        </div>

        <!-- Name (Text) -->
        <div class="col-2 d-none d-lg-block">
            <div class="form-group">
                <label class="font-weight-bold"> * Name </label>
            </div>
        </div>

        <!-- Age (Numeric) -->
        <div class="col-1 d-none d-lg-block">
            <div class="form-group">
                <label class="font-weight-bold"> Age </label>
            </div>
        </div>

        <!-- Marital Status (Combobox) -->
        <div class="col-3 d-none d-lg-block">
            <div class="form-group">
                <label class="font-weight-bold"> * Marital Status  </label>
            </div>
        </div>

        <!-- Birthday (Date) -->
        <div class="col-3 d-none d-lg-block">
            <div class="form-group">
                <label class="font-weight-bold"> Birthday </label>
            </div>
        </div>
        
        <!-- Buttons -->
        <div class="col-2 d-none d-lg-block">
            <div class="form-group">
                <label class="font-weight-bold"> Controls </label>
            </div>
        </div>
    </div> `;

    // Inputs
    elements.forEach ((element, index) => 
    {
        template +=
        `<div class="row">

            <!-- Counter (Text) -->
            <div class="col-lg-1">
                <div class="form-group">
                    <input type="text" 
                           class="${element.inputClass}" 
                           value="${index + 1}" />
                </div>
            </div>

            <!-- Name (Text) -->
            <div class="col-lg-2">
                <div class="form-group">
                    <input type="text" 
                           id="${element.nameID + index}" 
                           name="name" 
                           class="${element.inputClass}" 
                           placeholder="Name..." 
                           value="${element.nameValue}" 
                           required />
                </div>
            </div>

            <!-- Age (Numeric) -->
            <div class="col-lg-1">
                <div class="form-group">
                    <input type="number" 
                           id="${element.ageID + index}" 
                           name="age" 
                           class="${element.inputClass}" 
                           placeholder="Age..." 
                           value="${element.ageValue}" />
                </div>
            </div>

            <!-- Marital Status (Combobox) -->
            <div class="col-lg-3">
                <div class="form-group">
                    <select id="${element.materialStatusID + index}" 
                            name="marital_status" 
                            class="${element.inputClass}" 
                            required>
                        <option value=""> Choose an Marital Status </option>
                        <option value="divorced" ${element.maritalStatusValue == "divorced" ? "selected" : ""}> Divorced </option>
                        <option value="married" ${element.maritalStatusValue == "married" ? "selected" : ""}> Married </option>
                        <option value="single" ${element.maritalStatusValue == "single" ? "selected" : ""}> Single </option>
                        <option value="windowed" ${element.maritalStatusValue == "windowed" ? "selected" : ""}> Windowed </option>
                    </select>
                </div>
            </div>

            <!-- Birthday (Date) -->
            <div class="col-lg-3">
                <div class="form-group">
                    <input type="date" 
                           id="${element.birthdayID + index}" 
                           name="birthday" 
                           class="${element.inputClass}"  
                           value="${element.birthdayValue}" />
                </div>
            </div>
            
            <!-- Buttons -->
            <div class="col-lg-2 text-center">
                <div class="form-group">
                    <div class="btn-group btn-group-justified" role="group">

                        <!-- Add -->
                        <div class="btn-group" role="group">
                            <button type="button" class="btn form-control add" title="Add"> 
                                <i class="fas fa-plus-square"></i>
                            </button>
                        </div>

                        <!-- Block -->
                        <div class="btn-group" role="group">
                            <button type="button" class="btn form-control block" title="Block"> 
                                <i class="fas fa-ban"></i>
                            </button>
                        </div>

                        <!-- Delete -->
                        <div class="btn-group" role="group">
                            <button type="button" class="btn form-control delete" title="Delete"> 
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div> `;
    });

    $("#container_rows").html (template);

    // Buttons events
    $(".btn.form-control.add").each (function (index, element)
    {
        $(element).click (function () 
        {
            storeRows ();
            addRow ();
        });
    });

    $(".btn.form-control.block").each (function ()
    {
        $(this).click (function ()
        {
            let row = $(this).parents ("div.row");
            blockRow (row);
        });
    });

    $(".btn.form-control.delete").each (function (index)
    {
        $(this).click (function ()
        {
            deleteRow (index);
        });
    });
}

/**
 * Store input values to array
 */
function storeRows ()
{
    elements.forEach ((element, index) => 
    {
        element.nameValue = $("input[name=name]")[index].value;
        element.ageValue = $("input[name=age]")[index].value;
        element.maritalStatusValue = $("select[name=marital_status]")[index].value;
        element.birthdayValue = $("input[name=birthday]")[index].value;
    });
}