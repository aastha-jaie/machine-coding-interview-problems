## 📌 Pattern: API Fetching & Async Data

### 🧠 What is this pattern?

This pattern covers everything around fetching data from an external source
and managing its lifecycle in React — loading, success, error, and cleanup.

It's one of the most tested patterns in machine coding rounds because
it sits at the intersection of React mechanics (state, effects, refs)
and real-world correctness (race conditions, memory leaks, edge cases).

### 🎯 What is the interviewer testing?

Interviewers are NOT just checking if you can call `fetch()`.
They want to see:

| Area | What They Look For |
|---|---|
| **Correctness** | Do you handle loading and error states? |
| **Cleanup** | Do you cancel intervals, abort requests on unmount? |
| **Race conditions** | Does a slow response overwrite a newer one? |
| **UX Awareness** | Do you debounce? Show skeletons? Disable buttons? |
| **State vs Ref** | Do you know when NOT to use state? |
| **Abstraction** | Can you extract a reusable hook? |

---

### 🚩 Common Mistakes Interviewers Watch For

- ❌ No loading / error state
- ❌ `useEffect` with missing or wrong dependencies  
- ❌ Interval or subscription never cleaned up (memory leak)
- ❌ No debounce on search inputs
- ❌ Stale closure inside `setInterval`
- ❌ Race condition — last request wins instead of latest request wins
- ❌ Using `useState` for values that don't affect the UI (should be `useRef`)

---

### 🔑 Core Mental Models

**1. Every effect with a subscription needs a cleanup**
```tsx
useEffect(() => {
  const id = setInterval(fn, 3000);
  return () => clearInterval(id); // always
}, []);
```

**2. Abort stale requests with AbortController**
```tsx
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal });
  return () => controller.abort();
}, [query]);
```

**3. Debounce user input before hitting the API**
```tsx
useEffect(() => {
  const id = setTimeout(() => fetchResults(query), 400);
  return () => clearTimeout(id);
}, [query]);
```

**4. Use ref for values that drive logic, not UI**
```tsx
const offsetRef = useRef(0); // pagination offset — never rendered
const hasFetched = useRef(false); // guard flag — never rendered
```

---

Problems in this section 
1. Autocomplete
2. Real-time-comment-feed : A type of polling mechanism



### ✅ Checklist Before Submitting in an Interview

- [ ] Loading state shown while fetching  
- [ ] Error state handled gracefully  
- [ ] Effect cleanup returns a function  
- [ ] No memory leaks (intervals, listeners aborted)  
- [ ] Search/input is debounced  
- [ ] Race conditions handled (AbortController or ignore-flag)  
- [ ] `useRef` used for non-UI values  
- [ ] No unnecessary re-renders