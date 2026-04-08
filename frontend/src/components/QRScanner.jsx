import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QRScanner = ({ onScan, onError }) => {
  const html5QrCodeRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  const startScanner = async () => {
    if (html5QrCodeRef.current) return;
    setPermissionDenied(false);

    try {
      const html5QrCode = new Html5Qrcode('qr-reader');
      html5QrCodeRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1,
        },
        (decodedText) => {
          onScan(decodedText);
          stopScanner();
        },
        (errorMessage) => {
          // Ignore continuous scan errors
        }
      );
      setIsScanning(true);
    } catch (err) {
      console.error('Scanner error:', err);
      if (err.toString().includes('NotAllowedError') || err.toString().includes('Permission denied')) {
        setPermissionDenied(true);
      } else {
        onError?.(err.toString());
      }
    }
  };

  const stopScanner = async () => {
    if (html5QrCodeRef.current) {
      try {
        await html5QrCodeRef.current.stop();
        html5QrCodeRef.current.clear();
      } catch (err) {
        // Ignore cleanup errors
      }
      html5QrCodeRef.current = null;
    }
    setIsScanning(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        id="qr-reader"
        className="w-full max-w-md rounded-xl overflow-hidden"
        style={{ border: '2px solid var(--border)' }}
      />

      {permissionDenied && (
        <div className="w-full max-w-md p-4 rounded-xl text-sm" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
          <p className="font-semibold text-[var(--warning)] mb-2">📷 Camera Permission Required</p>
          <p className="text-[var(--text-secondary)] mb-2">Your browser blocked camera access. To fix this:</p>
          <ol className="text-[var(--text-secondary)] list-decimal ml-5 flex flex-col gap-1">
            <li>Click the <strong>lock/camera icon</strong> in your browser's address bar</li>
            <li>Set <strong>Camera</strong> to <strong>"Allow"</strong></li>
            <li>Reload the page and try again</li>
          </ol>
          <p className="text-[var(--text-muted)] mt-3 text-xs">💡 Alternatively, use the <strong>manual input</strong> below to paste the QR code data directly.</p>
        </div>
      )}

      <button
        onClick={isScanning ? stopScanner : startScanner}
        className={isScanning ? 'btn-secondary' : 'btn-primary'}
      >
        {isScanning ? '⏹ Stop Scanner' : '📷 Start Scanner'}
      </button>
    </div>
  );
};

export default QRScanner;
