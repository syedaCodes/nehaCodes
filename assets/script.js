const container = document.querySelector("body");
const numCircles = 7; // Number of circles
const circles = [];

// Create circles with random initial positions and velocities
for (let i = 0; i < numCircles; i++) {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    container.appendChild(circle);

    let positionX = Math.random() * (window.innerWidth - 50);
    let positionY = Math.random() * (window.innerHeight - 50);
    let deltaX = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1);
    let deltaY = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1);

    circles.push({ circle, positionX, positionY, deltaX, deltaY });
}

function moveCircles() {
    circles.forEach(
        ({ circle, positionX, positionY, deltaX, deltaY }, index) => {
            // Update the position
            positionX += deltaX;
            positionY += deltaY;

            // Check for collision with the edges and bounce
            if (positionX <= 0 || positionX >= window.innerWidth - 50) {
                deltaX = -deltaX; // Reverse direction
                positionX = Math.max(
                    0,
                    Math.min(positionX, window.innerWidth - 50)
                ); // Correct position
            }
            if (positionY <= 0 || positionY >= window.innerHeight - 50) {
                deltaY = -deltaY; // Reverse direction
                positionY = Math.max(
                    0,
                    Math.min(positionY, window.innerHeight - 50)
                ); // Correct position
            }

            // Update the circle's position
            circle.style.transform = `translate(${positionX}px, ${positionY}px)`;

            // Update position and velocity for next iteration
            circles[index] = { circle, positionX, positionY, deltaX, deltaY };
        }
    );
}

// Move the circles every 16ms (~60 FPS)
setInterval(moveCircles, 16);
