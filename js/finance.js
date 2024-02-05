// Importing blogs data from external source
import { blogs } from './blogs.js';

// Set up global variables
let blogsPerPage = 2;
let currentPage = 1;
const maxPagesToShow = 5;

// Event listener when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
  // Initial rendering of blogs
  renderBlogs();

  // Add an event listener to the search input field
  document.getElementById("search").addEventListener("input", filterBlogs);
});

// Function to redirect to blog description page
function redirectToDescription(title) {
  // Encode the title and navigate to the description page
  const encodedTitle = encodeURIComponent(title).replace(/%20/g, '_');
  window.location.href = `blogDescription.html?title=${encodedTitle}`;
}

// Function to render blogs based on the current page, search term, and category
function renderBlogs() {
  // Get the blog container element
  const blogContainer = document.getElementById("blogContainer");

  // Clear existing content in the blog container
  blogContainer.innerHTML = "";

  // Get the filtered blogs based on the current search term and category
  const filteredBlogs = filterBlogsBySearch(blogs);

  // Calculate the start and end index based on the current page and blogs per page
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;

  // Loop through the filtered blogs and create HTML elements for each
  filteredBlogs.slice(startIndex, endIndex).forEach(blog => {
    const blogElement = document.createElement("div");
    blogElement.className = "blog";
    blogElement.innerHTML = `
      <div class="blog-post" id="blog-post" onclick="redirectToDescription('${blog.title}')">
        <img class="blog-image" src="./assets/vid_banner5.png" alt="Sample Image">
        <div class="blog-title">
          ${blog.title}
        </div>
        <div class="blog-content">
          <p>${blog.paragraph}</p>
          <p><strong>Category:</strong> ${blog.category}</p>
        </div>
        <div class="see-more">See More</div>
      </div>
    `;

    // Add click event listener to redirect to description page
    blogElement.addEventListener('click', () => {
      redirectToDescription(blog.title);
    });

    // Append the blog element to the container
    blogContainer.appendChild(blogElement);
  });

  // Scroll to the top of the page with a smooth animation
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  // Render pagination based on the total number of filtered blogs
  renderPagination(filteredBlogs.length);
}

// Function to filter blogs based on search term and category
function filterBlogsBySearch(allBlogs) {
  // Get the search term and category from the input fields
  const searchTerm = document.getElementById("search").value.toLowerCase();
  const selectedCategory = "Finance"; // Change this to the desired category

  // Filter blogs based on title, paragraph, and category containing the search term and selected category
  return allBlogs.filter(blog =>
    (blog.title.toLowerCase().includes(searchTerm) || 
     blog.paragraph.toLowerCase().includes(searchTerm)) &&
    blog.category === selectedCategory
  );
}

// Function to handle input event on the search input field
function filterBlogs() {
  // Reset the current page to 1 when searching
  currentPage = 1;

  // Render the blogs based on the search term and category
  renderBlogs();
}

// Function to render pagination with advanced features
function renderPagination(totalBlogs) {
  const totalPages = Math.ceil(totalBlogs / blogsPerPage);
  const paginationContainer = document.getElementById("pagination");

  paginationContainer.innerHTML = "";

  // Calculate the start and end page for advanced pagination
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  // Add "First" button
  const firstButton = document.createElement("button");
  firstButton.classList.add('firstbutton');
  firstButton.textContent = "First";
  firstButton.onclick = () => {
    currentPage = 1;
    renderBlogs();
  };
  paginationContainer.appendChild(firstButton);

  // Add "Previous" button
  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderBlogs();
    }
  };
  paginationContainer.appendChild(prevButton);

  // Loop through the page range and add buttons
  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.onclick = () => {
      currentPage = i;
      renderBlogs();
    };
    if (i === currentPage) {
      button.classList.add("active");
    }
    paginationContainer.appendChild(button);
  }

  // Add an ellipsis if there are more pages
  if (endPage < totalPages) {
    const ellipsis = document.createElement("span");
    ellipsis.textContent = "...";
    ellipsis.classList.add("ellipsis");
    paginationContainer.appendChild(ellipsis);
  }

  // Add "Next" button
  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderBlogs();
    }
  };
  paginationContainer.appendChild(nextButton);

  // Add "Last" button
  const lastButton = document.createElement("button");
  lastButton.classList.add('lastbutton');
  lastButton.textContent = "Last";
  lastButton.onclick = () => {
    currentPage = totalPages;
    renderBlogs();
  };
  paginationContainer.appendChild(lastButton);
}
