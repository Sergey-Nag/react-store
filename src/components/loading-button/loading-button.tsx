import { ButtonHTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';

interface LoadingButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  children: ReactNode;
}

export function LoadingButton({ className, loading, children, ...rest }: LoadingButtonProps) {
  const buttonClasses = cn('btn btn-primary', className);

  return (
    <button
      className={buttonClasses}
      {...rest}
    >
      { loading
          ? (<><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Loading</>) 
          : children
      }
    </button>
  )
}