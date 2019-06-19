const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [2048, 2048]
};

const sketch = () => {
  const palette = random.shuffle(random.pick(palettes)).slice(0, 3);
  console.log(palette);
  const createGrid = () => {
    const points = [];
    const count = 40;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        let u = count < 1 ? 0.5 : x / (count - 1);
        let v = count < 1 ? 0.5 : y / (count - 1);
        let radius = random.noise2D(u, v);
        points.push({
          color: random.pick(palette),
          position: [u, v],
          radius: Math.abs(radius * 0.3),
          rotation: random.noise2D(u, v) * 0.7
        });
      }
    }
    return points;
  };
  // random.setSeed(10);
  const points = createGrid().filter(() => {
    return random.value() > 0.5;
  });
  const margin = 400;
  console.log(points);

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    points.forEach(data => {
      const { position, radius, color, rotation } = data;
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, width - margin, v);
      // context.beginPath();
      // context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      context.save();
      context.fillStyle = color;
      context.font = `${radius * width}px "Ariel"`;
      context.translate(x, y);
      context.rotate(rotation);
      context.fillText("|", 0, 0);
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
