'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  postCategory,
  postExcerpt,
  postHref,
  postTitle,
  type HomePost
} from './utils'

const ALL_AREAS = 'Todas las áreas'
const TONES = ['gold', 'teal', 'crimson'] as const

// Acepta "DD/MM/AAAA" o cualquier fecha que entienda Date (ISO, "AAAA-MM-DD hh:mm:ss").
function parseEventDate (post: HomePost): Date | null {
  const value = post.fecha || post.date_ins
  if (!value) return null
  const text = value.trim()
  const dmy = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(text)
  const date = dmy
    ? new Date(Number(dmy[3]), Number(dmy[2]) - 1, Number(dmy[1]))
    : new Date(text)
  return Number.isNaN(date.getTime()) ? null : date
}

export default function WeeklyAgenda ({ posts = [] }: { posts?: HomePost[] }) {
  const areas = useMemo(() => {
    const found = new Set<string>()
    posts.forEach(p => {
      const area = postCategory(p)
      if (area) found.add(area)
    })
    return [ALL_AREAS, ...Array.from(found)]
  }, [posts])

  const [filter, setFilter] = useState<string>(ALL_AREAS)

  if (posts.length === 0) return null

  const events = posts.filter(
    p => filter === ALL_AREAS || postCategory(p) === filter
  )

  return (
    <section className='cl-section cl-agenda' id='agenda'>
      <div className='cl-agenda__panel'>
        <div className='cl-agenda__head'>
          <div>
            <span className='cl-agenda__eyebrow'>PROGRAMACIÓN ABIERTA</span>
            <h3 className='cl-agenda__title'>Agenda de la Semana</h3>
          </div>
          {areas.length > 1 && (
            <div
              className='cl-agenda__filters'
              role='group'
              aria-label='Filtrar por área'
            >
              {areas.map(f => (
                <button
                  key={f}
                  type='button'
                  className={`cl-chip ${f === filter ? 'is-active' : ''}`}
                  aria-pressed={f === filter}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className='cl-agenda__list'>
          {events.length === 0 ? (
            <p className='cl-event__detail'>
              No hay eventos programados para esta área por el momento.
            </p>
          ) : (
            events.map((post, i) => {
              const date = parseEventDate(post)
              const month = date
                ? date
                    .toLocaleDateString('es-AR', { month: 'short' })
                    .replace('.', '')
                    .toUpperCase()
                : ''
              const day = date ? String(date.getDate()).padStart(2, '0') : ''
              const category = postCategory(post)
              const tone = TONES[i % TONES.length]

              return (
                <div className='cl-event' key={post.id}>
                  <div className='cl-event__main'>
                    <div className='cl-event__date'>
                      <span className='cl-event__month'>{month}</span>
                      <span className='cl-event__day'>{day}</span>
                    </div>
                    <div>
                      {category && (
                        <span
                          className={`cl-event__kicker cl-event__kicker--${tone}`}
                        >
                          {category}
                        </span>
                      )}
                      <h4 className='cl-event__title'>{postTitle(post)}</h4>
                      <p className='cl-event__detail'>{postExcerpt(post)}</p>
                    </div>
                  </div>
                  <Link href={postHref(post)} className='cl-outline-btn'>
                    Más información
                  </Link>
                </div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
