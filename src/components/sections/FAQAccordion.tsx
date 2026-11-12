/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { FAQItem } from '../../types';

interface FAQAccordionProps {
  items: FAQItem[];
  defaultOpenId?: string;
  className?: string;
}

export function FAQAccordion({
  items,
  defaultOpenId,
  className = ''
}: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId || items[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const buttonId = `faq-btn-${item.id}`;
        const panelId = `faq-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={`
              rounded-xl border transition-all duration-200 overflow-hidden
              ${
                isOpen
                  ? 'bg-[#15151C] border-[#D4AF37]/40 shadow-lg shadow-black/40'
                  : 'bg-[#111116] border-[#1F1F28] hover:border-[#2D2D3A]'
              }
            `}
          >
            <h3 className="m-0 p-0 font-normal">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between p-5 text-left select-none cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none focus-visible:bg-[#181822]"
              >
                <span className="text-xs sm:text-sm font-semibold text-white tracking-wide pr-4">
                  {item.question}
                </span>
                <span
                  className={`
                    w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200
                    ${isOpen ? 'bg-[#D4AF37] text-black rotate-90' : 'bg-[#1A1A22] text-[#D4AF37]'}
                  `}
                  aria-hidden="true"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={`px-5 pb-5 pt-1 text-xs sm:text-sm text-[#A5A5B2] leading-relaxed border-t border-[#1C1C26] ${
                isOpen ? 'block' : 'hidden'
              }`}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
