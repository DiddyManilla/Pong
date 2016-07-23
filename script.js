window.onload = function() {
	let player1 = document.getElementById('player1').style;
	let player2 = document.getElementById('player2').style;
	let ball = document.getElementById('ball').style;
	
	player1.opacity = "0";
	player2.opacity = "0";
	ball.opacity = "0";
	document.getElementById("score1").style.opacity = 0;
	document.getElementById("score2").style.opacity = 0;
	
	player1.score = 0;
	player2.score = 0;
	
	player1.left = '50%';
	player2.left = '50%';
	player1.top = '95%';
	player2.top = '5%';
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
		let ballTop = parseFloat(ball.top);
		let ballLeft = parseFloat(ball.left);
		if (ballTop/100*window.innerHeight <= 25) {
			clearTimeout(ball.animate);
			player1.score++;
			updateScores();
			player2.holdBall = true;
			ball.top = parseFloat(player2.top) + 1.5 + (25/window.innerHeight*100) + "";
			ball.left = player1.left;
			return 0;
		}
		if (
			//if ball hits player 1
			(ballTop == parseFloat(player1.top) 
				&& ballLeft <= parseFloat(player1.left) + 5
				&& ballLeft >= parseFloat(player1.left) - 5) ||
			//if ball hits player 2
			(ballTop <= parseFloat(player2.top) + 1.5 + (25/window.innerHeight*100)
				&& ballLeft <= parseFloat(player2.left) + 5
				&& ballLeft >= parseFloat(player2.left) - 5)
			) {
			ball.velocityY *= -1;
		}
		if (ballLeft / 100 * window.innerWidth <= 12.5 || ballLeft / 100 * window.innerWidth >= window.innerWidth - 37.5) {
			ball.velocityX *= -1;
		}
		ball.top = ballTop + ball.velocityY + '%';
		ball.left = ballLeft + ball.velocityX + '%';
		ball.animate = setTimeout(moveBall, 25);
	}
	
	function launchBall() {
		ball.velocityX = 0.5;
		ball.velocityY = -0.5;
		ball.top = parseFloat(ball.top) + ball.velocityY + '%';
		ball.left = parseFloat(ball.left) + ball.velocityX + '%';
		ball.animate = setTimeout(moveBall, 25);
	}
	
	function updateScores() {
		document.getElementById('score1').innerHTML = player1.score + "<br>|<br>" + player2.score;
		document.getElementById('score2').innerHTML = player1.score + "<br>|<br>" + player2.score;
	}
	document.body.onkeydown = function(event) {
		if (event.code == 'Space') {
			
			document.getElementById("info").style.animation = "fadeOut 2s forwards";
			player1.animation = "fadeIn 2s forwards";
			player2.animation = "fadeIn 2s forwards";
			ball.animation = "fadeIn 2s forwards";
			document.getElementsByClassName("score")[0].style.animation = "fadeIn 2s forwards";
			document.getElementsByClassName("score")[1].style.animation = "fadeIn 2s forwards";
			this.onkeydown = function(event) {
				
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