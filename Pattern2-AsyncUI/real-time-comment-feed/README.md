Question takes from https://devtools.tech/

#Problem Statement
  
  Build a webpage using ReactJS that simulates a real-time comment feed.

  On initial render, the app should immediately fetch comments from a simulated API and display them in batches of 5. Every 10 seconds, a new batch of 5 comments should be fetched and appended to the existing list.

  Each newly rendered comment should be highlighted when it appears and automatically de-highlighted after 10 seconds.

Requirements
  Rendering Behavior
  
  #On page load:

    1.Call the API immediately.
    2. Render the first 5 comments.
    3. Highlight them.
    4. Every 10 seconds:

      Fetch the next 5 comments.
      Append them below existing comments.
      Highlight only the newly added comments.
      Each comment should:

Be highlighted on render.
Automatically remove highlight after 10 seconds.

Simulate an API (pagination using skip/offset is expected) or use the given API: https://dummyjson.com/comments

Render comments in a list format.

Maintain previously rendered comments (no replacement).

Ensure:

Highlight/de-highlight works correctly for overlapping batches.
Each batch manages its own lifecycle independently.
Prevent memory leaks:

Properly manage intervals/timeouts.
Stop polling when no more data is available.
Mockups and Demo
Initial Load
Initial Load

Next Batch Load
Next Batch Load

