'use strict'

class Task {
	constructor(task, owner, isDone = false) {
		this.task = task;
		this.owner = owner;
		this.isDone = isDone;
	}

	toggle() {
		this.isDone = !this.isDone;
	}
}