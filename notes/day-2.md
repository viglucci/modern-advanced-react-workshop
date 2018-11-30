# day 2 notes

### Portals

https://ui.reach.tech/rect <--- great for getting the position of a 'target' element

Apply aria-hidden to all siblings of a portal to be able to 'trap' focus in a div.

Appending portals which are stacked top to bottom helps avoid z-index issues as the natural stacking order takes over.

### Accessibility

tabIndex="-1" allows non interactable elements to gain focus programatically

3 Pillars:

* Keyboard events
* Manage focus
* Use aria attributes

aria-haspopup to indicate that a button will cause a popup, such as the showing of select menu options.

### Concurrent React

gsbu - get snapshot before update
