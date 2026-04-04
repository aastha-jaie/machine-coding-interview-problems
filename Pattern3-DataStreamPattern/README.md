#This tests the  ability to handle large datasets without crashing the browser.
Problems: 

1. Infinite Scroll:
        a. Intersection Observer: Do you use modern APIs to detect when a user reaches the bottom, or are you still using expensive window.onscroll listeners?
        b. Memory Management: If I scroll through 10,000 items, is your DOM holding 10,000 nodes, or are you recycling them?
        
2. Virtualized List

3. Pagination