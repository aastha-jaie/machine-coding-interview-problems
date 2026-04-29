/_
Infinite scrolling is a technique used in web design and development where a page loads more content as
the user scrolls down, allowing them to explore a large amount of content without a distinct end.
Every social Media app have Infinite scroll, where user keeps scrolling and he gets to see new posts.
_/

Using Intersection Observer WebApi to implement Infinite Scroll

Intersection Observer API ->
let's code register a callback function that is executed whenever an elements enters or exits an intersection with another element(or viewport).

Creating an intersection observer

    const options = {
        root: document.querySelector("#scrollArea"), //viewport for checking visibility of target. Default: browser viewport
        rootMargin: "0px",//Margin around the root, similar to CSS margin property
        scrollMargin: "0px", //Margin around nested scroll containers
        threshold: 1.0, //Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed.
    };

    const observer = new IntersectionObserver(callback, options); //callback runs whenever threshold is crossed in one direction

callback :

const callback = (entries, observer) => {
entries.forEach((entry) => {
// Each entry describes an intersection change for one observed
// target element:
// entry.boundingClientRect
// entry.intersectionRatio
// entry.intersectionRect
// entry.isIntersecting
// entry.rootBounds
// entry.target
// entry.time
});
};
