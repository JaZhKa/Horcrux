$(function () {
	const cards = [];

	function getTimer() {
		let mins = $('#mins'),
			secs = $('#secs'),
			timer = 0,
			timerInterval;
		clearInterval(timerInterval);
		timerInterval = setInterval(() => {
			timer += 1;
			secsVal = Math.floor(timer) - Math.floor(timer / 60) * 60;
			minsVal = Math.floor(timer / 60);
			secs.text(secsVal < 10 ? '0' + secsVal.toString() : secsVal);
			mins.text(minsVal < 10 ? '0' + minsVal.toString() : minsVal);
		}, 1000);
	}

	function getRandomNum(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	const idCards = [];
	function getRandomCard() {
		for(let i = 0; i < 3; i++) {
			idCards.push(getRandomNum(0, 5));
		}
		return getNonRepeatCards();
	}
	
	function getNonRepeatCards() {
		let nonRepeatCards = Array.from(new Set(idCards));
		if(nonRepeatCards.length < 3) {
			return getRandomCard()
		 } else if(nonRepeatCards.length > 3) {
			nonRepeatCards.length = 3
			return nonRepeatCards;
		 } else {
		return nonRepeatCards;
	}
};

	console.log(getRandomCard())
	
});

// function getNonRepeatCards() {
// 	let nonRepeatCards = [];
// 	idCards.forEach((card) => {
// 		if(!nonRepeatCards.includes(card)){
// 			nonRepeatCards.push(card);
// 		}
// 	});
// 	return nonRepeatCards.length != 3 ? getRandomCard() : nonRepeatCards;
// }