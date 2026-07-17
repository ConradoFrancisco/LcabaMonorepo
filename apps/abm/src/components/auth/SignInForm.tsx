'use client';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import { EyeCloseIcon, EyeIcon } from '@/icons';
import React, { useState, useEffect } from 'react';
/* import { FaFacebookF } from 'react-icons/fa6';
import { FaGoogle } from 'react-icons/fa'; */
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import axios from 'axios';

export default function SignInForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isOk, setIsOk] = useState<boolean | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  useEffect(() => {
    if (sessionStorage.getItem('loggedOutByInactivity')) {
      sessionStorage.removeItem('loggedOutByInactivity');
      toast.warning('Se cerró la sesión por falta de actividad.');
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setIsOk(null);
    if (!username || !password) {
      setMessage('Completá usuario y contraseña.');
      setIsOk(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
        username,
        password,
      });

      if (response?.data?.ok === false || !response?.data) {
        setIsOk(false);
        setMessage(response?.data?.message || 'Error en inicio de sesión.');
        setUsername('');
        setPassword('');
        return;
      } else {
        setIsOk(true);
        login(response.data.user, response.data.token); // aca uso el metodo del context
        toast.success(
          `¡Bienvenido ${[response.data.user.name, response.data.user.surname].filter(Boolean).join(' ') || 'usuario'}!`,
        );
      }

      router.replace('/'); // o "/dashboard"
    } catch (err: unknown) {
      setIsOk(false);
      const axiosError = err as { response?: { data?: { message?: string } } };
      const serverMessage = axiosError?.response?.data?.message;
      setMessage(serverMessage || 'Error de red o servidor.');
      setUsername('');
      setPassword('');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4 dark:bg-gray-900">
      <div className="flex w-full flex-1 flex-col lg:w-1/2">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
          <div>
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <Image
                src="/images/logo/logoLegislatura.png"
                alt="Logo Legislatura"
                width={328}
                height={100}
                className="h-auto w-82"
              />
            </div>
            <div className="mb-5 text-center sm:mb-8">
              <h1 className="text-title-sm sm:text-title-md mb-2 font-semibold text-gray-800 dark:text-white/90">
                Inicio de sesión
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Ingresa con tu usuario y contraseña.
              </p>
              {/*  <p className='text-sm text-gray-500 dark:text-gray-400'>
                Ingresa con Google o Facebook.
              </p> */}
            </div>

            <div>
              {/* <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5'>
                <button
                  type='button'
                  className='inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10'
                >
                  <FaGoogle /> Iniciar con Google
                </button>
                <button
                  type='button'
                  className='inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10'
                >
                  <FaFacebookF /> Iniciar con Facebook
                </button>
              </div>

              <div className='relative py-3 sm:py-5'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-200 dark:border-gray-800'></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2'>
                    O inicia sesión con tu usuario y contraseña de red.
                  </span>
                </div>
              </div> */}

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="username">
                      Usuario <span className="text-error-500">*</span>
                    </Label>

                    <div className="relative">
                      {/* Input con padding a la izquierda para no tapar el texto */}
                      <Input
                        id="username"
                        name="username"
                        placeholder="Usuario de red"
                        type="text"
                        value={username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setUsername(e.target.value)
                        }
                        disabled={loading}
                        className="pl-12"
                      />

                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M8.025 6.178a2.303 2.303 0 1 1 4.607 0 2.303 2.303 0 0 1-4.607 0m2.304-3.803a3.803 3.803 0 1 0 0 7.607 3.803 3.803 0 0 0 0-7.607M8.923 11.03a5.714 5.714 0 0 0-5.714 5.714v.29a.75.75 0 0 0 1.5 0v-.29a4.214 4.214 0 0 1 4.214-4.214h2.813a4.214 4.214 0 0 1 4.214 4.214v.29a.75.75 0 1 0 1.5 0v-.29a5.714 5.714 0 0 0-5.714-5.714z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password">
                      Contraseña <span className="text-error-500">*</span>
                    </Label>

                    <div className="relative">
                      {/* Ícono de candado a la izquierda */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
                          <path
                            fill="#667085"
                            d="M10.625 13.958a.625.625 0 0 0-1.25 0v1.25a.625.625 0 0 0 1.25 0z"
                          />
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M10 1.667a4.375 4.375 0 0 0-4.375 4.375v1.562H4.584c-1.036 0-1.875.84-1.875 1.875v6.979c0 1.035.839 1.875 1.874 1.875h10.834c1.035 0 1.875-.84 1.875-1.875V9.479c0-1.036-.84-1.875-1.875-1.875h-1.042V6.042A4.375 4.375 0 0 0 10 1.667m3.125 4.375v1.562h-6.25V6.042a3.125 3.125 0 0 1 6.25 0M4.584 8.854a.625.625 0 0 0-.625.625v6.979c0 .345.28.625.624.625h10.834c.345 0 .625-.28.625-.625V9.479a.625.625 0 0 0-.625-.625z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>

                      {/* Input con padding izquierdo para el ícono */}
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPassword(e.target.value)
                        }
                        disabled={loading}
                        className="pl-12"
                      />

                      {/* Ícono de mostrar/ocultar */}
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer"
                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      >
                        {showPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                        ) : (
                          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                        )}
                      </span>
                    </div>
                  </div>

                  {message && (
                    <div className={`text-sm ${isOk ? 'text-green-600' : 'text-red-600'}`}>
                      {message}
                    </div>
                  )}

                  <div>
                    <Button className="w-full" size="sm" type="submit" disabled={loading}>
                      {loading ? 'Verificando...' : 'Iniciar sesión'}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
