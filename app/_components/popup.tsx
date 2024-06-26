import { useEffect } from "react";
import { classList } from "./_common";
import { IconButton } from "./button";
import images from "../images/_index";
import "./popup.scss";

export function Popup(props: {
  visible: boolean;
  onClose: Function;
  content: JSX.Element;
}) {
  useEffect(() => {
    const escapeListener: EventListener = (event: Event) => {
      const keyboardEvent = event as KeyboardEvent;
      if (keyboardEvent?.key === "Escape") {
        props.onClose();
      }
    };

    window.addEventListener("keydown", escapeListener);

    return () => {
      window.removeEventListener("keydown", escapeListener);
    };
  }, [props]);

  return (
    <div
      className={classList(["popupContainer", props.visible ? "visible" : ""])}
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          props.onClose();
        }
      }}
    >
      <div className="popup">
        <div className="popupContent">
          <CloseButton onClick={props.onClose} />
          {props.content}
        </div>
      </div>
    </div>
  );
}

function CloseButton(props: { onClick: Function }) {
  return (
    <IconButton
      pic={images.close}
      onSelect={props.onClick}
      className="closeButton"
      isSelected={false}
      width={35}
      height={35}
    />
  );
}
