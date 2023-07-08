$(function () {
	const idCards = [];
	const delay = 1 * 1000;
	let activeCardName = '';

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
			let amountGuessed = $('.card-back.guessed').length;
			if (amountGuessed === 6) {
					clearInterval(timerInterval);
					getWinModal();
			}
		}, 1000);
	}

	function getRandomNum(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

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
		copyOfCardTag.find('.front-img').attr('src', cards[index].img);
		$('.cards').append(copyOfCardTag);
	}

	function reDrawCards() {
		$('.cards').empty();
		const card = getRandomCard();
		for (let index = 0; index < card.length; index++) {
			drawCards(card[index]);
		}
	}

	function multiplyCards() {
		$('.card').clone().appendTo('.cards');
	}

	function cardRandomSwap() {
		const cardsElems = $('.card');
		if (cardsElems.length >= 6) {
			randomIndex1 = getRandomNum(0, 5);
			randomIndex2 = getRandomNum(0, 6);
			while (randomIndex1 === randomIndex2) {
				randomIndex2 = getRandomNum(0, 5);
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

	function cardFlipChecker(event) {
		const cardShirt = $(event.currentTarget).find('.card-back'),
			cardFront = $(event.currentTarget).find('.img, .card-info'),
			cardName = $(event.currentTarget).find('.name').text();
		cardShirt.addClass('active');
		cardFront.removeClass('active');
		if (activeCardName) {
			if (cardName == activeCardName) {
				const cardShirtActive = $('.face').find('.card-back.active'),
					cardFrontNonActive = $('.face').find(
						'.img:not(.active), .card-info:not(.active)'
					);
				$('.face').each(() => {
					cardShirtActive.addClass('guessed');
					cardFrontNonActive.addClass('guessed');
				});
			} else {
				const cardShirtGuessed = $('.face').find('.card-back:not(.guessed)'),
					cardFrontGuessed = $('.face').find(
						'.img:not(.guessed), .card-info:not(.guessed)'
					);
				setTimeout(() => {
					$('.face').each(() => {
						cardShirtGuessed.removeClass('active');
						cardFrontGuessed.addClass('active');
					});
				}, delay);
			}
			activeCardName = '';
		} else {
			activeCardName = cardName;
		}
	}

	function getWinModal() {
		$('.overlay').fadeIn({
			start: function () {
				$(this).css({
					display: 'flex',
				});
			},
		});
		$('.modal').slideDown('slow');
	}
	
	function initialAnim() {
		$('.field').hide();
		$('.field').slideDown('slow');
		$('.card').hide();
		$('.cards .card:eq(0)').animate({width: 'toggle'}, 300, function(){
			$(this).next().animate({width: 'toggle'}, 300, arguments.callee);
			$('.template').hide()
		});
	}

	function init() {
		reDrawCards();
		multiplyCards();
		cardRandomSwap();
		initialAnim()
		$('.face').click(cardFlipChecker);
		$('.field').one('click', getTimer)
	}
	init();
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

// Шаг 1: Подготовка ингредиентов
var mushrooms = 500; // количество грибов в граммах
var onion = 1; // количество луковицы
var garlic = 2; // количество зубчиков чеснока
var butter = 30; // количество грамм сливочного масла
var broth = 500; // количество миллилитров куриного или овощного бульона
var cream = 200; // количество миллилитров сливок для взбивания
var salt = 'по вкусу'; // количество соли
var pepper = 'по вкусу'; // количество перца и других специй

// Шаг 2: Приготовление супа
console.log('Шаг 1: Подготовка ингредиентов');
console.log('Шаг 2: Приготовление супа');
console.log('- Разогрейте сливочное масло в кастрюле');
console.log(
	'- Добавьте нарезанный лук и чеснок, обжарьте до золотистого цвета'
);
console.log('- Добавьте грибы, обжаривайте до мягкости');
console.log('- Влейте бульон, доведите до кипения');
console.log('- Уменьшите огонь и варите на среднем огне примерно 15-20 минут');
console.log(
	'- Используйте блендер или ступку для измельчения супа до гладкой консистенции'
);
console.log('- Добавьте сливки и продолжайте готовить еще 5 минут');
console.log('- Приправьте солью, перцем и другими специями по вкусу');
console.log('- Подайте горячим, украсив зеленью');

console.log('Готово! Сливочно-грибной суп готов к подаче.');
