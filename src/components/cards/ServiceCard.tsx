/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { ServiceItem } from '../../types';

interface ServiceCardProps {
  service: ServiceItem;
  onSelectSpec?: (service: ServiceItem) => void;
  onInquire?: (service: ServiceItem) => void;
  className?: string;
}

export function ServiceCard({
  service,
  onSelectSpec,
  onInquire,
  className = ''
}: ServiceCardProps) {
  const IconComponent = service.icon;

  return (
    <div
      className={`
        matte-card matte-card-hover p-6 rounded-2xl flex flex-col justify-between
        ${className}
      `}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-xl bg-[#1B1B22] border border-[#D4AF37]/20 text-[#D4AF37]">
            <IconComponent className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#181820] text-[#D4AF37] border border-[#D4AF37]/20">
            {service.category}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 font-heading">{service.name}</h3>
        <p className="text-xs text-[#9595A0] leading-relaxed mb-4">{service.description}</p>

        <div className="space-y-1.5 border-t border-[#1C1C24] pt-4 mb-4">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#A5A5B2] block mb-1">
            Key Deliverables:
          </span>
          {service.deliverables.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-[#D5D5DC]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-[#1C1C24] flex items-center gap-2">
        {onSelectSpec && (
          <button
            type="button"
            onClick={() => onSelectSpec(service)}
            aria-label={`View technical specifications for ${service.name}`}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#181820] hover:bg-[#20202B] text-white font-medium text-xs transition-all text-center border border-[#262633] cursor-pointer min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
          >
            Technical Spec
          </button>
        )}
        {onInquire && (
          <button
            type="button"
            onClick={() => onInquire(service)}
            aria-label={`Inquire about ${service.name}`}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#D4AF37] hover:brightness-110 text-black font-semibold text-xs transition-all text-center cursor-pointer flex items-center justify-center gap-1 min-h-[44px] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          >
            <span>Inquire</span>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
