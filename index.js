export const select = (e) => document.querySelector(e);
export const selectAll = (e) => document.querySelectorAll(e);
export const selectFrom = (e, el) => {
  return el.querySelector(e);
};
export const selectAllFrom = (e, el) => {
  if (Array.isArray(e)) {
    let els = [];
    e.forEach((selector) => {
      els = els.concat(Array.from(selectAllFrom(selector, el)));
    });
    return els;
  } else {
    return el.querySelectorAll(e);
  }
};
export const getPlaceValue = (numberString, place) => {
  const reversedNumber = numberString.split("").reverse().join("");
  const placeValue = reversedNumber[place - 1];
  return parseInt(placeValue, 10);
};
export const resetInlineStyles = (elements) => {
  elements.forEach((selector) => {
    selectAll(selector).forEach((el) => (el.style.transform = ""));
  });
};
export const lerp = (start, stop, amount) => (stop - start) * amount;
export const isEven = (number) => number % 2 === 0;
export const getBounding = (el) => el.getBoundingClientRect();
export const elementHasWidth = (el) => el.clientWidth > 1;
export const getCssVariable = (element, variableName) => {
  const computedStyles = getComputedStyle(element);
  const variableValue = computedStyles
    .getPropertyValue(`--${variableName}`)
    .trim();
  return variableValue;
};
export async function preloadContent(content, i) {
  return new Promise((r) => {
    const preloadImage = () => {
      const image = new Image();
      image.onload = r;
      image.onerror = r;
      image.src = content;
    };
    const preloadVideo = () => {
      const video = document.createElement("video");
      video.src = content;
      video.preload = "auto";
      video.addEventListener("loadeddata", r);
      video.addEventListener("error", r);
    };

    try {
      if (content.endsWith(".webm")) {
        preloadVideo();
      } else {
        preloadImage();
      }
    } catch (err) {
      console.log(err, content, i);
    }
  });
}
export function addDOMEventWatcher({ el, event, callback }) {
  el.addEventListener(event, callback);

  return function () {
    el.removeEventListener("event", callback);
  };
}
const accessPathOnObject = (path, object) => {
  return (
    path.split("/").reduce((value, key) => (value = value[key]), object) ||
    console.log(`path ${path} doesn't exist on Object:`, object)
  );
};
