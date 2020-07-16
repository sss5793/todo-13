import { makeElementWithClass } from "../utils/util";
import "./Popup.scss";

export default class Popup {
  constructor($target, props) {
    this.$target = $target;

    this.render();
  }

  setState(data) {
    this.data = data;
    this.render();
  }

  render() {
    const popup = makeElementWithClass({
      elementType: "div",
      className: "popup",
    });
    const popupBox = makeElementWithClass({
      elementType: "div",
      className: "popup-box",
    });
    const message = makeElementWithClass({
      elementType: "div",
      className: "popup-message",
    });
    const btns = makeElementWithClass({
      elementType: "div",
      className: "popup-btns",
    });
    const confirm = makeElementWithClass({
      elementType: "button",
      className: "popup-confirm",
      content: "확인",
    });
    const cancel = makeElementWithClass({
      elementType: "button",
      className: "popup-cancel",
      content: "취소",
    });

    btns.appendChild(confirm);
    btns.appendChild(cancel);
    popupBox.appendChild(message);
    popupBox.appendChild(btns);
    popup.appendChild(popupBox);
    this.$target.appendChild(popup);

    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.style.display = "none";
        message.innerHTML = "";
      }
    });
  }
}
