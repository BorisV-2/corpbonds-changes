/* Здесь располагаются скрипты */

// переписать функцию initFiltersExpand
function newInitFiltersExpand() {
  $("#show_all_filters").click(function () {
    if (window.innerWidth >= 768) {
      if ($(this).hasClass("expanded")) {
        $(this).html("Показать все фильтры");
      } else {
        $(this).html("Скрыть фильтры");
      }
      $(this).toggleClass("expanded");
    } else {
      const filters = $(".screener__filters-row").addClass("filters-in-popup");
      $("#popup_filters > .filters").append(filters);
      applyPopupContent($("#popup_filters").html(), 400);
      $("#popup_filters .screener__filters-row").remove();
      $(".link-arrow").hide();
    }
    $(".screener__filters-row").toggleClass("view-all");
  });

  let observer = new MutationObserver((mutationRecords) => {
    if (mutationRecords[0].target.style.display === "none") {
      $(".screener__filters-row")
        .removeClass("view-all")
        .removeClass("filters-in-popup");
      $(".link-arrow").show();
      newInitFiltersExpand(); // <- initFiltersExpand
      $(".screener__filters").prepend($(".screener__filters-row"));
      observer = null;
    }
  });

  // при закрытии попапа
  const popupOverlay = document.querySelector("#popup_overlay");
  observer.observe(popupOverlay, {
    attributeFilter: ["style"],
  });
}

// переписать функцию initScreenerSettings
function newInitScreenerSettings() {
	if (window.innerWidth <= 768){
		// заменить на html-вёрстку
		const popupElement = document.createElement("div");
		const popupContentElement = document.createElement("div");
		const closeButton = document.createElement("div");
		popupElement.classList.add("screener__mobile-popup");
		popupContentElement.classList.add("screener__mobile-popup-content");
		closeButton.classList.add("screener__popup-close-button");
		closeButton.innerText = "X"; // вставьте какую-нибудь картинку сами
		popupElement.appendChild(closeButton);
		popupElement.appendChild(popupContentElement);
		$(".screener__btns").append($(".screener__mobile-popup"));
	}
    $('#screener_settings_button').click(function(){
        $('.screener__toggle-columns').toggleClass('active');
		if (window.innerWidth <= 768){
			$('.screener__mobile-popup').toggleClass('active');
		}
    });
    $(document).on('click', function (e) {
        if ($(e.target).closest('#screener_settings_button').length == 0 && $(e.target).closest('.screener__toggle-columns').length == 0) {
            $('.screener__toggle-columns').removeClass('active');
        }
    });
	$('.screener__popup-close-button').click(function(){
		$('.screener__mobile-popup').removeClass('active');
	})
}

// добавить после #popup_warning, скрипт убрать
document.addEventListener("DOMContentLoaded", () => {
	const popupWarningElem = document.getElementById("popup_warning");
	const popupFilters = document.createElement("div");
	popupFilters.classList.add("popup-content-prepared")
	popupFilters.id = "popup_filters"
	popupFilters.innerHTML = `<div b-w7kossr6ap="" class="popup-title">Фильтры</div>
      <p b-w7kossr6ap="" class="filters"></p>`
	document.body.insertBefore(popupFilters, popupWarningElem);
	newInitFiltersExpand();
	newInitScreenerSettings();
});