import { useState } from 'react';
import QRScanner from '../components/QRScanner';
import { verifyQR } from '../services/api';
import { ScanLine, CheckCircle, XCircle, User, Mail, Ticket, CheckSquare } from 'lucide-react';

const ScanTicket = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [manualCode, setManualCode] = useState('');

  const handleScan = async (qrCodeData) => {
    setLoading(true);
    setResult(null);
    try {
      const { data } = await verifyQR({ qrCodeData });
      setResult(data);
    } catch (error) {
      setResult(error.response?.data || { valid: false, message: 'Verification failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleManualVerify = async (e) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    await handleScan(manualCode.trim());
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 animate-fadeIn text-center">
          <div className="flex justify-center mb-5">
             <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center text-[var(--primary)] shadow-sm">
               <ScanLine size={40} />
             </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-3">
            Scan <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">Ticket</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">Scan attendee QR codes to verify entry</p>
        </div>

        <div className="card p-8 mb-8 animate-slideUp shadow-sm bg-white">
          <QRScanner
            onScan={handleScan}
            onError={(err) => setResult({ valid: false, message: err })}
          />
        </div>

        {/* Manual input */}
        <div className="card p-8 mb-8 bg-white shadow-sm">
          <h3 className="text-sm font-bold tracking-wide uppercase text-[var(--text-secondary)] mb-4">Or Enter QR Code Manually</h3>
          <form onSubmit={handleManualVerify} className="flex gap-4">
            <input
              type="text"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              className="input-field flex-1"
              placeholder="Paste QR code data..."
            />
            <button type="submit" disabled={loading} className="btn-primary !py-3 !px-6 whitespace-nowrap">
              {loading ? '...' : 'Verify'}
            </button>
          </form>
        </div>

        {/* Result */}
        {loading && (
          <div className="flex items-center justify-center py-10">
            <div className="w-10 h-10 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {result && !loading && (
          <div
            className="card p-8 animate-fadeIn border-2 bg-white"
            style={{
              borderColor: result.valid ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)',
              boxShadow: result.valid ? '0 10px 30px rgba(16,185,129,0.1)' : '0 10px 30px rgba(239,68,68,0.1)',
            }}
          >
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                 {result.valid ? <CheckCircle size={64} className="text-[var(--success)]" /> : <XCircle size={64} className="text-[var(--error)]" />}
              </div>
              <h2
                className="text-2xl font-black"
                style={{ color: result.valid ? 'var(--success)' : 'var(--error)' }}
              >
                {result.valid ? 'Entry Allowed!' : 'Entry Denied'}
              </h2>
              <p className="text-[var(--text-secondary)] mt-2 font-medium">{result.message}</p>
            </div>

            {result.booking && (
              <div className="mt-6 p-6 rounded-2xl" style={{ background: 'var(--bg-surface)' }}>
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <p className="text-[var(--text-muted)] text-xs uppercase font-bold flex items-center gap-1.5 mb-1"><User size={12}/> Attendee</p>
                    <p className="font-semibold text-[var(--text-primary)]">{result.booking.userName}</p>
                  </div>
                  {result.booking.userEmail && (
                    <div>
                      <p className="text-[var(--text-muted)] text-xs uppercase font-bold flex items-center gap-1.5 mb-1"><Mail size={12}/> Email</p>
                      <p className="font-semibold text-[var(--text-primary)]">{result.booking.userEmail}</p>
                    </div>
                  )}
                  {result.booking.eventTitle && (
                    <div className="col-span-2">
                       <p className="text-[var(--text-muted)] text-xs uppercase font-bold flex items-center gap-1.5 mb-1"><Ticket size={12}/> Event</p>
                       <p className="font-semibold text-[var(--text-primary)]">{result.booking.eventTitle}</p>
                    </div>
                  )}
                  {result.booking.ticketCount && (
                    <div>
                      <p className="text-[var(--text-muted)] text-xs uppercase font-bold flex items-center gap-1.5 mb-1"><Ticket size={12}/> Tickets</p>
                      <p className="font-semibold text-[var(--text-primary)]">{result.booking.ticketCount}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-[var(--text-muted)] text-xs uppercase font-bold flex items-center gap-1.5 mb-1"><CheckSquare size={12}/> Status</p>
                    <span className={`badge ${result.booking.status === 'checked-in' ? 'badge-checked-in' : 'badge-confirmed'} mt-1`}>
                       {result.booking.status}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanTicket;
