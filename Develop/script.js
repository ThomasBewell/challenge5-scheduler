//execute function once DOM is fully loaded
$(document).ready(function() {
    //set today's date on jumbotron
    const todaysDate = moment();
    $("#currentDay").text(todaysDate.format("dddd | MMMM Do YYYY"));

    //create rows for the scheduler
    function createScheduler(date) {
        //start at 9am (business hours)
        date = moment(date).hour(9);

        //loop through bootstrap rows
        for (let i = 0; i < 12; i++) {
            
            //create row divs
            const rowDiv = $("<div>").addClass("row").attr("id", `row${i}`);
            //create hour divs
            const hourDiv = $("<div>").addClass("col-1 hour time-block d-flex align-items-center justify-content-center").text(date.format("H a")).attr("id", `hour${i}`);
            //create text box divs
            const textDiv = $("<textarea>").addClass("col-10 time-block text-box save-block").attr("id", `text${i}`);
            //create save button
            const saveDiv = $("<div>").addClass("col-1 d-flex align-items-center justify-content-center saveBtn save-block");
            let saveBtn = $("<button>").addClass("btn fas fa-save fa-lg save-button").attr("id", i).attr("title", "Save");
            //append all divs to container
            $(".container").append(rowDiv.append(hourDiv,textDiv,saveDiv.append(saveBtn)));

            //color-code the text divs 
            if (todaysDate.isAfter(date, "hour")) {
                textDiv.addClass("past");
            } else if (todaysDate.isBefore(date, "hour")) {
                textDiv.addClass("future");
            } else {
                textDiv.addClass("present");
            }

            //increment by hour
            date.add(1, "hour");
        }
    }

    //execute createScheduler function on page load
    $(window).on("load", createScheduler());

    //get saved items from local storage
    function showSaved () {
        for (let i = 0; i < 12; i++) {
            let savedItems = localStorage.getItem("text" + i);
            $("#text" + i).text(savedItems);
        }
    }

    //add saved items to local storage
    function addItems(event) {
        event.preventDefault();
        localStorage.setItem($(this)[0].previousElementSibling.id, $(this)[0].previousElementSibling.value);
    }

    //save button functionality
    let saveButton = $(".saveBtn");
    saveButton.click(addItems);
    showSaved();
});