import React, { Children, cloneElement, ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { ChevronUp, ChevronDown } from "react-bootstrap-icons";
import './dropdown-button.scss';
import cn from 'classnames';

interface DropdownButtonProps {
  text?: string | ReactElement;
  children: ReactNode;
  [key: string]: any;
}

export function DropdownButton({ text, className, children }: DropdownButtonProps) {
  const buttonClassNames = cn(className, 'btn');
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isDropdownShown, setIsDropdownShown] = useState(false);
  const dropdownClassNames = cn('dropdown-menu', 'dropdown-right', isDropdownShown && 'show');

  const modifyChildren = (child: ReactNode) => {
    if (child && 'props' in (child as ReactElement)) {
      const className = cn(
        (child as ReactElement).props.className,
        'dropdown-item'
      );

      return cloneElement(child as ReactElement, { className, role: 'menuitem' });
    }

    return child;
  }
  
  useEffect(() => {
    const handleOutsideClick = ({ target }: MouseEvent) => {
      if (target && buttonRef.current?.contains(target as HTMLElement)) {
        setIsDropdownShown((isShown) => !isShown);

        return;
      };

      setIsDropdownShown(false);
    }

    document.addEventListener('click', handleOutsideClick);

    return () => document.removeEventListener('click', handleOutsideClick);
  }, [buttonRef]);

  return (
    <div
      className="position-relative"
      role="menu"
      ref={buttonRef}
    >
      <button type="button" className={buttonClassNames}>
        { text || (isDropdownShown ? <ChevronUp /> : <ChevronDown />) }
      </button>
      <div className={dropdownClassNames}>
        { Children.map(children, modifyChildren) }
      </div>
    </div>
  );
}
