// singlepost.js
import { blogs } from './blogs.js';

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedTitle = urlParams.get('title');
    const title = decodeURIComponent(encodedTitle).replace(/_/g, ' ');

    // Assuming the 'blogs' array is declared in blog.js
    if (blogs) {
        const blogContent = blogs.find(blog => blog.title === title);

        if (blogContent) {
            const blogDescriptionElement = document.getElementById("blogDescription");
            blogDescriptionElement.innerHTML = `
                <h1>${blogContent.title}</h1>
                <div class="date">
                    <span class="material-symbols-outlined">
                        calendar_today
                    </span> 
                    <span>${blogContent.date}</span>
                </div>
                <div>
                    <img src="./assets/landscape image.jpg" alt="img">
                </div>
                <div class="content">
                    ${blogContent.content}
                </div>`;
        } else {
            console.error('Blog description not found for title:', title);
        }
    } else {
        console.error('The "blogs" array is not defined.');
    }
});
