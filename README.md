Example of using the amazing browser API requestIdleCallback.

you can play with the timeout values on the app.tsx files and check the console how are the callbacks re ordered

its a great api for side effects like some unimporant logger on your app or something like analitycs where you need to track user clicks, its great

event react uses it under the hood to schedule rerenders

the bad thing is that it cant be polyfilled
