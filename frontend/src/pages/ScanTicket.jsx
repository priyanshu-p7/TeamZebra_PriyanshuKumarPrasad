import { useState } from 'react';
import QRScanner from '../components/QRScanner';
import { verifyQR } from '../services/api';

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
    <div className="min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Scan <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">Ticket</span>
          </h1>
          <p className="text-[var(--text-secondary)]">Scan attendee QR codes to verify entry</p>
        </div>

        <div className="card p-6 md:p-8 mb-6 animate-slideUp">
          <QRScanner
            onScan={handleScan}
            onError={(err) => setResult({ valid: false, message: err })}
          />
        </div>

        {/* Manual input */}
        <div className="card p-6 mb-6">
          <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-3">Or Enter QR Code Manually</h3>
          <form onSubmit={handleManualVerify} className="flex gap-3">
            <input
              type="text"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              className="input-field flex-1"
              placeholder="Paste QR code data..."
            />
            <button type="submit" disabled={loading} className="btn-primary !py-2 whitespace-nowrap">
              {loading ? '...' : 'Verify'}
            </button>
          </form>
        </div>

        {/* Result */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {result && !loading && (
          <div
            className="card p-6 animate-fadeIn"
            style={{
              borderColor: result.valid ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)',
            }}
          >
            <div className="text-center mb-4">
              <div className="text-5xl mb-3">{result.valid ? '✅' : '❌'}</div>
              <h2
                className="text-xl font-bold"
                style={{ color: result.valid ? 'var(--success)' : 'var(--error)' }}
              >
                {result.valid ? 'Entry Allowed!' : 'Entry Denied'}
              </h2>
              <p className="text-[var(--text-secondary)] mt-1">{result.message}</p>
            </div>

            {result.booking && (
              <div className="mt-4 p-4 rounded-lg" style={{ background: 'var(--bg-surface)' }}>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-[var(--text-muted)] text-xs">Attendee</p>
                    <p className="font-medium">{result.booking.userName}</p>
                  </div>
                  {result.booking.userEmail && (
                    <div>
                      <p className="text-[var(--text-muted)] text-xs">Email</p>
                      <p className="font-medium">{result.booking.userEmail}</p>
                    </div>
                  )}
                  {result.booking.eventTitle && (
                    <div>
                      <p className="text-[var(--text-muted)] text-xs">Event</p>
                      <p className="font-medium">{result.booking.eventTitle}</p>
                    </div>
                  )}
                  {result.booking.ticketCount && (
                    <div>
                      <p className="text-[var(--text-muted)] text-xs">Tickets</p>
                      <p className="font-medium">{result.booking.ticketCount}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-[var(--text-muted)] text-xs">Status</p>
                    <span className={`badge ${result.booking.status === 'checked-in' ? 'badge-checked-in' : 'badge-confirmed'}`}>
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
