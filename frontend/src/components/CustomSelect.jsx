import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const CustomSelect = ({ 
  options, 
  value, 
  onChange, 
  placeholder = 'Select an option', 
  name, 
  className = '',
  icon: Icon
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange({
      target: {
        name: name,
        value: optionValue
      }
    });
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`input-field flex items-center justify-between cursor-pointer text-left transition-all duration-300 ${isOpen ? 'border-[var(--primary)] ring-4 ring-[var(--primary)]/10 bg-white' : ''}`}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon size={18} className="text-[var(--text-muted)]" />}
          <span className={selectedOption ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown 
          size={18} 
          className={`text-[var(--text-muted)] transition-transform duration-300 ${isOpen ? 'rotate-180 text-[var(--primary)]' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 py-2 bg-white border border-[var(--border)] rounded-2xl shadow-xl animate-slideDown overflow-hidden backdrop-blur-xl">
          <div className="max-h-60 overflow-y-auto custom-scrollbar">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`w-full px-5 py-3 text-left transition-all duration-200 flex items-center justify-between
                  ${value === option.value 
                    ? 'bg-blue-50 text-[var(--primary)] font-semibold' 
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--primary)]'
                  }`}
              >
                {option.label}
                {value === option.value && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
