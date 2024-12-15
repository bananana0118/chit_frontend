import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, type, name, placeholder }: Props) {
  return (
    <div className="mb-[6px] flex w-full flex-row items-center justify-start rounded-md bg-white p-3 text-medium-large text-black">
      <input
        className={`flex-1 outline-none ${className}`}
        type={type}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
}
