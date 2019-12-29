import { StatsResult } from "./statistics";

export abstract class Builder {
	public abstract queryItems(): void
	public abstract calcStats(): void
	public abstract calcGraphData(): void
	public abstract getResult(): StatsResult
}

export class StatsGuide {

	private builder: Builder

	constructor(builder: Builder) {
		this.builder = builder;
	}

	public construct(): void {
		console.log("guide")
		this.builder.queryItems()
		this.builder.calcStats()
		this.builder.calcGraphData()
	}
}
