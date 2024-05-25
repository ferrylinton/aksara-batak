Document.prototype.ready = function (callback) {
  if (callback && typeof callback === 'function') {
    document.addEventListener("DOMContentLoaded", function () {
      if (document.readyState === "interactive" || document.readyState === "complete") {
        return callback();
      }
    });
  }
};

document.ready(function () {

  initTheme();
  window.initMenu();
  window.initAksara();

  var aksaraInput = document.getElementById('aksara-input');
  var aksaraOutput = document.getElementById('aksara-output');
  var aksaraForm = document.getElementById('aksara-form');
  var toggleThemeSlider = document.querySelector('.toggle-theme .slider');
  var toggleThemeRound = document.querySelector('.toggle-theme .round');

  setTimeout(() => {
    toggleThemeSlider.style.transition = '0.4s';
    toggleThemeRound.style.transition = '0.4s';
  }, 500)

  if (aksaraInput && aksaraOutput) {
    aksaraInput.value = `Opunta sijolo-jolo tubu martungkot salagundi \nNapinungka ni na parjolo siihuthonon ni na parpudi`;
    window.convertToAksaraBatak(aksaraInput.value, aksaraOutput);
  }


  if (aksaraForm) {
    aksaraForm.addEventListener('submit', function (event) {
      event.preventDefault();

      if (aksaraInput && aksaraOutput) {
        window.convertToAksaraBatak(aksaraInput.value, aksaraOutput);
      }

    });
  }

});

function initTheme(){
  setTheme(localStorage.getItem("theme"));
}

function handleThemeOnChange(el) {
  setTheme(localStorage.getItem("theme") === 'dark' ? '' : 'dark');
}

function setTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark');
    localStorage.setItem('theme', '');
  }
}