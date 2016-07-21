window.onload = function() {
	console.log(`width: ${25 / window.innerWidth}`);
	console.log(`height: ${25 / window.innerHeight}`);
	let player1 = document.getElementById('player1').style;
	let player2 = document.getElementById('player2').style;
	let ball = document.getElementById('ball').style;
	player1.left = '50%';
	player2.left = '50%';
	ball.top = '95%';
	ball.left = '50%';
	player1.holdBall = true;
	player2.holdBall = false;
	function moveLeft(player) {
		clearTimeout(player.animate);
		if (parseFloat(player.left) > 5) {
			player.left = parseFloat(player.left) - 0.5 + '%';
		}
		if (player.holdBall) {
			ball.left = parseFloat(ball.left) - 0.5 + '%';
		}
		player.animate = setTimeout(function() {moveLeft(player);}, 25)
	}
	function moveRight(player) {
		clearTimeout(player.animate);
		if (parseFloat(player.left) < 95) {
			player.left = parseFloat(player.left) + 0.5 + '%';
		}
		if (player.holdBall) {
			ball.left = parseFloat(ball.left) + 0.5 + '%';
		}
		player.animate = setTimeout(function() {moveRight(player);}, 25)
	}

	function moveBall() {
		clearTimeout(ball.animate);
		console.log(ball.top);
		if (parseFloat(ball.top) / 100 * window.innerHeight  <= 25 || parseFloat(ball.top) >= 100) {
			ball.velocityY *= -1;
		}
		if (parseFloat(ball.left) / 100 * window.innerWidth <= 12.5 || parseFloat(ball.left) / 100 * window.innerWidth >= 99.5) {
			ball.velocityX *= -1;
		}
		ball.top = parseFloat(ball.top) + ball.velocityY + '%';
		ball.left = parseFloat(ball.left) + ball.velocityX + '%';
		ball.animate = setTimeout(moveBall, 25);
	}
	function launchBall() {
		ball.velocityX = 0.5;
		ball.velocityY = -0.5;
		ball.animate = setTimeout(moveBall, 25);
	}

	document.body.onkeydown = function(event) {
		switch (event.code) {
			case 'ArrowLeft':
				moveLeft(player1);
				break;
			case 'ArrowRight':
				moveRight(player1);
				break;
			case 'KeyA':
				moveLeft(player2);
				break;
			case 'KeyD':
				moveRight(player2);
				break;
			case 'Space':
				player1.holdBall = false;
				player2.holdBall = false;
				launchBall();
		}
	}
	document.body.onkeyup = function(event) {
		switch (event.code) {
			case 'ArrowLeft':
				clearTimeout(player1.animate);
				break;
			case 'ArrowRight':
				clearTimeout(player1.animate);
				break;
			case 'KeyA':
				clearTimeout(player2.animate);
				break;
			case 'KeyD':
				clearTimeout(player2.animate);
				break;
		}
	}
}