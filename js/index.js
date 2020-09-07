"use strict";

//---------------------------------------------------------------------------------//
// PARAMETERS

const TOTAL_NUMBER_OF_ROWS = 10;

let persons = [{
    name: { id: 'inputName-', value: '' }, 
    age: { id: 'inputAge-', value: '' }, 
    maritalStatus: { id: 'selectMaritalStatus-', value: '' }, 
    birthdate: { id: 'inputBirthdate-', value: '' },
    inputClass: 'form-control', readonly: '', tabIndex: ''
}];

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

$(document).ready (() => {
    const dynamicForm = document.querySelector('#dynamicForm');

    $(dynamicForm).submit(function (ev) {
        ev.preventDefault();
    });

    listArray ();
});

/**
 * Add new row to array
 */
function addRow () {
    if (persons.length < TOTAL_NUMBER_OF_ROWS) {
        persons.push({
            name: { id: 'inputName-', value: '' }, 
            age: { id: 'inputAge-', value: '' }, 
            maritalStatus: { id: 'selectMaritalStatus-', value: '' }, 
            birthdate: { id: 'inputBirthdate-', value: '' },
            inputClass: 'form-control', readonly: '', tabIndex: ''
        });

        listArray ();
    }
}

/**
 * Block the rows inputs
 */
function blockRow (row) {
    const index = $(row).index ();
    const person = persons[index - 1];
    
    let actualClass = (person.inputClass === 'form-control' ? 'form-control disabled' : 'form-control');
    person.inputClass = actualClass;
    person.readonly = (actualClass === 'form-control' ? '' : 'readonly');
    person.tabIndex = (actualClass === 'form-control' ? '' : 'tabindex="-1"');
    listArray();
}

/**
 * Deletes a row from array
 */
function deleteRow (index) {
    if (persons.length > 1) {
        persons.splice (index, 1);
        listArray ();
    }
}

/**
 * List all itens of array
 */
function listArray () {
    let template =
    `<div class="row text-center">

        <!-- Counter -->
        <div class="col-lg-1 col-md-4 col-4">
            <div class="form-group">
                <label class="font-weight-bold"> # </label>
            </div>
        </div>

        <!-- Name -->
        <div class="col-lg-2 col-md-4 col-4">
            <div class="form-group">
                <label class="font-weight-bold"> * Name </label>
            </div>
        </div>

        <!-- Age -->
        <div class="col-lg-1 col-md-4 col-4">
            <div class="form-group">
                <label class="font-weight-bold"> Age </label>
            </div>
        </div>

        <!-- Marital Status -->
        <div class="col-lg-3 col-md-4 col-4">
            <div class="form-group">
                <label class="font-weight-bold"> * Marital Status  </label>
            </div>
        </div>

        <!-- Birthdate -->
        <div class="col-lg-3 col-md-4 col-4">
            <div class="form-group">
                <label class="font-weight-bold"> Birthdate </label>
            </div>
        </div>
        
        <!-- Buttons -->
        <div class="col-lg-2 col-md-4 col-4">
            <div class="form-group">
                <label class="font-weight-bold"> Controls </label>
            </div>
        </div>
    </div>`;

    // Inputs
    persons.forEach ((person, index) => {
        template +=
        `<div class="row inputs">

            <!-- Counter -->
            <div class="col-lg-1 col-md-4 col-sm-4 text-center font-weight-bold"> ${index + 1} </div>

            <!-- Name -->
            <div class="col-lg-2 col-md-4 col-sm-4">
                <div class="form-group">
                    <input type="text" id="${person.name.id + index}" name="name" class="${person.inputClass}" 
                                 placeholder="Name..."  value="${person.name.value}" 
                                 ${person.readonly} ${person.tabIndex} required />
                </div>
            </div>

            <!-- Age -->
            <div class="col-lg-1 col-md-4 col-sm-4">
                <div class="form-group">
                    <input type="number" id="${person.age.id + index}" name="age" 
                           class="${person.inputClass}" placeholder="Age..." 
                           value="${person.age.value}" min="18" max="120"
                           ${person.readonly} ${person.tabIndex} />
                </div>
            </div>

            <!-- Marital Status -->
            <div class="col-lg-3 col-md-4 col-sm-4">
                <div class="form-group">
                    <select id="${person.maritalStatus.id + index}" name="marital_status" class="${person.inputClass}"
                            ${person.readonly} ${person.tabIndex} required>
                        <option value=""> Choose an Marital Status </option>
                        <option value="divorced" ${person.maritalStatus.value == 'divorced' ? 'selected' : ''}> Divorced </option>
                        <option value="married" ${person.maritalStatus.value == 'married' ? 'selected' : ''}> Married </option>
                        <option value="single" ${person.maritalStatus.value == 'single' ? 'selected' : ''}> Single </option>
                        <option value="windowed" ${person.maritalStatus.value == 'windowed' ? 'selected' : ''}> Windowed </option>
                    </select>
                </div>
            </div>

            <!-- Birthdate -->
            <div class="col-lg-3 col-md-4 col-sm-4">
                <div class="form-group">
                    <input type="date" id="${person.birthdate.id + index}" name="birthdate" 
                           class="${person.inputClass}" value="${person.birthdate.value}"
                           placeholder="mm/dd/yyyy"
                           ${person.readonly} ${person.tabIndex} />
                </div>
            </div>
            
            <!-- Buttons -->
            <div class="col-lg-2 col-md-4 col-sm-4 text-center">
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
        </div>`;
    });

    // Elements
    const containerRows = $('#containerRows');
    containerRows.html(template);

    const addButtons = $('.btn.form-control.add');
    const blockButtons = $('.btn.form-control.block');
    const deleteButtons = $('.btn.form-control.delete');

    // Events

    addButtons.each((index, element) => {
        $(element).click(() => {
            storeRows();
            addRow();
        });
    });

    blockButtons.each((index, element) => {
        $(element).click(function() {
            storeRows();
            const row = $(this).parents('div.row.inputs');
            blockRow(row);
        });
    });

    deleteButtons.each((index, element) => {
        $(element).click(() => {
            deleteRow(index);
        });
    });
}

/**
 * Store input values to array
 */
function storeRows () {
    persons.forEach ((person, index) => {
        person.name.value = $('input[name=name]')[index].value;
        person.age.value = $('input[name=age]')[index].value;
        person.maritalStatus.value = $('select[name=marital_status]')[index].value;
        person.birthdate.value = $('input[name=birthdate]')[index].value;
    });
}