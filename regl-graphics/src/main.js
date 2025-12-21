import createREGL from "https://esm.sh/regl"
import { Camera } from "./camera.js"
import { createRenderer } from "./renderer.js"
import { createScene, createStarData } from "./scene.js"


const canvas = document.getElementById("c")

const regl = createREGL({ 
    canvas,
    attributes: {
        antialias: true,
        alpha: false, 
        preserveDrawingBuffer: false,
        powerPreference: "high-performance"
    }
})

const stories = [
  {
    description: "The story at first glance.",
    generate: () => createStarData(regl, { passive: true })
  },

  {
    description: "<b>67,180</b> subreddits.",
    generate: () => createStarData(regl, {
      passive: false,
      clusters: [
        { 
          num_stars: 67180, 
          center: { x: 0, y: 0, z: 8 }, 
          radius: 15, 
          shape: 'sphere' 
        }
      ]
    })
  },
  {
    description: "<b>858,488</b> hyperlinks.",
    generate: () => createStarData(regl, {
      passive: false,
      clusters: [
        { 
          num_stars: 858488, 
          center: { x: 0, y: 0, z: 8 }, 
          radius: 15, 
          shape: 'sphere' 
        }
      ]
    })
  },
  {
    description: `
    <span style="color:#FF3333">286,561 body</span>-hyperlinks<br>
    <span style="color:#3380FF">571,927 title</span>-hyperlinks.
    `,
    generate: () => createStarData(regl, {
      passive: false,
      clusters: [
        { num_stars: 2865, center: { x: 1.5, y: 0, z: 0 }, radius: 0.7, color: [1.0, 0.2, 0.2], shape: 'circle' },
        { num_stars: 5719, center: { x: -1.5, y: 0, z: 0 }, radius: 1.0, color: [0.2, 0.5, 1.0], shape: 'circle' }
      ]
    })
  },
  {
    description: `
    <span style="color:#FF5700">858,488 total</span> hyperlinks.
    `,
    generate: () => createStarData(regl, {
      passive: false,
      clusters: [
        { num_stars: 2865, center: { x: 0, y: 0, z: 0 }, radius: 1.5, color: [1.0, 0.2, 0.2], shape: 'circle' },
        { num_stars: 5719, center: { x: 0, y: 0, z: 0 }, radius: 1.5, color: [0.2, 0.5, 1.0], shape: 'circle' }
      ]
    })
  },
  {
    description: `One-sided <span style="color:#FF0000">Negative</span> Relationship.`,
    generate: () => createStarData(regl, {
      passive: false,
      clusters: [
        // Left Circle
        { num_stars: 4000, center: { x: -2.5, y: 0, z: 0 }, radius: 1.2, color: [1.,0.341,0.], shape: 'circle' },
        // Right Circle
        { num_stars: 4000, center: { x: 2.5, y: 0, z: 0 }, radius: 1.2, color: [1.,0.341,0.], shape: 'circle' },
        // The Bridge (Thin rectangle connecting them)
        { 
          num_stars: 1500, 
          center: { x: 0.15, y: -1, z: 0 }, 
          width: 3.5,   // Spans the gap between -2.5 and 2.5
          height: 0.1,  // Very thin
          color: [1.0, 0.0, 0.0], 
          shape: 'rectangle' 
        },
        { 
          num_stars: 1500, 
          center: { x: -0.15, y: 1, z: 0 }, 
          width:3.5,   // Spans the gap between -2.5 and 2.5
          height: 0.1,  // Very thin
          color: [1.0, 1.0, 1.0], 
          shape: 'rectangle' 
        },
        { 
          num_stars: 300, 
          center: { x: 1.75, y: 1, z: 0 }, 
          width: 0.3,   // arrow length
          height: 0.5,  // base width
          color: [1.0, 1.0, 1.0], 
          shape: 'arrow',
          direction: 1
        },
        { 
          num_stars: 300, 
          center: { x: -1.75, y: -1, z: 0 }, 
          width: 0.3,   // arrow length
          height: 0.5,  // base width
          color: [1.0, 0.0, 0.0], 
          shape: 'arrow',
          direction: -1
        },
      ]
    })
  },
  {
    description: `One-sided <span style="color:#FF0000">Negative</span> Relationship.`,
    generate: () => createStarData(regl, {
      passive: false,
      clusters: [
        // Left Circle
        { num_stars: 4000, center: { x: -2.5, y: 0, z: 0 }, radius: 1.2, color: [1.,0.341,0.], shape: 'circle' },
        // Right Circle
        { num_stars: 4000, center: { x: 2.5, y: 0, z: 0 }, radius: 1.2, color: [1.,0.341,0.], shape: 'circle' },
        // The Bridge (Thin rectangle connecting them)
        { 
          num_stars: 1500, 
          center: { x: 0.15, y: -1, z: 0 }, 
          width: 3.5,   // Spans the gap between -2.5 and 2.5
          height: 0.1,  // Very thin
          color: [1.0, 0.0, 0.0], 
          shape: 'rectangle' 
        },
        { 
          num_stars: 275, 
          center: { x: -0.15, y: 1, z: 0 }, 
          width:3.5,   // Spans the gap between -2.5 and 2.5
          height: 0.015,  // Very thin
          color: [0.,0.502,0.], 
          shape: 'rectangle' 
        },
        { 
          num_stars: 150, 
          center: { x: 1.75, y: 1, z: 0 }, 
          width: 0.15,   // arrow length
          height: 0.25,  // base width
          color: [0.,0.502,0.], 
          shape: 'arrow',
          direction: 1
        },
        { 
          num_stars: 300, 
          center: { x: -1.75, y: -1, z: 0 }, 
          width: 0.3,   // arrow length
          height: 0.5,  // base width
          color: [1.0, 0.0, 0.0], 
          shape: 'arrow',
          direction: -1
        },
      ]
    })
  },
  {
    description: `One-sided Neutral Relationship.`,
    generate: () => createStarData(regl, {
      passive: false,
      clusters: [
        // Left Circle
        { num_stars: 4000, center: { x: -2.5, y: 0, z: 0 }, radius: 1.2, color: [1.,0.341,0.], shape: 'circle' },
        // Right Circle
        { num_stars: 4000, center: { x: 2.5, y: 0, z: 0 }, radius: 1.2, color: [1.,0.341,0.], shape: 'circle' },
        // The Bridge (Thin rectangle connecting them)
        { 
          num_stars: 1500, 
          center: { x: 0.15, y: -1, z: 0 }, 
          width: 3.5,   // Spans the gap between -2.5 and 2.5
          height: 0.1,  // Very thin
          color: [1.0, 1.0, 1.0], 
          shape: 'rectangle' 
        },
        { 
          num_stars: 275, 
          center: { x: -0.15, y: 1, z: 0 }, 
          width:3.5,   // Spans the gap between -2.5 and 2.5
          height: 0.015,  // Very thin
          color: [0.,0.502,0.], 
          shape: 'rectangle' 
        },
        { 
          num_stars: 150, 
          center: { x: 1.75, y: 1, z: 0 }, 
          width: 0.15,   // arrow length
          height: 0.25,  // base width
          color: [0.,0.502,0.], 
          shape: 'arrow',
          direction: 1
        },
        { 
          num_stars: 300, 
          center: { x: -1.75, y: -1, z: 0 }, 
          width: 0.3,   // arrow length
          height: 0.5,  // base width
          color: [1.0, 1.0, 1.0], 
          shape: 'arrow',
          direction: -1
        },
      ]
    })
  },
  {
    description: `One-sided Neutral Relationship.`,
    generate: () => createStarData(regl, {
      passive: false,
      clusters: [
        // Left Circle
        { num_stars: 4000, center: { x: -2.5, y: 0, z: 0 }, radius: 1.2, color: [1.,0.341,0.], shape: 'circle' },
        // Right Circle
        { num_stars: 4000, center: { x: 2.5, y: 0, z: 0 }, radius: 1.2, color: [1.,0.341,0.], shape: 'circle' },
        // The Bridge (Thin rectangle connecting them)
        { 
          num_stars: 1500, 
          center: { x: 0.15, y: -1, z: 0 }, 
          width: 3.5,   // Spans the gap between -2.5 and 2.5
          height: 0.1,  // Very thin
          color: [1.0, 1.0, 1.0], 
          shape: 'rectangle' 
        },
        { 
          num_stars: 275, 
          center: { x: -0.15, y: 1, z: 0 }, 
          width:3.5,   // Spans the gap between -2.5 and 2.5
          height: 0.015,  // Very thin
          color: [1.0 ,0.,0.], 
          shape: 'rectangle' 
        },
        { 
          num_stars: 150, 
          center: { x: 1.75, y: 1, z: 0 }, 
          width: 0.15,   // arrow length
          height: 0.25,  // base width
          color: [1.0, 0., 0.], 
          shape: 'arrow',
          direction: 1
        },
        { 
          num_stars: 300, 
          center: { x: -1.75, y: -1, z: 0 }, 
          width: 0.3,   // arrow length
          height: 0.5,  // base width
          color: [1.0, 1.0, 1.0], 
          shape: 'arrow',
          direction: -1
        },
      ]
    })
  },
  {
    description: `One-sided <span style="color:#008000">Positive</span> Relationship.`,
    generate: () => createStarData(regl, {
      passive: false,
      clusters: [
        // Left Circle
        { num_stars: 4000, center: { x: -2.5, y: 0, z: 0 }, radius: 1.2, color: [1.,0.341,0.], shape: 'circle' },
        // Right Circle
        { num_stars: 4000, center: { x: 2.5, y: 0, z: 0 }, radius: 1.2, color: [1.,0.341,0.], shape: 'circle' },
        // The Bridge (Thin rectangle connecting them)
        { 
          num_stars: 1500, 
          center: { x: 0.15, y: -1, z: 0 }, 
          width: 3.5,   // Spans the gap between -2.5 and 2.5
          height: 0.1,  // Very thin
          color: [0.,0.502,0.], 
          shape: 'rectangle' 
        },
        { 
          num_stars: 1500, 
          center: { x: -0.15, y: 1, z: 0 }, 
          width:3.5,   // Spans the gap between -2.5 and 2.5
          height: 0.1,  // Very thin
          color: [1.0, 1.0, 1.0], 
          shape: 'rectangle' 
        },
        { 
          num_stars: 300, 
          center: { x: 1.75, y: 1, z: 0 }, 
          width: 0.3,   // arrow length
          height: 0.5,  // base width
          color: [1.0, 1.0, 1.0], 
          shape: 'arrow',
          direction: 1
        },
        { 
          num_stars: 300, 
          center: { x: -1.75, y: -1, z: 0 }, 
          width: 0.3,   // arrow length
          height: 0.5,  // base width
          color: [0.,0.502,0.], 
          shape: 'arrow',
          direction: -1
        },
      ]
    })
  },
  {
    description: `One-sided <span style="color:#008000">Positive</span> Relationship.`,
    generate: () => createStarData(regl, {
      passive: false,
      clusters: [
        // Left Circle
        { num_stars: 4000, center: { x: -2.5, y: 0, z: 0 }, radius: 1.2, color: [1.,0.341,0.], shape: 'circle' },
        // Right Circle
        { num_stars: 4000, center: { x: 2.5, y: 0, z: 0 }, radius: 1.2, color: [1.,0.341,0.], shape: 'circle' },
        // The Bridge (Thin rectangle connecting them)
        { 
          num_stars: 1500, 
          center: { x: 0.15, y: -1, z: 0 }, 
          width: 3.5,   // Spans the gap between -2.5 and 2.5
          height: 0.1,  // Very thin
          color: [0.,0.502,0.], 
          shape: 'rectangle' 
        },
        { 
          num_stars: 275, 
          center: { x: -0.15, y: 1, z: 0 }, 
          width:3.5,   // Spans the gap between -2.5 and 2.5
          height: 0.015,  // Very thin
          color: [1.0, 0., 0.], 
          shape: 'rectangle' 
        },
        { 
          num_stars: 150, 
          center: { x: 1.75, y: 1, z: 0 }, 
          width: 0.15,   // arrow length
          height: 0.25,  // base width
          color: [1.0, 0., 0.], 
          shape: 'arrow',
          direction: 1
        },
        { 
          num_stars: 300, 
          center: { x: -1.75, y: -1, z: 0 }, 
          width: 0.3,   // arrow length
          height: 0.5,  // base width
          color: [0.,0.502,0.], 
          shape: 'arrow',
          direction: -1
        },
      ]
    })
  },
  {
    description: `Mutually <span style="color:#FF0000">Hostile</span> Relationship.`,
    generate: () => createStarData(regl, {
      passive: false,
      clusters: [
        // Left Circle
        { num_stars: 4000, center: { x: -2.5, y: 0, z: 0 }, radius: 1.2, color: [1.,0.341,0.], shape: 'circle' },
        // Right Circle
        { num_stars: 4000, center: { x: 2.5, y: 0, z: 0 }, radius: 1.2, color: [1.,0.341,0.], shape: 'circle' },
        // The Bridge (Thin rectangle connecting them)
        { 
          num_stars: 1500, 
          center: { x: 0, y: 0, z: 0 }, 
          width: 2.8,   // Spans the gap between -2.5 and 2.5
          height: 0.1,  // Very thin
          color: [1.0, 0.0, 0.0], 
          shape: 'rectangle' 
        },
      ]
    })
  },
  {
    description: `Mutually <span style="color:#008000">Positive</span> Relationship.`,
    generate: () => createStarData(regl, {
      passive: false,
      clusters: [
        // Left Circle
        { num_stars: 4000, center: { x: -2.5, y: 0, z: 0 }, radius: 1.2, color: [1.,0.341,0.], shape: 'circle' },
        // Right Circle
        { num_stars: 4000, center: { x: 2.5, y: 0, z: 0 }, radius: 1.2, color: [1.,0.341,0.], shape: 'circle' },
        // The Bridge (Thin rectangle connecting them)
        { 
          num_stars: 1500, 
          center: { x: 0, y: 0, z: 0 }, 
          width: 2.8,   // Spans the gap between -2.5 and 2.5
          height: 0.1,  // Very thin
          color: [0.,0.502,0.], 
          shape: 'rectangle' 
        },
      ]
    })
  },
  {
    description: `Mutually Neutral Relationship.`,
    generate: () => createStarData(regl, {
      passive: false,
      clusters: [
        // Left Circle
        { num_stars: 4000, center: { x: -2.5, y: 0, z: 0 }, radius: 1.2, color: [1.,0.341,0.], shape: 'circle' },
        // Right Circle
        { num_stars: 4000, center: { x: 2.5, y: 0, z: 0 }, radius: 1.2, color: [1.,0.341,0.], shape: 'circle' },
        // The Bridge (Thin rectangle connecting them)
        { 
          num_stars: 1500, 
          center: { x: 0, y: 0, z: 0 }, 
          width: 2.8,   // Spans the gap between -2.5 and 2.5
          height: 0.1,  // Very thin
          color: [1.0 ,1.0, 1.0], 
          shape: 'rectangle' 
        },
      ]
    })
  },
  {
    description: `<span style="color:#008000">Opposite</span> <span style="color:#FF0000">Polarity</span> Relationship.`,
    generate: () => createStarData(regl, {
      passive: false,
      clusters: [
        // Left Circle
        { num_stars: 4000, center: { x: -2.5, y: 0, z: 0 }, radius: 1.2, color: [1.,0.341,0.], shape: 'circle' },
        // Right Circle
        { num_stars: 4000, center: { x: 2.5, y: 0, z: 0 }, radius: 1.2, color: [1.,0.341,0.], shape: 'circle' },
        // The Bridge (Thin rectangle connecting them)
        { 
          num_stars: 1500, 
          center: { x: 0.15, y: -1, z: 0 }, 
          width: 3.5,   // Spans the gap between -2.5 and 2.5
          height: 0.1,  // Very thin
          color: [1.0, 0.0, 0.0], 
          shape: 'rectangle' 
        },
        { 
          num_stars: 1500, 
          center: { x: -0.15, y: 1, z: 0 }, 
          width:3.5,   // Spans the gap between -2.5 and 2.5
          height: 0.1,  // Very thin
          color: [0.,0.502,0.], 
          shape: 'rectangle' 
        },
        { 
          num_stars: 300, 
          center: { x: 1.75, y: 1, z: 0 }, 
          width: 0.3,   // arrow length
          height: 0.5,  // base width
          color: [0.,0.502,0.], 
          shape: 'arrow',
          direction: 1
        },
        { 
          num_stars: 300, 
          center: { x: -1.75, y: -1, z: 0 }, 
          width: 0.3,   // arrow length
          height: 0.5,  // base width
          color: [1.0, 0.0, 0.0], 
          shape: 'arrow',
          direction: -1
        },
      ]
    })
  },
];

