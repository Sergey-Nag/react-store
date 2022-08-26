import React, {
  ButtonHTMLAttributes,
  Children,
  cloneElement,
  ReactElement,
  ReactNode,
  useRef,
  useState
} from "react";
import { ChevronUp, ChevronDown } from "react-bootstrap-icons";
import './dropdown-button.scss';
import cn from 'classnames';
import { useClickOutside } from "../../hooks/use-click-outside";

export interface DropdownButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string | ReactElement;
}

export function DropdownButton({ text, className, children }: DropdownButtonProps) {
  const buttonClassNames = cn(className, 'btn');
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isDropdownShown, setIsDropdownShown] = useState(false);
  
  const handleToggleDropdown = () => setIsDropdownShown((isShown) => !isShown);
  useClickOutside(buttonRef, handleCloseDropdown);
  
  function handleCloseDropdown() {
    setIsDropdownShown(false);
  }

  const extendChildClassName = (child: ReactNode) => {
    if (child && typeof child !== 'string' && 'props' in (child as ReactElement)) {
      const className = cn(
        (child as ReactElement).props.className,
        'dropdown-item'
      );

      return cloneElement(child as ReactElement, { className, role: 'menuitem' });
    }

    return child;
  }

  return (
    <div
      className="position-relative"
      role="menu"
      ref={buttonRef}
    >
      <button type="button" className={buttonClassNames} onClick={handleToggleDropdown}>
        { text || (isDropdownShown ? <ChevronUp /> : <ChevronDown />) }
      </button>
      { isDropdownShown && 
        <div className="dropdown-menu dropdown-right show" >
        { Children.map(children, extendChildClassName) }
        </div>
      }
    </div>
  );
}
