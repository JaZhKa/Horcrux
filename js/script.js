$(function () {
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
		for (let i = 0; i < 3; i++) {
			idCards.push(getRandomNum(0, 5));
		}
		return getNonRepeatCards();
	}

	function getNonRepeatCards() {
		let nonRepeatCards = Array.from(new Set(idCards));
		if (nonRepeatCards.length < 3) {
			return getRandomCard();
		} else if (nonRepeatCards.length > 3) {
			nonRepeatCards.length = 3;
			return nonRepeatCards;
		} else {
			return nonRepeatCards;
		}
	}

	function drawCards(index) {
		const copyOfCardTag = $('.card.template').clone();
		copyOfCardTag.removeClass('template');
		copyOfCardTag.find('.name').text(cards[index].name);
		copyOfCardTag.find('.description').text(cards[index].description);
		copyOfCardTag.find('img').attr('src', cards[index].img);
		$('.cards').append(copyOfCardTag);
	}

	function reDrawCards() {
		$('.cards').empty();
		const card = getRandomCard();
		for (let index = 0; index < card.length; index++) {
			drawCards(card[index]);
		}
	}
	reDrawCards();

	function multiplyCards() {
		$('.card').clone().appendTo('.cards');
	}
	multiplyCards();

	function cardRandomSwap() {
		const cardsElems = $('.card');
		if (cardsElems.length >= 6) {
			randomIndex1 = getRandomNum(0, 5)
			randomIndex2 = getRandomNum(0, 6)
			while (randomIndex1 === randomIndex2) {
				randomIndex2 = getRandomNum(0, 5)
			}
			firstElement = cardsElems.eq(randomIndex1);
			secondElement = cardsElems.eq(randomIndex2);
			if (randomIndex1 < randomIndex2) {
				firstElement.before(secondElement);
			} else {
				firstElement.after(secondElement);
			}
		}
	}
	cardRandomSwap();
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
