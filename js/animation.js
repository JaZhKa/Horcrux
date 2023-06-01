$(document).ready(function () {
	const timeDuration = 10 * 1000;
	const bordeRadius = 100;
	$('.size').click(function () {
		$('.red').animate(
			{
				opacity: '0',
			},
			timeDuration
		);

		$('.green').animate(
			{
				opacity: '100%',
			},
			timeDuration
		);
		$('.size').animate(
			{ smile: 360 },
			{
				step: function (now) {
					$('.size').css('transform', 'rotate(' + now + 'deg)');
					const someFunNumber = now % bordeRadius;
                    const toCircle = now / Math.PI;
					console.log(someFunNumber);
					if (someFunNumber < bordeRadius / 2) {
						$('.size .red').css('border-radius', `${toCircle}px`);
						$('.size .green').css('border-radius', `${toCircle}px`);
					} else {
						$('.size .red').css('border-radius', `${toCircle}px`);
						$('.size .green').css('border-radius', `${toCircle}px`);
					}
				},
				duration: timeDuration,
			}
		);
	});
});
