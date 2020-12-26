document.addEventListener('DOMContentLoaded', function() {
	showSumChoices();
})
	
let isClicked = false;

	function getSumChoices() {
			let choices = JSON.parse(localStorage.getItem('choices') || '{}');
			return (Object.values(choices)).reduce(function(sum, current) {
			  return sum + current;
			}, 0);
		};

	function showSumChoices() {
		let votes = document.querySelector('.form__show-result');
		votes.innerHTML = "проголосовало: " + getSumChoices() + " человек";
	}

	function showEachChoice() {
		const lineCount = document.querySelectorAll('.form__item');
		const choices = JSON.parse(localStorage.getItem('choices') || '{}');

		[0, 1, 2].forEach(data => {
			const percent = (choices[data]/getSumChoices())*100;

			lineCount[data].querySelector('.vote-count').textContent = choices[data] || 0;
			lineCount[data].querySelector('.count-percent').textContent = `${`${percent.toFixed() || 0}%`}`;
			
		});
	};


	function handleChoice(data) {
		if (isClicked == true) {
			return true;
		};

		let choices = JSON.parse(localStorage.getItem('choices') || '{}');
		if (!choices[data]) {
			choices[data] = 0;
		};
		choices[data] += 1;
		localStorage.setItem('choices', JSON.stringify(choices));

		showSumChoices();
		showEachChoice();
		showProgres();
		isClicked = true;
	};

	function showProgres() {
		const choices = JSON.parse(localStorage.getItem('choices') || '{}');
		const progresBar = document.querySelectorAll('.form__item');
		
		[0, 1, 2].forEach(data => {
			let percent = (choices[data]/getSumChoices())*100;
			progresBar[data].querySelector('.progres-bar').style.left = `-${100 - percent}%`;

		});
		
		
	}

	