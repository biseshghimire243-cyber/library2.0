const books = [

{

title:"Atomic Habits",

author:"James Clear",

category:"Self Help",

rating:"⭐⭐⭐⭐⭐ 4.9",

image:"https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg",

description:"Atomic Habits teaches how small daily habits can create remarkable long-term results."

},

{

title:"Rich Dad Poor Dad",

author:"Robert Kiyosaki",

category:"Finance",

rating:"⭐⭐⭐⭐⭐ 4.8",

image:"https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg",

description:"A bestselling personal finance book that changes the way people think about money."

},

{

title:"The Alchemist",

author:"Paulo Coelho",

category:"Novel",

rating:"⭐⭐⭐⭐⭐ 4.7",

image:"https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg",

description:"A timeless novel about dreams, destiny and discovering your personal legend."

},

{

title:"Python Crash Course",

author:"Eric Matthes",

category:"Programming",

rating:"⭐⭐⭐⭐⭐ 4.9",

image:"https://m.media-amazon.com/images/I/81eB+7+CkUL.jpg",

description:"One of the best beginner books for learning Python programming."

},

{

title:"Think and Grow Rich",

author:"Napoleon Hill",

category:"Motivation",

rating:"⭐⭐⭐⭐⭐ 4.8",

image:"https://m.media-amazon.com/images/I/71UypkUjStL.jpg",

description:"A classic self-improvement book based on successful people's habits."

},

{

title:"Clean Code",

author:"Robert C. Martin",

category:"Programming",

rating:"⭐⭐⭐⭐⭐ 4.9",

image:"https://m.media-amazon.com/images/I/81-QB7nDh4L.jpg",

description:"Learn professional programming practices for writing clean, maintainable code."

},

{

title:"Deep Work",

author:"Cal Newport",

category:"Productivity",

rating:"⭐⭐⭐⭐⭐ 4.8",

image:"https://m.media-amazon.com/images/I/81WcnNQ-TBL.jpg",

description:"Improve focus and productivity by mastering deep work techniques."

},

{

title:"The Psychology of Money",

author:"Morgan Housel",

category:"Finance",

rating:"⭐⭐⭐⭐⭐ 4.9",

image:"https://m.media-amazon.com/images/I/71g2ednj0JL.jpg",

description:"Explains why people behave differently with money and wealth."
}

];

const buttons=document.querySelectorAll(".details-btn");

const modal=document.getElementById("bookModal");

const close=document.querySelector(".close");

buttons.forEach((btn,index)=>{

btn.addEventListener("click",()=>{

document.getElementById("modalImage").src=books[index].image;

document.getElementById("modalTitle").innerHTML=books[index].title;

document.getElementById("modalAuthor").innerHTML=books[index].author;

document.getElementById("modalCategory").innerHTML=books[index].category;

document.getElementById("modalRating").innerHTML=books[index].rating;

document.getElementById("modalDescription").innerHTML=books[index].description;

modal.style.display="flex";

});

});

close.onclick=()=>{

modal.style.display="none";

}

window.onclick=(e)=>{

if(e.target==modal){

modal.style.display="none";

}

}