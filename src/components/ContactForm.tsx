import { useRef, useState, type FormEvent } from 'react'
import { Mail, Send } from 'lucide-react'
import { site } from '../lib/site'

export function ContactForm() {
  const [status, setStatus] = useState<
    'idle' | 'pending' | 'error' | 'success'
  >('idle')
  const submitting = useRef(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current || status === 'success') return
    const body = new URLSearchParams()
    new FormData(event.currentTarget).forEach((value, key) =>
      body.append(key, String(value)),
    )
    submitting.current = true
    setStatus('pending')
    try {
      const response = await fetch('/contact.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok || /\bdata-netlify\s*=/i.test(await response.text()))
        throw new Error('Message was not accepted')
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      submitting.current = false
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <p className="eyebrow mb-3">
          <span className="text-signal">~/</span>contact
        </p>
        <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl">
          Let’s build something<span className="text-signal">.</span>
        </h1>
        <p className="mt-4 max-w-md text-lg text-secondary-foreground">
          Recruiting for 2027 new-grad roles, hiring for a research project, or
          just want to talk agents and data reliability? Send a message and
          I’ll get back to you.
        </p>
        <div className="panel mt-8 p-5 font-mono text-xs text-muted-foreground">
          <p>
            <span className="text-signal">$</span> mail{' '}
            <a
              href={`mailto:${site.email}`}
              className="text-foreground hover:text-signal"
            >
              {site.email}
            </a>
          </p>
          <p className="mt-2">
            <span className="text-signal">$</span> location{' '}
            <span className="text-foreground">{site.location}</span>
          </p>
          <p className="mt-2">
            <span className="text-signal">$</span> response_time{' '}
            <span className="text-foreground">&lt; 48h</span>
          </p>
        </div>
      </div>
      <div className="panel p-6 sm:p-8">
        {status === 'success' ? (
          <div className="text-center py-8">
            <Mail
              aria-hidden="true"
              className="w-8 h-8 mx-auto mb-4 text-signal"
            />
            <h2 className="font-display text-2xl font-bold mb-2">
              Message received
            </h2>
            <p role="status" className="mb-6 text-secondary-foreground">
              Thanks for reaching out. I’ll get back to you soon.
            </p>
            <button
              type="button"
              className="contact-button"
              onClick={() => setStatus('idle')}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            name="contact"
            method="POST"
            action="/contact.html"
            data-netlify="true"
            netlify-honeypot="bot-field"
            aria-busy={status === 'pending'}
            onSubmit={submit}
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="contact" />
            <input
              type="hidden"
              name="subject"
              value="New portfolio message (%{submissionId})"
            />
            <p hidden>
              <label>
                Leave this empty
                <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>
            <fieldset
              disabled={status === 'pending'}
              className="min-w-0 space-y-6 disabled:opacity-70"
            >
              <legend className="sr-only">Your message</legend>
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted-foreground"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  className="contact-input"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  className="contact-input"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  maxLength={5000}
                  rows={6}
                  className="contact-input"
                  placeholder="What are you working on?"
                />
              </div>
              <button type="submit" className="contact-button">
                <Send aria-hidden="true" size={16} />
                {status === 'pending' ? 'Sending…' : 'Send message'}
              </button>
            </fieldset>
            <p role="status" className="sr-only">
              {status === 'pending' ? 'Sending your message…' : ''}
            </p>
            {status === 'error' && (
              <p role="alert" className="text-sm text-flare">
                We couldn’t confirm your message. Your details are still here;
                please try again. Local previews don’t process submissions.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