// Pallete [1.0, 0.85, 0.7], [1.0, 0.4, 0.2], [0.5, 0.7, 1.0], [1.0, 1.0, 1.0], [1.0, 0.95, 0.4]

// UPDATED: Track current story index
let currentStoryIndex = 0;

// UPDATED: Utility to load a story
function loadStory(index) {
  if (starData) {
    starData.buffer.destroy();
    starData.colorBuffer.destroy();
  }

  camera.reset();

  starData = stories[index].generate();
  render = createRenderer(regl, starData);
  document.getElementById("viz-info").innerHTML = stories[index].description; // update overlay
}

// INITIAL load
let starData = stories[currentStoryIndex].generate();
let render = createRenderer(regl, starData);
document.getElementById("viz-info").innerHTML = stories[currentStoryIndex].description; // UPDATED

// UPDATED: Next Story button
document.getElementById("next-story").addEventListener("click", () => {
  currentStoryIndex = (currentStoryIndex + 1) % stories.length;
  loadStory(currentStoryIndex);
});


function resize() {
    const dpr = window.devicePixelRatio || 1
    
    const width = window.innerWidth
    const height = window.innerHeight
    
    canvas.width = width * dpr
    canvas.height = height * dpr
  
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
}

window.addEventListener("resize", resize)
resize()

const camera = new Camera(canvas)


const scene = createScene()



let prevTime = 0

regl.frame(({ time }) => {

  const dt = Math.min(time - prevTime, 0.05)
  prevTime = time
  const safeTime = time % (Math.PI * 100)

  camera.update(dt)

  regl.clear({ 
    color: [0.02, 0.02, 0.02, 1], 
    depth: 1 
  })

  render(scene, camera, safeTime)
})

