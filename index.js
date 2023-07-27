const game = document.getElementById("gamecontainer"); 
let x = 0;
let first = -1;
let second = -1;

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

values = new Array(16);

for (let i = 0; i < 8; i++) 
  values[2 * i] = values[2 * i + 1] = i + 1;

for (let i = 1; i < 16; i++) {
  const j = getRandomInt(i + 1);
  [values[i], values[j]] = [values[j], values[i]];
}

for (let i = 0; i < 4; i++) {
	for (let a = 0; a < 4; a++) {
		game.insertAdjacentHTML("beforeend", `
			<div id="block${a + i * 4}">
				<div class="content" id="content${a + i * 4}">${values[a + i * 4]}</div>
			</div>
		`);
	}
}
let done = 0;
for (let i = 0; i < 16; i++) {
	document.getElementById(`block${i}`).addEventListener("click", async () => {
		if(i != first) {
			if(x === 2) {
				console.log(`${first}, ${second}`);
				if(values[first] != values[second]) {
					document.getElementById(`content${first}`).style.display = "none";
					document.getElementById(`content${second}`).style.display = "none";
				}
				x = 0;
				first = -1;
				second = -1;
			}
			document.getElementById(`content${i}`).style.display = "block";
			x++;
			if(first < 0)
				first = i;
			else if(second < 0)
				second = i;
			if(x === 2) {
				if(values[first] == values[second]) {
					document.getElementById(`block${first}`).style.backgroundColor = "rgb(0, 0, 0)";
					document.getElementById(`block${second}`).style.backgroundColor = "rgb(0, 0, 0)";
					done += 2;
				}
			}
		}
	});
}

async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
let e = 0;
async function ez(ms) {
	if(done === 16)
		return 0;
	await sleep(ms);
	document.getElementById("time").innerHTML = `${(Math.round(e * 100) / 100).toFixed(3)}`;
	e += 0.01;
	await ez(ms);
}
ez(1);