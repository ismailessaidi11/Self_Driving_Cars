class World {
    constructor(graph, roadWidth = 100, roadRoundness = 3) {
        this.graph = graph;
        this.roadWidth = roadWidth;
        this.roadRoundness = roadRoundness;
        this.envelopes = [];
        this.roadBorders = [];
        this.generate();
        
    }

    generate() {
        this.envelopes.length = 0; //reset the roads (or envelopes) to take into account any changes in the graphEditor
        for (const seg of this.graph.segments) {
            this.envelopes.push(
                new Envelope(seg, this.roadWidth, this.roadRoundness)
                );
        }

        this.roadBorders = Polygon.union(this.envelopes.map((e) => e.poly));
    }

    draw(ctx) {
        for (const env of this.envelopes) {
            env.draw(ctx);
        }
        for (const seg of this.roadBorders) {
            seg.draw(ctx, { color: "white", width: 4 });
        }
    }
}