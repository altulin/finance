const startWidth = $(window).width();

const check = (element) => {
  if (element.length > 0) {
    return true;
  }

  return false;
};

const resize = () => {
  let resizeTimeout;
  // const startWidth = $(window).width();

  const actualResizeHandler = () => {
    document.location.reload();
  };

  const resizeThrottler = () => {
    const endWidth = $(window).width();
    const deltaWidth = startWidth - endWidth;

    if (!resizeTimeout && Math.abs(deltaWidth) > 100) {
      resizeTimeout = setTimeout(() => {
        resizeTimeout = null;
        actualResizeHandler();
      }, 1000);
    }
  };

  const addEventResize = () => {
    return window.addEventListener("resize", resizeThrottler, false);
  };

  addEventResize();
};

const createSlider = () => {
  const slider = $(".how__list");

  if (check(slider) && startWidth < 1000) {
    slider.slick({
      slidesToShow: 1,
      speed: 300,
      infinite: true,
      fade: true,
      cssEase: "linear",
    });
  }
};

const createSliderNews = () => {
  const slider = $(".news-list");

  if (check(slider) && startWidth < 768) {
    slider.slick({
      slidesToShow: 1,
      speed: 600,
      rows: 0,
    });
  }
};

const makeRange = (num) => {
  const inputRange = $(`#package-${num}`);

  const getProfit = (proc, sum, modif) => {
    const profit = (sum / 100) * proc * 12;
    $(`.range-box__marga--${modif}`).text(profit.toLocaleString());
    if (modif === 365) {
      $(".range-box__proc--365 span").text(proc);
    }
  };

  const getСalculate = (data) => {
    const sumPretty = data.from_pretty;
    const sumFrom = data.from;
    const { input } = data;
    $(`.range-box__val--${num}`).text(sumPretty);

    if ($(input).is("#package-150")) {
      getProfit(15, sumFrom, 150);
    }

    if ($(input).is("#package-365")) {
      if (sumFrom > 1000 && sumFrom < 2999) {
        getProfit(8, sumFrom, 365);
      }
      if (sumFrom > 3000 && sumFrom < 9999) {
        getProfit(10, sumFrom, 365);
      }
      if (sumFrom > 10000 && sumFrom < 19999) {
        getProfit(12, sumFrom, 365);
      }
      if (sumFrom > 20000) {
        getProfit(15, sumFrom, 365);
      }
    }
  };

  if (check(inputRange)) {
    inputRange.ionRangeSlider({
      min: 1000,
      max: 100000,
      from: 72000,
      step: 500,
      onChange(data) {
        getСalculate(data);
      },
    });
  }
};

const playVideo = () => {
  const btn = $(".video__btn");
  const video = $(".video__body");
  if (check(btn) && check(video)) {
    btn.on("click", (e) => {
      video.trigger("play");
      btn.addClass("video__btn--hidden");
      e.stopPropagation();
    });

    video.on("click", (e) => {
      video.trigger("pause");
      btn.removeClass("video__btn--hidden");
    });
  }
};

const createAccordion = () => {
  $(".accordion").accordion({
    transitionSpeed: 600,
    singleOpen: true,
  });
};

const successHandler = (e) => {
  e.target.reset();

  // if (e.target.id === `pay-form`) {
  //   $(`#modal-success`).modal();
  // }

  if (e.target.id === `exit-form`) {
    window.open("/office-index.html");
  }

  if (e.target.id === `pass-form`) {
    window.open("/form-success.html");
  }

  if (e.target.id === `registration-form`) {
    //
  }
};

// // отправка форм
const sendForm = (e) => {
  const form = e.target;
  const data = $(form).serialize();
  $.ajax({
    url: "https://httpbin.org/anything",
    method: "post",
    dataType: "json",
    data,
    success() {
      successHandler(e);
    },
  });
};

const makeFormEvent = () => {
  const form = $(".form");
  if (check(form)) {
    form.on(`submit`, (e) => {
      e.preventDefault();
      sendForm(e);
    });
  }
};

