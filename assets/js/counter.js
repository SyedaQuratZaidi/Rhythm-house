// Function to animate numbers
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue.toLocaleString() + "+";
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Initialize counters when page loads
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    // Function to handle scroll event
    function handleScroll() {
        if (!hasAnimated) {
            statNumbers.forEach(stat => {
                if (isInViewport(stat)) {
                    const value = parseInt(stat.textContent.replace('+', ''));
                    stat.textContent = '0+';
                    animateValue(stat, 0, value, 2000);
                    hasAnimated = true;
                }
            });
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Check on initial load
    handleScroll();
}); 