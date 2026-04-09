import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const CustomDatePicker = ({ name, value, onChange, min, placeholder = "Select Date" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const dropdownRef = useRef(null);

  // Parse initial value or default to today (or min if today is less than min)
  useEffect(() => {
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        setCurrentMonth(new Date(d.getFullYear(), d.getMonth(), 1));
      }
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

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const minDate = min ? new Date(min) : null;
  if (minDate) minDate.setHours(0, 0, 0, 0);

  const handleSelectDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formatted = `${year}-${month}-${day}`;
    
    onChange({ target: { name, value: formatted } });
    setIsOpen(false);
  };

  const nextMonth = (e) => {
    e.preventDefault(); // Prevent form submission
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = (e) => {
    e.preventDefault(); // Prevent form submission
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Calendar logic
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const days = [];
  // Empty slots for days before the 1st
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
  }

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Format display value
  let displayValue = placeholder;
  if (value) {
    const d = new Date(value);
    displayValue = `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Input Facade */}
      <div 
        className={`input-field flex items-center justify-between cursor-pointer transition-all duration-200 ${isOpen ? 'ring-2 ring-[var(--primary)] border-[var(--primary)]' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`${value ? 'text-[var(--text-primary)]' : 'text-gray-400 font-normal'} font-medium select-none truncate`}>
          {displayValue}
        </span>
        <CalendarIcon size={18} className={`${isOpen ? 'text-[var(--primary)]' : 'text-gray-400'}`} />
      </div>

      {/* Popover */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 animate-fadeIn origin-top">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button type="button" onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
              <ChevronLeft size={20} />
            </button>
            <div className="font-bold text-[var(--text-primary)]">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </div>
            <button type="button" onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(d => (
              <div key={d} className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider">{d}</div>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, i) => {
              if (!date) return <div key={`empty-${i}`} className="p-2"></div>;
              
              const isToday = date.getTime() === today.getTime();
              const isSelected = value && date.getTime() === new Date(value).getTime();
              const isDisabled = minDate && date.getTime() < minDate.getTime();
              
              return (
                <button
                  type="button"
                  key={i}
                  disabled={isDisabled}
                  onClick={() => handleSelectDate(date)}
                  className={`
                    w-8 h-8 mx-auto flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200
                    ${isDisabled ? 'text-gray-300 cursor-not-allowed' : ''}
                    ${isSelected ? 'bg-[var(--primary)] text-white shadow-md transform scale-110' : ''}
                    ${!isSelected && !isDisabled ? 'text-[var(--text-primary)] hover:bg-blue-50 hover:text-blue-600' : ''}
                    ${isToday && !isSelected ? 'ring-2 ring-blue-200 text-[var(--primary)]' : ''}
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
