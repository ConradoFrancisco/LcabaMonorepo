import Link from 'next/link';
import { useState, useEffect } from 'react';

/* eslint-disable @next/next/no-img-element */
export default function Search({
  tipo,
  setSearch,
  setOffset,
  variant = 'header',
  value,
}: {
  tipo: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  variant?: 'header' | 'filters';
  value?: string;
}) {
  const [search, setSearchState] = useState<string>(value || '');

  useEffect(() => {
    if (value !== undefined) {
      setSearchState(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setSearchState(e.target.value);
    setOffset(0);
  };

  const handleResetButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearch('');
    setSearchState('');
    setOffset(0);
  };
  return (
    <div
      className={`flex w-full gap-2 ${
        variant === 'header'
          ? 'items-end justify-end border-b border-gray-200 px-3 py-3 lg:px-0 lg:py-4'
          : 'items-center p-0'
      } `}
    >
      {' '}
      {variant === 'header' && (
        <Link className="lg:hidden" href="/">
          <img
            alt="Logo"
            loading="lazy"
            width={154}
            height={32}
            decoding="async"
            data-nimg={1}
            className="dark:hidden"
            style={{ color: 'transparent' }}
            src="/images/logo/logo.svg"
          />
          <img
            alt="Logo"
            loading="lazy"
            width={154}
            height={32}
            decoding="async"
            data-nimg={1}
            className="hidden dark:block"
            style={{ color: 'transparent' }}
            src="/images/logo/logo-dark.svg"
          />
        </Link>
      )}
      <button
        className={`z-99999 flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 ${variant === 'header' ? 'lg:hidden' : 'hidden'}`}
      >
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051V11.9951C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951ZM17.999 10.4951C18.8275 10.4951 19.499 11.1667 19.499 11.9951V12.0051C19.499 12.8335 18.8275 13.5051 17.999 13.5051C17.1706 13.5051 16.499 12.8335 16.499 12.0051V11.9951C16.499 11.1667 17.1706 10.4951 17.999 10.4951ZM13.499 11.9951C13.499 11.1667 12.8275 10.4951 11.999 10.4951C11.1706 10.4951 10.499 11.1667 10.499 11.9951V12.0051C10.499 12.8335 11.1706 13.5051 11.999 13.5051C12.8275 13.5051 13.499 12.8335 13.499 12.0051V11.9951Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <div className={variant === 'filters' ? 'block' : 'hidden lg:block'}>
        <form>
          <div className="relative">
            <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
              <svg
                className="fill-gray-500 dark:fill-gray-400"
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                  fill=""
                />
              </svg>
            </span>
            <input
              type="text"
              name="search"
              value={search}
              onChange={handleChange}
              placeholder={`Buscar por titulo`}
              /* placeholder={`Buscar por titulo de ${tipo}`} */
              className={`shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 rounded-lg border border-gray-200 py-2.5 pr-14 pl-12 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-800 dark:text-white/90 dark:placeholder:text-white/30 ${
                variant === 'filters'
                  ? 'w-[230px] bg-white dark:bg-gray-900'
                  : 'w-full bg-transparent xl:w-[430px] dark:bg-white/[0.03]'
              } hover:cursor-pointer hover:text-black`}
            />

            {search !== '' ? (
              <button
                onClick={handleResetButton}
                className="absolute top-1/2 right-2.5 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-red-500 bg-red-500 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400"
              >
                <span style={{ color: 'white' }}> X</span>
              </button>
            ) : (
              ''
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
