import React, { useState, useRef, useEffect } from 'react';
import { Clock } from 'lucide-react';

const CustomTimePicker = ({ name, value, onChange, placeholder = "--:--" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const hoursContainerRef = useRef(null);
  const minutesContainerRef = useRef(null);

  // Initialize selected hour and minute from value (e.g. "14:30")
  const [selectedHour, setSelectedHour] = useState(value ? value.split(':')[0] : '12');
  const [selectedMinute, setSelectedMinute] = useState(value ? value.split(':')[1] : '00');

  useEffect(() => {
    if (value) {
      setSelectedHour(value.split(':')[0]);
      setSelectedMinute(value.split(':')[1]);
    }
  }, [value]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // When dropdown opens, scroll selected items into view
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (hoursContainerRef.current) {
          const activeHour = hoursContainerRef.current.querySelector('.active-time');
          if (activeHour) activeHour.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
        if (minutesContainerRef.current) {
          const activeMin = minutesContainerRef.current.querySelector('.active-time');
          if (activeMin) activeMin.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
      }, 50);
    }
  }, [isOpen]);

  const handleApply = () => {
    const timeValue = `${selectedHour}:${selectedMinute}`;
    onChange({ target: { name, value: timeValue } });
    setIsOpen(false);
  };

  // Generate Hours
  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  
  // Generate Minutes (every 5 minutes for cleanliness, but can be 0-59)
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Input Facade */}
      <div 
        className={`input-field flex items-center justify-between cursor-pointer transition-all duration-200 ${isOpen ? 'ring-2 ring-[var(--primary)] border-[var(--primary)]' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`${value ? 'text-[var(--text-primary)]' : 'text-gray-400 font-normal'} font-medium select-none truncate text-center w-full`}>
          {value || placeholder}
        </span>
        <Clock size={18} className={`${isOpen ? 'text-[var(--primary)]' : 'text-gray-400'} absolute right-4`} />
      </div>

      {/* Popover */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 animate-fadeIn origin-top">
          <div className="grid grid-cols-2 gap-4 mb-4">
            
            {/* Hours Column */}
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 text-center">Hour</span>
              <div 
                ref={hoursContainerRef}
                className="h-48 overflow-y-auto scrollbar-hide snap-y snap-mandatory border-y border-gray-100 relative custom-scrollbar py-20"
                style={{ scrollBehavior: 'smooth' }}
              >
                {hours.map((hr) => (
                  <div 
                    key={`h-${hr}`}
                    onClick={() => {
                      setSelectedHour(hr);
                      const timeValue = `${hr}:${selectedMinute}`;
                      onChange({ target: { name, value: timeValue } });
                    }}
                    className={`h-10 flex items-center justify-center snap-center cursor-pointer text-lg font-medium transition-all duration-200
                      ${selectedHour === hr ? 'active-time bg-blue-50 text-[var(--primary)] rounded-lg scale-110 font-bold shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800 rounded-lg'}`}
                  >
                    {hr}
                  </div>
                ))}
              </div>
            </div>

            {/* Minutes Column */}
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 text-center">Minute</span>
              <div 
                ref={minutesContainerRef}
                className="h-48 overflow-y-auto scrollbar-hide snap-y snap-mandatory border-y border-gray-100 relative custom-scrollbar py-20"
                style={{ scrollBehavior: 'smooth' }}
              >
                {minutes.map((min) => (
                  <div 
                    key={`m-${min}`}
                    onClick={() => {
                      setSelectedMinute(min);
                      const timeValue = `${selectedHour}:${min}`;
                      onChange({ target: { name, value: timeValue } });
                    }}
                    className={`h-10 flex items-center justify-center snap-center cursor-pointer text-lg font-medium transition-all duration-200
                      ${selectedMinute === min ? 'active-time bg-blue-50 text-[var(--primary)] rounded-lg scale-110 font-bold shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800 rounded-lg'}`}
                  >
                    {min}
                  </div>
                ))}
              </div>
            </div>
            
          </div>
          
          <button
            type="button"
            onClick={handleApply}
            className="w-full py-2 bg-[var(--primary)] text-white rounded-xl font-bold hover:bg-[var(--primary-dark)] transition-colors shadow-sm"
          >
            Confirm Time
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomTimePicker;
