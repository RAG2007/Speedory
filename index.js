const game = document.getElementById("gamecontainer");
let x = 0;
let first = -1;
let second = -1;
let started = 0;
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

for (let i = 0; i < 16; i++) {
		const div = document.createElement("div");
		div.id = `block-${i}`;
		game.appendChild(div);
		const cont = div.appendChild(document.createElement("div"));
		cont.className = `content`;
		cont.id = `content-${i}`;
		cont.innerHTML = `${values[i]}`;
}

let done = 0;
let score = 0;
for (let i = 0; i < 16; i++) {
	document.getElementById(`block-${i}`).addEventListener("click", () => {
		if(i != first || second != -1 && values[i] >= 0) {
			if(x === 2) {
				console.log(`${first}, ${second}`);
				if(values[first] != values[second]) {
					score += 0.5;
					document.getElementById(`content-${first}`).style.display = "none";
					document.getElementById(`content-${second}`).style.display = "none";
				}
				x = 0;
				first = -1;
				second = -1;
			}
			document.getElementById(`content-${i}`).style.display = "block";
			x++;
			if(first < 0)
				first = i;
			else if(second < 0)
				second = i;
			if(x === 2 && values[i] >= 0) {
				if(values[first] == values[second]) {
					document.getElementById(`block-${first}`).style.backgroundColor = "rgb(0, 0, 0)";
					document.getElementById(`block-${second}`).style.backgroundColor = "rgb(0, 0, 0)";
					done += 2;
					values[first] = -1;
					values[second] = -1;
				}
			}
		}
		started++;
	});
}

async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
let beg = Date.now();
function ez() {
	if(done === 16)
		return 0;
	if(started === 0) {
		beg = Date.now();
	}
	let timer = Date.now() - beg;
	// await sleep(ms);
	document.getElementById("time").innerHTML = `${(Math.round(timer * 100 + (score * 100000)) / 100000).toFixed(3)}`;

	setTimeout(() => {
		ez();
	}, 10)
}
ez();
