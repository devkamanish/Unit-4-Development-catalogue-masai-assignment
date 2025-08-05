 Video Link- ""

📚 What is Debouncing?

Debouncing is a technique used in programming to ensure that time-consuming tasks do not fire so often. When a function is debounced, it will only execute after a specific time has passed since the last time it was invoked.

✅ Real-World Use Cases:

Search Input Fields: Avoid sending an API request with each keystroke. Instead, wait until the user has paused typing.

Window Resize Events: When the window is being resized, debouncing avoids repeated function executions.

🔧 How it works:

Debouncing delays the execution of the function until after a pause in input/activity. If the event keeps firing (like rapid typing), the timer resets, and the function does not execute until the event finally stops for a specified duration.

🚦 What is Throttling?

Throttling is another technique used to limit the number of times a function is called over time. Unlike debouncing, throttling guarantees a function is executed at most once every X milliseconds.

✅ Real-World Use Cases:

Scroll Events: You might want to check scroll position at most once every 200ms instead of on every scroll pixel.

Button Clicks: Prevent users from spamming a button by throttling its click handler.

🔧 How it works:

Throttling allows the function to run im

🆚 Debouncing vs Throttling

Feature

Debouncing

Throttling

Execution Timing

Fires after a pause in events

Fires at regular intervals

Use Case

Search inputs, resize

Scroll, mouse move, rapid click events

Goal

Prevent unnecessary execution

Limit rate of execution

Ideal For

Executing function only when user stops action

Executing function at controlled int