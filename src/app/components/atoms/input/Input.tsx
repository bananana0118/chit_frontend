import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, type, name, placeholder }: Props) {
  return (
    <input
      className={`flex-1 outline-none ${className}`}
      type={type}
      name={name}
      placeholder={placeholder}
    />
  );
}
