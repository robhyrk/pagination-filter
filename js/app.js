//Calculates total students, then divides by 10 to determine pages required
const students = document.querySelectorAll('.student-item');
const pages = Math.ceil(students.length/10);
const pagination = document.querySelector('ul')
//Shows only first 10 students
$(students).slice(10).hide();

//Hides all students
//Shows first 10 student for each page
let showpage = (pageNumber, studentList) => {
	let studentsToShow = pageNumber * 10
	$(studentList).hide();

	for (let i=studentsToShow-10; i<studentsToShow; i++) {
		$(studentList[i]).show();
		console.log(i);
	}
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
h2.insertAdjacentHTML('afterend', "<div class='student-search'><input placeholder='Search for students...'><button>Search</button></div>");

//Captures input field
const inputField = document.querySelector('input');
const myButton = document.getElementsByTagName('button')[0];

//The following arrays are used to search through names and emails when search button is clicked
let studentNames = [];
let studentEmails = [];

//When search button is clicked the following code runs
myButton.addEventListener('click', () => {
		$(students).hide();
		$(".pagination").hide();
		let searchTerm = inputField.value;
		let searchList = document.querySelector('.student-list');
		//All student names and emails are put into separate arrays
		for (let i=0;i<students.length;i++) {	
			studentNames.push(students[i].querySelector('h3').innerHTML);
			studentEmails.push(students[i].querySelector('.email').innerHTML);
			console.log(studentNames);			
			}
		//Searches array for results for names and emails
		let nameResults = studentNames.indexOf(searchTerm);
		let emailResults = studentEmails.indexOf(searchTerm);;
		// If search finds no results display message, otherwise display results//
		if (nameResults !== -1 || emailResults !== -1 ) {
			$(".results").hide();
			$(students[nameResults]).show();
			$(students[emailResults]).show();
		} else {
			const div = document.querySelector('.page-header');
			div.insertAdjacentHTML('afterend', "<p class='results'>No such result. Please try again.</p>");
		}
		})
	





