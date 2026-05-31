# UI Styling Elements

# Layouts

## Split Layout
a split with a primary and secondary container. Size of each cannot be changed by user at runtime(yet), but you can change that by changing the flex value in the primary split

```.split-layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  box-sizing: border-box;
}

.split-layout .primary-split {
  flex: 6;
  padding: 0 !important;
}

.split-layout .secondary-split {
  flex: 1;
}```

## Vertical Layout
A flex with direction column

```.vertical-layout {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: .5rem
}```

## Main Layout
a div that will grow to a width to fill as much space up to the max or the margin. 

```.main-layout {
  max-width: 60rem;
  margin: 0 auto;
  width: 100%;
  padding: 0 2rem;
  box-sizing: border-box;
}```

## Hierarchy
a div to implement visual hierarchy in UI.

```.hierarchy {
  background-color: var(--floating-colour);
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.10);
  border-radius: var(--border-radius);
}```

## Title Bar
NOT FEATURE COMPLETE: Needs the ability for more buttons and drop down menus in the left as well as an icon and window name section.
WIP titlebar with close button in top right.

```.title-bar {
  display: flex;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--title-bar-height);
  padding: 5px;
}

.title-bar button {
  padding: 0;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}```


# Interactions

## Button 
default styling for buttons

```button {
  border-radius: var(--border-radius);
  border: none;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  font-family: inherit;
  color: var(--text-colour);
  background-color: transparent;
  transition: background-color 0.1s;
  text-align: start;
}

button:hover {
  cursor: pointer;
  background-color: var(--accent-colour);
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.10);
  color: var(--text-hover-colour);
}```

## Button-Light
Hover settings for default button styling that makes the accent colour lighter.

```.button-light:hover {
  background-color: color-mix(in srgb, var(--accent-colour) 20%, transparent);
  color: var(--text-colour)
}```

## Input
Default styling for a text input.

```input {
  outline: none;
  background-color: var(--canvas-colour);
  border-style: none;
  color: var(--text-colour);
  padding: .5rem;
  border-radius: var(--border-radius);
  box-shadow: 0 0.5rem .5rem rgba(0, 0, 0, 0.10);
  padding-block: .7rem;
  flex: 1;
}```


## Search Input
Styling to add an icon to the left of an input

```.search-input {
  outline: none;
  background-color: var(--canvas-colour);
  border-style: none;
  color: var(--text-colour);
  padding: .5rem;
  border-radius: var(--border-radius);
  box-shadow: 0 0.5rem .5rem rgba(0, 0, 0, 0.10);
  padding-left: 3rem;
  padding-block: .7rem;
  flex: 1;
}

.search-wrapper {
  position: relative;
  display: flex;
  margin-bottom: 1rem;
}
.search-wrapper svg {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
}```

## Dropdown
WIP dropdown menu, uses data-value in html which you can access from typescript.

**HTML**
    ```<div class="dropdown">
    <button class="dropdown-button" data-value="Default"> <span data-lucide="ChevronDown">V</span><span
        class="label">Default</span></button>
    <div class="dropdown-menu">
        <button class="button-light" data-value="ABC123">ABC123</button>
        <button class="button-light" data-value="123ABC">123ABC</button>
        <button class="button-light" data-value="XYZ">XYZ</button>
    </div>
    </div>```
**Typescript**
```document.querySelectorAll(".dropdown-button")?.forEach(button => {
        button.addEventListener("click", () => {
          button.nextElementSibling?.classList.toggle("show");
        })
      })
      document.querySelectorAll(".dropdown-menu")?.forEach(menu => {
        menu.childNodes.forEach(child => {
          child.addEventListener("click", () => {
            let initiator = menu.previousElementSibling as HTMLElement
            let label = initiator.querySelector(".label");
            if (!label) return
            if (!initiator) return
            const profile = (child as HTMLElement).dataset.value ?? ""
            initiator?.setAttribute("data-value", profile);
            label.textContent = profile;
            setPowerProfile(profile);
            initiator.click()
          })
        })
      })```

**CSS**
```.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--floating-colour);
  border: none;
  min-width: 150px;
  padding: .5rem;
  border-radius: 1.5rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.10);
}

.dropdown-menu.show {
  display: flex;
  flex-direction: column;
}

.dropdown-button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-button svg {
  display: block;
}```

# Informative

## Lucide Icons
Set a fixed size for lucide icons.

```.lucide {
  width: 1.2rem;
  height: 1.2rem;
}```
