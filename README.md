# Notes for project

## First 3 Hours

I started reading the requirements and looking through the components, since I am new to web components. (I am most familiar with React components).

I decided to go with the grid display to easily format the chess grid, and created a `chess-space` component that would know its own column/row location and if it currently held a piece. I spent way too much time trying to get the nth style to color the background accordingly.

I also added the label rows/columns within the board itself. In hindsight, I would have had this separate from the chess spaces so the logic wouldn't be so intermingled and would have allowed for easier styling, but I had already spent too much time focusing on the current structure.

I decided to just use text within the spaces to make sure my layout/piece logic was correct and save the images/animations for later after the logic and interactions were working.

I initially added a mutation observing until I saw in the web component's documentation the ability to listen to certain attribute changes, so I then switched to that implementation to make sure the spaces update when the data for the piece updates for the space.

After this, I implemented the movement of the chess pieces just so I could verify the data updating the piece's logic and reset was working accordingly.

At this point, I had been working for 3 hours and I had a chess board with the pieces all starting in the correct spaces (only displaying their piece text as opposed to any images) and movement of the pieces along with reset.

I had to step away for a little bit, but I left the animation and images for the last hour when I was able to get back to it since I am less experienced with animations.

## Last Hour

After returning, I added the chess piece images according to the piece data and also added the animation. I found that the reset animation worked well, but the setup animation was playing when moving the pieces as well, so I needed to add an extra class to make sure we prevent the startup animation when just moving the pieces.

At this time, I also added a warning for moving the pieces if they aren't able to be moved and I noticed the move event was triggering twice after resetting the board because I was registering the events twice on render. I added a flag to prevent that, but I should have just moved the event subscribing to a separate method to call in the connectCallback, but I was getting close to the end of the hour mark (adding up to 4 hours from my previous 3 hour session) so I opted for the fast solution to be able to continue testing to make sure everything worked smoothly.

## Things I would do to improve

- Restructure to have the chess spaces and labels be separate
- Restructure to have the chess pieces sitting on top of the spaces to allow for nicer animations (also a separate class for piece)
- Moved the event registration out of the render method into its own setup method for the board events
- Had the pieces map based off constants instead of strings to prevent typos and ensure consistency
- Add this project to the git repo right away so you could see a commit history instead of having to read through this (sorry I was excited to hop right in and this part became an afterthought)
- Use svgs for the pieces instead of the unicode
- Spend more time one the animation to make it more interesting than the simple animation I have currently
