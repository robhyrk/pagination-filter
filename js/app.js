//Calculates total students, then divides by 10 to determine pages required
const students = document.querySelectorAll('.student-item');
const pages = Math.ceil(students.length/10);
const pagination = document.querySelector('.pagination ul')
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
	for (let i=2;i<pages+1;i++) {
		let li = document.createElement('li');
		li.innerHTML = '<a href="#">' + i + '</a>';
		pagination.appendChild(li);

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

	



