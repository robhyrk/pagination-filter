//Calculates total students, then divides by 10 to determine pages required

// Prefix any "view" related objects with "$"
const $students = $('.student-item');

// Turn NodeList object into an Array so that we can use the new awesome
// ES6 array methods
const students = [].slice.call($students);
const pages = Math.ceil(students.length/10);
const pagination = document.querySelector('ul')
//Shows only first 10 students
$students.slice(10).hide();

//Hides all students
//Shows first 10 student for each page
let showpage = (pageNumber, studentList) => {
	let studentsToShow = pageNumber * 10
	$students.hide();

	studentList.slice(studentsToShow-10, studentsToShow).forEach(student => {
		$(student).show();
	});
}

//Creates pagination buttons depending on size of student list
//Calls showpage function when a pagination button is clicked
let appendPageLinks = (studentsToShow) => {
		let div = document.createElement('div');
		$(div).addClass('pagination');
		pagination.appendChild(div);
	for (let i=1;i<pages+1;i++) {
		let li = document.createElement('li');
		li.innerHTML = '<a href="#">' + i + '</a>';
		div.appendChild(li);

	}
	let activeClass = $('.pagination a');
	activeClass.click((e)=>{
		// This will prevent the "jump" to the top of the page, and also prevent
		// adding the "#" to the url when clicking the pagination link
		e.preventDefault();

		activeClass.removeClass('active');
		$(e.target).addClass('active');
		let pageNumber = e.target.textContent;
		showpage(pageNumber, studentsToShow);
	})
}

appendPageLinks(students);

//SEARCH FUNCTION
//Inserts search bar and button
const h2 =  document.querySelector('h2');
h2.insertAdjacentHTML('afterend', '<form class="student-search"><input placeholder="Search for students..."><button type="submit">Search</button></form>');

//Captures input field
// Since you're using jQuery on the page anyway, not much harm in using it everywhere. It looks less bloated
// than vanilla JS. Use vanilla JS when you aren't going to include jQuery on the page at all (The reason for
// not using jQuery is normally because it's pretty big and can add a lot to page load)
const $searchForm = $('.student-search');
const inputField = document.querySelector('input');
const myButton = document.getElementsByTagName('button')[0];

// Using a "form" and listening to the "submit" event instead of a click event on the button
// is more accessible, because you can automatically use the "Enter" button to perform the search
$searchForm.on('submit', e => {
	e.preventDefault();

	const searchTerm = inputField.value;

	// Provide a quick and dirty way to allow users to reset the search
	if (searchTerm === '') {
		showpage(1, students);
		$(".pagination").show();
		$('.results').hide();
		return;
	}
	else {
		$students.hide();
		$(".pagination").hide();
	}

	//All student names and emails are put into separate arrays
	const filteredStudents = students.filter(student => {
		const name = $('h3', student).text();
		const email = $('.email', student).text();

		// Create an array of first name, last name, and email
		const testArray = [...name.split(' '), email];

		// This might be a lot to digest, so I'll break it down.
		//  - The "some" method will execute the provided function on every
		//    item in the array and return "true" if ANY of the functions
		//    returned true
		//  - With the Arrow function you can omit the braces if you are doing a simple
		//    return of true or false. So below is equal to:
		//    `item => { return item.includes(searchTerm); }`
		if (testArray.some(item => item.includes(searchTerm))) {
			$(student).show();
		}
	});

	if (filteredStudents.length === 0) {
		$('.results').show().text('No student matched your search term.');
	}
	else {
		$('.results').hide();
	}
})






