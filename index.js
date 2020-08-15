const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const blockSize = 30;
const borderSize = 10;
const widthInBlocks = (width - borderSize * 2) / blockSize;
const heightInBlocks = (height - borderSize * 2) / blockSize;
const directions = {
	37: "left",
	38: "up",
	39: "right",
	40: "down"
};

const drawBorder = function(){
	ctx.fillStyle = "Grey";
	ctx.fillRect(0, 0, borderSize, height);
	ctx.fillRect(0, 0, width, borderSize);
	ctx.fillRect(width - borderSize, 0, borderSize, height);
	ctx.fillRect(0, height - borderSize, width, borderSize);
}

const gameOver = function(){
	//clearInterval(intervalId)
	ctx.fillStyle = "Black";
	ctx.font = "40px Courier";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	ctx.fillText("Конец игры", width / 2, height / 2);
}

class Block{
	constructor(x, y){
		this.col = x;
		this.row = y;
	}
	
	drawSquare(){
		let x = this.col * blockSize + borderSize;
		let y = this.row  * blockSize  + borderSize;
		ctx.fillStyle = "Grey";
		ctx.fillRect(x, y, blockSize, blockSize);
	}
}

class Car{
	constructor(){
		this.blocks = [
			new Block(3, 14),
			new Block(4, 13),
			new Block(5, 14),
			new Block(3, 12),
			new Block(5, 12),
			new Block(4, 11)			
		];
		
		this.direction = "top";
		this.nextDirection = "top";
	}
	
	draw(){
		this.blocks.forEach(block => {
			block.drawSquare()
		})
	}

	setDirection(newDirection){
		this.nextDirection = newDirection
	}

	checkCollision(newBlocks){
		let leftCollision = newBlocks.some((block) => block.col === -1);
		let topCollision = newBlocks.some((block) => block.row === -1);
		let rightCollision = newBlocks.some((block) => block.col === widthInBlocks);
		let bottomCollision = newBlocks.some((block) => block.row === heightInBlocks);

		return leftCollision || topCollision || rightCollision || bottomCollision
	}
	
	move(){
		let blocks = this.blocks;
		let newBlocks;
		this.direction = this.nextDirection;

		if(this.direction === "right"){
			newBlocks = blocks.map(block => new Block(block.col + 1, block.row));
		} else if(this.direction === "left"){
			newBlocks = blocks.map(block => new Block(block.col - 1, block.row));
		} else if(this.direction === "up"){
			newBlocks = blocks.map(block => new Block(block.col, block.row - 1));
		} else if(this.direction === "down"){
			newBlocks = blocks.map(block => new Block(block.col, block.row + 1));
		}

		if(this.checkCollision(newBlocks)){
			return
		}

		this.blocks = newBlocks
	}
}

const car = new Car();

let intervalId = setInterval(function () {
	ctx.clearRect(0, 0, width, height);
	car.draw()
	drawBorder();
}, 100);

document.addEventListener("keydown", function(e){
	let newDirection = directions[e.keyCode];
	if(!!newDirection){
		car.setDirection(newDirection);
		car.move()
	}
})

