function calendalha(target,options) {

	// This library requires moment.js to work properly

	// Defaults and variables
    options = options || [];
    options.textAlign   		= options.textAlign || 'center'; // position of the days in the calendar {center,left,right}
	options.onDayClick     		= options.onDayClick || function(){return}; //onDayClick function(value = "YYYY-MM-DD")
	options.selectDayOnClick	= options.selectDayOnClick || false; // mark day as selected on Click
	options.onMonthChange 		= options.onMonthChange || function(){return}; //onDayClick function(value = "YYYY-MM-DD")
    options.locale      		= options.locale || ''; // locale of moment() with moment format
    options.initDate     		= options.initDate || moment().format("YYYY-MM-DD"); // initial date of the calendar "YYYY-MM-DD"
    options.markedDates     	= options.markedDates || []; // marcked dates of the calendar (marked dates get "marked" class) ["YYYY-MM-DD","YYYY-MM-DD","YYYY-MM-DD",...]
    options.initDayActive		= options.initDayActive || false; // initDate receives active status (class "active") {true,false}
    options.renderCustomDay		= options.renderCustomDay || false; // custom function to create a custom html of the table cell <td>
    options.celVAlign			= options.celVAlign || 'top'; // vertical aligment of the content inside the table cell {'top','bottom','middle'}
    options.custLeftArrow		= options.custLeftArrow || '&lt;&lt;'; // custom html to the left arrow "<<"
	options.custRightArrow		= options.custRightArrow || '&gt;&gt;'; // custom html to the right arrow ">>"
	options.weekFormat			= options.weekFormat || "ddd"; // abbreviate week day name ex: Monday => Mon
	options.monthFormat			= options.monthFormat || "MMMM" // month string format based in moment format

	currentDay		=	moment().format('DD');   // Today's day.
	currentMonth	=	moment().format('MM');   // Today's month.
	currentYear		=	moment().format('YYYY'); // Today's year.
	options.initDate=	moment(options.initDate); 
	moment.locale(options.locale);

	// Define default.
	var targetEl = document.querySelector(target);
	var monthChange = 0;
	var storedDay;
	var storedMonth;
	var storedYear;
	var actualMonth; //month showing in the calendar
	var actualYear; //year showing in the calendar
	
	// Load on init
	function staticContent() {

		// Append skeleton / markup
		function appendMarkup() {
            // String to append
            var str = `<div class="calendalha-control" style="-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none; "><span class="prev">${options.custLeftArrow}</span><div><span class="month"></span>&nbsp;<span class="year"></span></div><span class="next">${options.custRightArrow}</span></caption></div>`
			str += `<table class="calendalha-body" style="-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none; text-align:${options.textAlign}"><thead><tr></tr></thead><tbody></tbody></table>`;
			// Append mockup
            targetEl.innerHTML += str;
        }

		// Insert table head
		function tableHead() {
			// Define variable
			var th = '';
			// Loop through mon-sun.
			for (i = 0; i <= 6; i++) {
				// Append <th> to the variable
				th += '<th>'+moment().isoWeekday(i).format(options.weekFormat)+'</th>';
			}
			// Append the string to thead tr
			targetEl.querySelector('table thead tr').innerHTML += th;
		}

		// Execute functions.
		appendMarkup();
		tableHead();
	}

	// Will execute on init & prev + next buttons.
	function dynamicContent(change, activeDay) {
		// Define variables and set default.
		change = change || 0;
		activeDay = activeDay || null;
		// Determine how many months to add or subtract.
		monthChange += change;
        // New Date
		newDate = moment(options.initDate).add(monthChange,'months');
		// Active month dates.
		calendarMonth = newDate.format('MM');
		calendarYear = newDate.format('YYYY');

		function appendHeadline(month, year) {
			actualMonth	= month;
			actualYear 	= year;
			
			// Convert month from int to string.
            month = (moment(month,"MM").format(options.monthFormat));
			// Append month and year to caption
			targetEl.querySelector('.calendalha-control .month').textContent = month;
			targetEl.querySelector('.calendalha-control .year').textContent = year;
		}

		function appendDays(month, year, push) {
			// Define
            var appendStr = '';
            var value;
			// Push
			theFirst = parseInt(moment(month+'-01-'+year,'MM-DD-YYYY').format('e'), 10); // monday = 0;
			index = 1; // the days are 1-based, not 0.
			push = index - theFirst;
			// Days in month
			daysInMonth = moment(calendarMonth+'-'+calendarYear, 'MM-YYYY').daysInMonth();
			// Push the day & append each day in the month.
			x = 0;
			for (i = push; i <= daysInMonth; i++) {
				value = moment(year+"-"+month+"-"+i,'YYYY-MM-D').format("YYYY-MM-DD");
				x++;
				var string = i;

				if(options.renderCustomDay !== false){
					string = options.renderCustomDay(i,moment(year+"-"+month+"-"+i,'YYYY-MM-D'));
				}

				if (x === 1) {
					if( i > 0){
						appendStr += `<tr valign="${options.celVAlign}"><td data-value="${value}">${string}</td>`;
					}else{
						appendStr += `<tr valign="${options.celVAlign}"><td disabled></td>`;	
					}
				} else if(x === 7) {
					appendStr += `<td valign="${options.celVAlign}" data-value="${value}">${string}</td></tr>`;
					x = 0;
				} else if(i > 0){
					appendStr += `<td valign="${options.celVAlign}" data-value="${value}">${string}</td>`;
				}else{
					appendStr += `<td valign="${options.celVAlign}" disabled></td>`;
				}
			}
			// Finish the week with blank days.
			if (x !== 0) {
				for (i = 1; i <= (7-x); i++) {
					appendStr += '<td disabled></td>';
				}
			}

			appendStr += '</tr>';
			// Remove existing tbody-rows (tr).
			if(targetEl.querySelector('table tbody tr')) {
				targetEl.querySelector('table tbody tr').remove();
			}
			// Append new tablerows.
			targetEl.querySelector('table tbody').innerHTML = appendStr;
		}

		this.styleDays = function() {
            // if data matches last time a td were clicked
			if (storedMonth == calendarMonth && storedYear == calendarYear) {
				activeMonth = 1;
			} else {
				activeMonth = 0;
			}
			// Loop through each day
			targetEl.querySelectorAll('table tbody td').forEach(function(el) {
				// Get date inside td's
				calendarDate = parseInt(el.textContent, 10);
				// If date is less than 1, make the day, blank.
				if (calendarDate < 1) {
					// Replace the html of "td" with null.
					el.innerHTML = '';
				}
				// If date is equal to today
				if (calendarDate == currentDay && calendarMonth == currentMonth && calendarYear == currentYear) {
					el.classList.add('currentDay');
				}
				
				if( options.initDate.format('YYYYMMDD') == calendarYear+calendarMonth+calendarDate && options.initDayActive){
					el.classList.add('active');
				}
				
				if (activeMonth == 1 && storedDay == calendarDate) {
					el.classList.add('active');
                }

                //mark the date receives the class "marked"
                if(options.markedDates.includes(el.getAttribute('data-value'))){
                    el.classList.add('marked');
				}

			});
		}

		// If the month have been changed but no day have been clicked
		if (activeDay === null) {
			// Execute functions.
			appendHeadline( calendarMonth, calendarYear );
			appendDays( calendarMonth, calendarYear );
			this.styleDays();
		}
		// If activeDay != null (a <td> have been clicked).
		else {
			// Set month and year for the active date.
			storedDay	= activeDay;
			storedMonth	= calendarMonth;
			storedYear	= calendarYear;

			// Loop through each day and remove .active from all elements that isn't the clicked date.
			targetEl.querySelectorAll('tbody td').forEach(function(el) {
				tdDays = el.textContent;
				// If date = the clicked date
				if (activeDay == tdDays && options.selectDayOnClick) {
					el.classList.add('active');
				} else {
					el.classList.remove('active');
				}
			}); // end each
		}
	}

	// Init static content (ex: lang & table-head).
	staticContent();
	// Init the calender && get returned data from function
	dynamicContent();
	options.onMonthChange(actualMonth,actualYear)
	// Prev / Next buttons
	targetEl.querySelector('.prev').addEventListener('click',function(e) {
		dynamicContent(-1);
		options.onMonthChange(actualMonth,actualYear);
	});

	targetEl.querySelector('.next').addEventListener('click',function(e) {
		dynamicContent(1);
		options.onMonthChange(actualMonth,actualYear);
	});

	targetEl.querySelector('table tbody').addEventListener("click", function(event) {
		let el = event.target;
		if(el.tagName != 'td' && el.getAttribute('disabled')) return;
        day = el.textContent;
        options.onDayClick(el.getAttribute('data-value'));
		dynamicContent(null, day);
	});

	return;
}
