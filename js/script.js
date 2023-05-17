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

  function getRandomCard() {

  }

});
