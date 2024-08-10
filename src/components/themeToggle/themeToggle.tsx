import classes from "./themeToggle.module.css";


export default function ThemeToggle() {
  function toggleDarkMode() {
    const container = document.getElementsByTagName("body")[0];
    const buttonDarkMode = document.getElementById("toggleDarkMode") as HTMLInputElement;
    const dataTheme = container.getAttribute("data-theme");
  
    if (dataTheme === "dark") {
      container.setAttribute("data-theme", "light");
      buttonDarkMode.checked = false;
    } else {
      container.setAttribute("data-theme", "dark");
      buttonDarkMode.checked = true;
    }
  }

  return (
    <div className="flex justify-center">
      <label className={`${classes.switch}`}>
        <input type="checkbox" id="toggleDarkMode" onClick={toggleDarkMode}/>
        <span className={`${classes.round} ${classes.slider}`}></span>
      </label>
    </div>
  );
}
