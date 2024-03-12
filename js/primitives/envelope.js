class Envelope {
    constructor(skeleton, width = 100, roundness = 1) {
        this.skeleton = skeleton;
        this.poly = this.#generatePolygon(width, roundness);
        
    }

    #generatePolygon(width, roundness) {
        
        const { p1, p2 } = this.skeleton;

        const radius = width / 2;
        const alpha = angle(subtract(p1, p2));
        const alpha_cw = alpha + Math.PI / 2;
        const alpha_ccw = alpha - Math.PI / 2;
        const step = Math.PI / Math.max(1, roundness);
        const eps = step / 2; // to include the angle alpha_cw in the loop 
        const points = [];
        
        for (let j = alpha_ccw; j <= alpha_cw + eps; j += step) {
            points.push(translate(p1, j, radius));
        }
        for (let j = alpha_ccw; j <= alpha_cw + eps; j += step) {
            points.push(translate(p2, Math.PI + j, radius));
        }

        return new Polygon(points);
    }

    draw(ctx, options) {
        this.poly.draw(ctx, options);     
    }

}