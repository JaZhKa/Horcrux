$(function () {
	const idCards = [],
		delay = 1 * 1000;
	let activeCardName = '',
		clicks = 0,
		timer = 0;

	function getTimer() {
		let mins = $('.mins'),
			secs = $('.secs'),
			timerInterval;
		clearInterval(timerInterval);
		timerInterval = setInterval(() => {
			timer += 1;
			secsVal = Math.floor(timer) - Math.floor(timer / 60) * 60;
			minsVal = Math.floor(timer / 60);
			secs.text(secsVal < 10 ? '0' + secsVal.toString() : secsVal);
			mins.text(minsVal < 10 ? '0' + minsVal.toString() : minsVal);
			let amountGuessed = $('.face.guessed').length;
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
		let thisCard = $(this).closest('.face');
		const cardShirt = $(event.currentTarget).find('.card-back'),
			cardFront = $(event.currentTarget).find('.img, .card-info'),
			cardName = $(event.currentTarget).find('.name').text();

		cardFlipAnimate(thisCard, cardShirt, cardFront);

		if (activeCardName) {
			if (cardName == activeCardName) {
				setTimeout(() => {
					$('.face.active').addClass('guessed');
				}, delay);
			} else {
				setTimeout(() => {
					$('.face.active:not(.guessed)').each(function () {
						const faceActive = $(this),
							wrongCardShirt = faceActive.find('.card-back.active'),
							worngCardFront = faceActive.find(
								'.img:not(.active), .card-info:not(.active)'
							);
						cardFlipAnimate(faceActive, wrongCardShirt, worngCardFront);
					});
				}, delay);
			}
			activeCardName = '';
		} else {
			activeCardName = cardName;
		}
	}

	function cardFlipAnimate(thisCard, cardShirt, cardFront) {
		thisCard.animate(
			{
				animationDeg: 90,
			},
			{
				step: function (currentValue) {
					thisCard.css('transform', `rotateY(${currentValue}deg)`);
				},
				complete: function () {
					thisCard.toggleClass('active');
					cardShirt.toggleClass('active');
					cardFront.toggleClass('active');
					thisCard.animate(
						{ animationDeg: 0 },
						{
							step: function (currentValue) {
								thisCard.css('transform', `rotateY(${currentValue}deg)`);
							},
							duration: 300,
						}
					);
				},
				duration: 300,
			}
		);
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
		getScores();
	}

	function initialAnim() {
		$('.field').hide();
		$('.field').slideDown('slow');
		$('.card').hide();
		$('.cards .card:eq(0)').animate({ width: 'toggle' }, 300, function () {
			$(this).next().animate({ width: 'toggle' }, 300, arguments.callee);
			$('.template').hide();
		});
	}

	$('.field').click(function () {
		++clicks;
		return clicks;
	});

	function getScores() {
		secs = $('.timer > .secs').text();
		scores = parseInt(1000 / (timer + clicks));
		$('.value-scores').text(scores);
	}

	async function playAudio() {
		await new Promise((resolve, reject) => {
			resolve((audio = new Audio('/sounds/music/HPMainTheme.mp3')));
		}).then(
			(resolve) => {
				audio.volume = 0.1
				audio.play();
			},
			(reject) => console.error('Audio Not Foud')
			);
	}

	function init() {
		reDrawCards();
		multiplyCards();
		cardRandomSwap();
		initialAnim();
		$('.face').click(cardFlipChecker);
		$('.field').one('click', getTimer);
		$('.field').one('click', playAudio);
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
// var mushrooms = 500; // количество грибов в граммах
// var onion = 1; // количество луковицы
// var garlic = 2; // количество зубчиков чеснока
// var butter = 30; // количество грамм сливочного масла
// var broth = 500; // количество миллилитров куриного или овощного бульона
// var cream = 200; // количество миллилитров сливок для взбивания
// var salt = 'по вкусу'; // количество соли
// var pepper = 'по вкусу'; // количество перца и других специй

// // Шаг 2: Приготовление супа
// console.log('Шаг 1: Подготовка ингредиентов');
// console.log('Шаг 2: Приготовление супа');
// console.log('- Разогрейте сливочное масло в кастрюле');
// console.log(
// 	'- Добавьте нарезанный лук и чеснок, обжарьте до золотистого цвета'
// );
// console.log('- Добавьте грибы, обжаривайте до мягкости');
// console.log('- Влейте бульон, доведите до кипения');
// console.log('- Уменьшите огонь и варите на среднем огне примерно 15-20 минут');
// console.log(
// 	'- Используйте блендер или ступку для измельчения супа до гладкой консистенции'
// );
// console.log('- Добавьте сливки и продолжайте готовить еще 5 минут');
// console.log('- Приправьте солью, перцем и другими специями по вкусу');
// console.log('- Подайте горячим, украсив зеленью');

// console.log('Готово! Сливочно-грибной суп готов к подаче.');
