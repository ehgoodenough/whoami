var SystemActions = require("<root>/scripts/actions/SystemActions")

var directions = [
	"north", "south", "east", "west",
	"northeast", "northwest", "southeast", "southwest"
]

var NonplayerStore = Reflux.createStore({
	data: [],
	init: function() {
		for(var i = 0; i < 25; i++) {
			this.data.push({
	            x: Math.floor(Math.random() * 20),
	            y: Math.floor(Math.random() * 15),
	            radius: 0.5,
	            velocity: 0.1,
	            color: "#1EBE39",
	            status: 1,
	            gotodist: Math.floor(Math.random() * (5 - 1)) + 1,
	            gotodir: directions[Math.floor(Math.random() * directions.length)]
			})
		}
	},
	listenables: [
		SystemActions
	],
	onTick: function(delta) {
		for(var i = 0; i < this.data.length; i++) {
			var datum = this.data[i]
			if(datum.gotodir == "north") {
				this.data[i].y -= this.data[i].velocity * delta
				this.data[i].gotodist -= this.data[i].velocity * delta
			} else if(datum.gotodir == "south") {
				this.data[i].y += this.data[i].velocity * delta
				this.data[i].gotodist -= this.data[i].velocity * delta
			} else if(datum.gotodir == "east") {
				this.data[i].x += this.data[i].velocity * delta
				this.data[i].gotodist -= this.data[i].velocity * delta
			} else if(datum.gotodir == "west") {
				this.data[i].x -= this.data[i].velocity * delta
				this.data[i].gotodist -= this.data[i].velocity * delta
			} else if(datum.gotodir == "northeast") {
				this.data[i].y -= this.data[i].velocity * delta
				this.data[i].x += this.data[i].velocity * delta
				this.data[i].gotodist -= this.data[i].velocity * delta
			} else if(datum.gotodir == "northwest") {
				this.data[i].y -= this.data[i].velocity * delta
				this.data[i].x -= this.data[i].velocity * delta
				this.data[i].gotodist -= this.data[i].velocity * delta
			} else if(datum.gotodir == "southeast") {
				this.data[i].y += this.data[i].velocity * delta
				this.data[i].x += this.data[i].velocity * delta
				this.data[i].gotodist -= this.data[i].velocity * delta
			} else if(datum.gotodir == "southwest") {
				this.data[i].y += this.data[i].velocity * delta
				this.data[i].x -= this.data[i].velocity * delta
				this.data[i].gotodist -= this.data[i].velocity * delta
			}

			if(this.data[i].gotodist <= 0
			|| this.data[i].x <= 2 || this.data[i].x >= 18
			|| this.data[i].y <= 2 || this.data[i].y >= 13) {
	            this.data[i].gotodist = Math.floor(Math.random() * (5 - 1)) + 1,
	            this.data[i].gotodir = directions[Math.floor(Math.random() * directions.length)]
			}
		}
		this.trigger(this.data)
	},
	getInitialData: function() {
		return this.data
	}
})

module.exports = NonplayerStore
