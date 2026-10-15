'use client';

import { useState } from 'react';

interface ArticleGalleryProps {
    images: string[];
    title?: string;
}

export default function ArticleGallery({
    images = [],
    title = '',
}: ArticleGalleryProps) {
    const [current, setCurrent] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    if (images.length === 0) return null;

    const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
    const next = () => setCurrent((c) => (c + 1) % images.length);

    const openLightbox = (idx: number) => {
        setCurrent(idx);
        setLightboxOpen(true);
    };

    return (
        <div className='article-gallery mb-5'>
            {/* Imagen Principal / Slide */}
            <div
                className='position-relative overflow-hidden rounded-4 shadow-sm'
                style={{
                    cursor: 'zoom-in',
                    maxHeight: '480px',
                    height: '480px',
                    backgroundColor: '#0f172a',
                }}
                onClick={() => openLightbox(current)}
            >
                <img
                    src={images[current]}
                    alt={`${title} - ${current + 1}`}
                    className='w-100 h-100'
                    style={{
                        objectFit: 'contain',
                        display: 'block',
                        transition: 'opacity 0.3s ease',
                    }}
                />

                {/* Ícono Zoom */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '16px',
                        right: '16px',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(4px)',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                    }}
                    title='Ampliar imagen'
                >
                    <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.2'>
                        <circle cx='11' cy='11' r='8' />
                        <line x1='21' y1='21' x2='16.65' y2='16.65' />
                        <line x1='11' y1='8' x2='11' y2='14' />
                        <line x1='8' y1='11' x2='14' y2='11' />
                    </svg>
                </div>

                {/* Flechas de navegación (solo si > 1 imagen) */}
                {images.length > 1 && (
                    <>
                        <button
                            type='button'
                            onClick={(e) => {
                                e.stopPropagation();
                                prev();
                            }}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '16px',
                                transform: 'translateY(-50%)',
                                background: 'rgba(0, 0, 0, 0.55)',
                                backdropFilter: 'blur(4px)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '42px',
                                height: '42px',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease',
                            }}
                            aria-label='Anterior'
                        >
                            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='white' strokeWidth='2.5'>
                                <polyline points='15 18 9 12 15 6' />
                            </svg>
                        </button>
                        <button
                            type='button'
                            onClick={(e) => {
                                e.stopPropagation();
                                next();
                            }}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: '16px',
                                transform: 'translateY(-50%)',
                                background: 'rgba(0, 0, 0, 0.55)',
                                backdropFilter: 'blur(4px)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '42px',
                                height: '42px',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease',
                            }}
                            aria-label='Siguiente'
                        >
                            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='white' strokeWidth='2.5'>
                                <polyline points='9 18 15 12 9 6' />
                            </svg>
                        </button>

                        {/* Contador */}
                        <span
                            style={{
                                position: 'absolute',
                                bottom: '16px',
                                left: '16px',
                                background: 'rgba(0, 0, 0, 0.65)',
                                backdropFilter: 'blur(4px)',
                                color: 'white',
                                borderRadius: '999px',
                                padding: '4px 14px',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                letterSpacing: '0.05em',
                            }}
                        >
                            {current + 1} / {images.length}
                        </span>
                    </>
                )}
            </div>

            {/* Miniaturas (Thumbnails) */}
            {images.length > 1 && (
                <div className='d-flex gap-2 mt-3 flex-wrap align-items-center'>
                    {images.map((url, i) => {
                        const isActive = i === current;
                        return (
                            <button
                                key={i}
                                type='button'
                                onClick={() => setCurrent(i)}
                                style={{
                                    border: isActive ? '3px solid var(--tc-theme-primary, #0d6efd)' : '3px solid transparent',
                                    borderRadius: '10px',
                                    padding: 0,
                                    background: '#0f172a',
                                    cursor: 'pointer',
                                    overflow: 'hidden',
                                    width: '80px',
                                    height: '60px',
                                    opacity: isActive ? 1 : 0.65,
                                    transform: isActive ? 'scale(1.04)' : 'scale(1)',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <img
                                    src={url}
                                    alt={`Miniatura ${i + 1}`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        display: 'block',
                                    }}
                                />
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Modal Lightbox a pantalla completa */}
            {lightboxOpen && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.92)',
                        backdropFilter: 'blur(8px)',
                        zIndex: 99999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={() => setLightboxOpen(false)}
                >
                    {/* Botón cerrar */}
                    <button
                        type='button'
                        onClick={() => setLightboxOpen(false)}
                        style={{
                            position: 'absolute',
                            top: '24px',
                            right: '24px',
                            background: 'rgba(255, 255, 255, 0.15)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '46px',
                            height: '46px',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='white' strokeWidth='2.5'>
                            <line x1='18' y1='6' x2='6' y2='18' />
                            <line x1='6' y1='6' x2='18' y2='18' />
                        </svg>
                    </button>

                    {/* Imagen ampliada */}
                    <img
                        src={images[current]}
                        alt={`${title} - ${current + 1}`}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxWidth: '90vw',
                            maxHeight: '85vh',
                            objectFit: 'contain',
                            borderRadius: '12px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        }}
                    />

                    {/* Flechas Lightbox si > 1 */}
                    {images.length > 1 && (
                        <>
                            <button
                                type='button'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    prev();
                                }}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '24px',
                                    transform: 'translateY(-50%)',
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '52px',
                                    height: '52px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <svg width='26' height='26' viewBox='0 0 24 24' fill='none' stroke='white' strokeWidth='2.5'>
                                    <polyline points='15 18 9 12 15 6' />
                                </svg>
                            </button>
                            <button
                                type='button'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    next();
                                }}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: '24px',
                                    transform: 'translateY(-50%)',
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '52px',
                                    height: '52px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <svg width='26' height='26' viewBox='0 0 24 24' fill='none' stroke='white' strokeWidth='2.5'>
                                    <polyline points='9 18 15 12 9 6' />
                                </svg>
                            </button>

                            <span
                                style={{
                                    position: 'absolute',
                                    bottom: '24px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                }}
                            >
                                {current + 1} / {images.length}
                            </span>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