const createModalReg = () => {
  const link = $(".programs__link, .add__link");
  if (check(link)) {
    link.on("click", (e) => {
      e.preventDefault();
      $("#modal-registration").modal();
      $(".modal__link-close").on("click", (e) => {
        e.preventDefault();
        $.modal.close();
      });
    });
  }
};

const createModalStructure = () => {
  const link = $(".structure__link");
  if (check(link)) {
    link.on("click", (e) => {
      e.preventDefault();
      $("#modal-structure").modal();
      $(".modal__link-close").on("click", (e) => {
        e.preventDefault();
        $.modal.close();
      });
    });
  }
};

const creatTabs = () => {
  const tabsBlock = $("[data-tabs]");

  if (check(tabsBlock)) {
    const tabs = new Tabby("[data-tabs]");
  }
};

const stickyHeader = () => {
  const header = $("#header");
  if (check(header)) {
    header.sticky({
      topSpacing: 0,
      className: "header--scroll",
      zIndex: 5,
    });
  }
};

if ($("#office-header-nav").length > 0) {
  const menu = new MmenuLight(
    document.querySelector("#office-header-nav"),
    "(max-width: 1000px)"
  );

  const navigator = menu.navigation({
    title: "",
  });

  const drawer = menu.offcanvas();

  $(`.office-header__link-open`).on(`click`, (e) => {
    e.preventDefault();
    drawer.open();
    $(`.office-header__link-open`).addClass(`hidden`);
    $(`.office-header__link-close`).removeClass(`hidden`);
  });

  $(`.office-header__link-close`).on(`click`, (e) => {
    e.preventDefault();
    drawer.close();
    $(`.office-header__link-close`).addClass(`hidden`);
    $(`.office-header__link-open`).removeClass(`hidden`);
  });

  $(`.mm-ocd__backdrop`).on(`click`, () => {
    $(`.office-header__link-close`).addClass(`hidden`);
    $(`.office-header__link-open`).removeClass(`hidden`);
  });
}

const createChart = () => {
  const chart = $("#chartContainer");

  if (check(chart)) {
    const chartNew = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title: {
        // text: "Доходность ваших инвестиций",
      },
      backgroundColor: "#21212B",
      axisY: {
        title: "",
        labelFontColor: "#2C2F34",

        // interlacedColor: "rgb(255,250,250)",
        gridColor: "#2C2F34",
      },
      axisX: {
        labelFontColor: "#2C2F34",
      },

      data: [
        {
          type: "splineArea",
          color: "rgba(42, 255, 37, 1)",
          markerSize: 3,
          xValueFormatString: "YYYY",
          yValueFormatString: "$#,##0.##",
          dataPoints: [
            { x: new Date(2000, 0), y: 3289 },
            { x: new Date(2001, 0), y: 3830 },
            { x: new Date(2002, 0), y: 2009 },
            { x: new Date(2003, 0), y: 2840 },
            { x: new Date(2004, 0), y: 2396 },
            { x: new Date(2005, 0), y: 1613 },
            { x: new Date(2006, 0), y: 2821 },
            { x: new Date(2007, 0), y: 2000 },
            { x: new Date(2008, 0), y: 1397 },
            { x: new Date(2009, 0), y: 2506 },
            { x: new Date(2010, 0), y: 2798 },
            { x: new Date(2011, 0), y: 3386 },
            { x: new Date(2012, 0), y: 6704 },
            { x: new Date(2013, 0), y: 6026 },
            { x: new Date(2014, 0), y: 2394 },
            { x: new Date(2015, 0), y: 1872 },
            { x: new Date(2016, 0), y: 2140 },
          ],
        },
      ],
    });
    chartNew.render();
  }
};

const createLightbox = () => {
  const link = $(".education__link");

  if (check(link)) {
    const lightbox = GLightbox({
      selector: ".education__link",
      openEffect: "fade",
      closeEffect: "fade",
    });
  }
};

$(function () {
  resize();
  createSlider();
  createSliderNews();
  playVideo();
  makeRange(365);
  makeRange(150);
  createAccordion();
  makeFormEvent();
  createModalReg();
  createModalStructure();
  creatTabs();
  stickyHeader();
  createChart();
  createLightbox();
});
