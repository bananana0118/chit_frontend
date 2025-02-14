'use client';
import Eyes from '@/app/assets/icons/Eyes';
import React, { useState } from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  className,
  type,
  name,
  placeholder,
  onChange,
}: Props) {
  return (
    <div
      className={`mb-[6px] flex w-full flex-row items-center justify-start rounded-md bg-white p-3 text-medium-large text-black`}
    >
      <input
        onChange={onChange}
        className={`flex-1 outline-none ${className}`}
        type={type}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
}

export const InputPassword = ({
  className,
  name,
  placeholder,
  onChange,
}: Props) => {
  const [isHidden, setIsHidden] = useState(true);

  const onClickHidden = () => {
    setIsHidden(!isHidden);
  };
  //눈감는 버튼 눌렀을때
  return (
    <div
      className={`mb-[6px] flex w-full flex-row items-center justify-start rounded-md bg-white p-3 text-medium-large text-black`}
    >
      <input
        onChange={onChange}
        className={`flex-1 outline-none ${className}`}
        type={isHidden ? 'password' : 'text'}
        name={name}
        placeholder={placeholder}
      />
      <div
        onClick={onClickHidden}
        className="relative bottom-0 right-0 top-0 cursor-pointer pl-2"
      >
        <Eyes />
      </div>
    </div>
  );
};
