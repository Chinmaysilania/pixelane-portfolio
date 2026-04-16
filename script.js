/* =========================================
   MODULE 6 & 7: JS Fundamentals & DOM Manipulation
   ES6+, Arrays, Control Flow, Loops, Timers
========================================= */

// FEATURE 1: Custom Cursor (DOM Events)
const cursor = document.querySelector('.cursor');

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// Scale cursor on hover (Loops & Event Listeners)
const interactables = document.querySelectorAll('a, .portfolio-item');
interactables.forEach(item => {
    item.addEventListener('mouseenter', () => {
        cursor.style.width = '50px';
        cursor.style.height = '50px';
        cursor.style.backgroundColor = 'rgba(123, 44, 191, 0.2)';
    });
    item.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.backgroundColor = 'transparent';
    });
});

// FEATURE 2: Dynamic Greeting (Control Flow)
const greetingElement = document.querySelector('#greeting');
if (greetingElement) {
    const currentHour = new Date().getHours();
    let greetingText = "Welcome";

    if (currentHour < 12) {
        greetingText = "Good Morning";
    } else if (currentHour < 18) {
        greetingText = "Good Afternoon";
    } else {
        greetingText = "Good Evening";
    }
    
    greetingElement.textContent = greetingText;
}

// FEATURE 3: Animated Stat Counters (Loops & Timers)
const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target'); // Convert string to number
            const count = +counter.innerText;
            const increment = target / 150; // Controls animation speed

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 15); // Recursive timer
            } else {
                counter.innerText = target + "+";
            }
        };
        updateCount();
    });
}

// FEATURE 4: Typewriter Effect (Arrays, DOMContentLoaded)
document.addEventListener('DOMContentLoaded', () => {
    const animatedText = document.querySelector('.animated-text');
    const blinker = document.querySelector('.blinker');

    if (animatedText && blinker) {
        const services = ["Product Packaging", "3D Animation & CGI", "Social Media Campaigns"];
        let sentenceIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentWord = services[sentenceIndex];

            // Control flow for adding/removing characters
            if (isDeleting) {
                animatedText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                animatedText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            // Determine typing speed dynamically
            let typingSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                typingSpeed = 2000; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                sentenceIndex = (sentenceIndex + 1) % services.length; // Loop back to start of array
                typingSpeed = 500; // Pause before new word
            }

            setTimeout(typeEffect, typingSpeed);
        }

        // Blinker animation
        setInterval(() => {
            blinker.style.opacity = blinker.style.opacity === '0' ? '1' : '0';
        }, 500);

        typeEffect(); // Initialize
    }
});