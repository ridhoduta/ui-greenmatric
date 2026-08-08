'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LandingHeader } from '@/components/landing/layout/LandingHeader';
import { LandingFooter } from '@/components/landing/layout/LandingFooter';
import { PageHeader } from '@/components/landing/header';

export default function ContactPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const faqs = [
    {
      q: 'What is UI GreenMetric?',
      a: 'UI GreenMetric Sustainable University Rankings is an initiative that measures and encourages sustainability efforts among universities around the world.',
    },
    {
      q: 'Who can use the platform?',
      a: 'The platform is designed to support universities and their teams in managing sustainability-related information and activities.',
    },
    {
      q: 'What can I manage through the platform?',
      a: 'The platform can support the organization, monitoring, analysis, and reporting of university sustainability information.',
    },
    {
      q: 'How can I collaborate with your team?',
      a: 'Send us a message through the contact form or reach out through our contact information. Our team will be happy to discuss potential collaboration.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <LandingHeader />

      <main className="flex-1">
        {/* Page Header */}
        <PageHeader
          category="GET IN TOUCH"
          title="Let's Build a More Sustainable Future."
          description="Have questions about the platform, sustainability management, or collaboration? We would love to hear from you."
        />

        {/* Section 1: Contact Introduction & Info */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-mobile md:py-section-gap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 flex flex-col space-y-4">
              <span className="font-label-md text-label-md text-primary tracking-widest uppercase font-semibold">
                CONTACT US
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface leading-tight">
                We're Here to Help.
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed pt-2">
                Whether you want to learn more about the platform, discuss a potential collaboration, or simply ask a question, feel free to reach out.
              </p>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Our team will get back to you as soon as possible.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Email Card */}
              <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6 hover:border-primary/40 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-2xl">mail</span>
                </div>
                <span className="font-label-md text-label-md text-outline uppercase tracking-wider block mb-1">
                  EMAIL
                </span>
                <a
                  href="mailto:support@kampus.ac.id"
                  className="font-headline-sm text-headline-sm text-primary font-bold hover:underline"
                >
                  support@kampus.ac.id
                </a>
              </div>

              {/* Phone Card */}
              <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6 hover:border-primary/40 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-2xl">call</span>
                </div>
                <span className="font-label-md text-label-md text-outline uppercase tracking-wider block mb-1">
                  PHONE
                </span>
                <p className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  (+62) 21-786-7222
                </p>
              </div>

              {/* Address Card */}
              <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6 hover:border-primary/40 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-2xl">location_on</span>
                </div>
                <span className="font-label-md text-label-md text-outline uppercase tracking-wider block mb-1">
                  ADDRESS
                </span>
                <p className="font-body-md text-body-md text-on-surface font-medium leading-snug">
                  UI GreenMetric Secretariat, Universitas Indonesia Campus, Depok, 16424, Indonesia
                </p>
              </div>

              {/* Office Hours Card */}
              <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6 hover:border-primary/40 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-2xl">schedule</span>
                </div>
                <span className="font-label-md text-label-md text-outline uppercase tracking-wider block mb-1">
                  OFFICE HOURS
                </span>
                <p className="font-body-md text-body-md text-on-surface font-medium">
                  Monday — Friday
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  08:00 — 16:00 WIB
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Contact Form */}
        <section className="bg-surface-bright py-section-gap-mobile md:py-section-gap border-y border-outline-variant/20">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
            <div className="max-w-3xl mx-auto bg-surface border border-outline-variant/30 rounded-3xl p-8 md:p-12 shadow-sm">
              <div className="text-center mb-8">
                <span className="font-label-md text-label-md text-primary tracking-widest uppercase font-semibold block mb-2">
                  SEND US A MESSAGE
                </span>
                <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold">
                  Send Us a Message
                </h2>
              </div>

              {formSubmitted ? (
                <div className="bg-primary/10 border border-primary text-primary p-6 rounded-2xl text-center flex flex-col items-center space-y-2">
                  <span className="material-symbols-outlined text-4xl">check_circle</span>
                  <h3 className="font-headline-sm text-headline-sm font-bold">Message Sent!</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Thank you for reaching out. Our team will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-label-md text-label-md text-on-surface font-semibold block mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        className="w-full px-4 py-3.5 rounded-xl border border-outline-variant/50 bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md"
                      />
                    </div>
                    <div>
                      <label className="font-label-md text-label-md text-on-surface font-semibold block mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3.5 rounded-xl border border-outline-variant/50 bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-label-md text-label-md text-on-surface font-semibold block mb-2">
                        Institution
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your university or institution"
                        className="w-full px-4 py-3.5 rounded-xl border border-outline-variant/50 bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md"
                      />
                    </div>
                    <div>
                      <label className="font-label-md text-label-md text-on-surface font-semibold block mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="What can we help you with?"
                        className="w-full px-4 py-3.5 rounded-xl border border-outline-variant/50 bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-label-md text-label-md text-on-surface font-semibold block mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us how we can help."
                      className="w-full px-4 py-3.5 rounded-xl border border-outline-variant/50 bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-on-primary py-4 rounded-xl font-label-md text-label-md hover:bg-on-primary-fixed-variant transition-colors shadow-md hover:shadow-lg font-bold flex items-center justify-center space-x-2"
                  >
                    <span>Send Message</span>
                    <span className="material-symbols-outlined text-lg">send</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Section 3: FAQ */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-mobile md:py-section-gap">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-label-md text-label-md text-primary tracking-widest uppercase font-semibold block mb-3">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
              Have a Question?
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-surface-bright border border-outline-variant/20 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-6 text-left flex justify-between items-center space-x-4 hover:bg-surface-container-low/50 transition-colors"
                  >
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      {faq.q}
                    </span>
                    <span
                      className={`material-symbols-outlined text-primary text-2xl transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-on-surface-variant font-body-lg text-body-lg leading-relaxed border-t border-outline-variant/10">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 4: Final CTA */}
        <section className="bg-primary text-on-primary py-section-gap-mobile md:py-section-gap">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter text-center flex flex-col items-center">
            <span className="font-label-md text-label-md text-secondary-fixed tracking-widest uppercase font-semibold mb-3">
              HAVE AN IDEA OR QUESTION?
            </span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-primary mb-6">
              Let's Start a Conversation.
            </h2>
            <p className="font-body-lg text-body-lg text-on-primary/80 max-w-2xl mb-8">
              Every sustainable initiative starts with a conversation.
            </p>
            <Link
              href="mailto:support@kampus.ac.id"
              className="bg-on-primary text-primary px-8 py-4 rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-colors shadow-lg hover:-translate-y-0.5"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
