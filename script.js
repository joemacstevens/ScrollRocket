console.clear()
gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById("rocket");
const context = canvas.getContext("2d");

canvas.width = 3840;
canvas.height = 2160;

const frameCount = 65;
const currentFrame = index => (
  `https://lost-planets.s3.amazonaws.com/earth/blastoff/blastoff${(index + 1).toString()}.jpg`
);

const images = []
const photos = {
  frame: 0
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

gsap.to(photos, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",

  scrollTrigger: {
    scrub: 1,
      fastScrollEnd: true,
  },
  onUpdate: render // use animation onUpdate instead of scrollTrigger's onUpdate
});

images[0].onload = render;

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  console.log(photos.frame)
  context.drawImage(images[photos.frame], 0, 0); 
}

