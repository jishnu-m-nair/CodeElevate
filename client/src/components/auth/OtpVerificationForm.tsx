import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface OtpVerificationFormProps {
  email?: string;
  onVerify?: (otp: string) => void;
  onResend?: () => void;
}

const OTP_LENGTH = 6;

const OtpVerificationForm: React.FC<OtpVerificationFormProps> = ({ email, onVerify, onResend }) => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState<number>(25);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const finalOtp = otp.join('');
    if (finalOtp.length === OTP_LENGTH) {
      onVerify?.(finalOtp);
      console.log('OTP Verified:', finalOtp);
    }
    navigate('/home');
  };

  const handleResend = () => {
    setOtp(Array(OTP_LENGTH).fill(''));
    setTimer(25);
    inputsRef.current[0]?.focus();
    onResend?.();
    console.log('OTP Resent');
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">OTP Verification</h2>
        <p className="text-gray-400 text-sm">
          One Time Password has been sent to <span className="text-gray-200">{email}</span>
        </p>
      </div>

      <div className="flex justify-between gap-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-12 text-center text-lg font-semibold
              bg-gray-700/50 border border-gray-600 rounded-lg
              text-white focus:outline-none focus:ring-2
              focus:ring-blue-500 transition"
          />
        ))}
      </div>

      <div className="text-right text-xs text-gray-400">
        Resend OTP in <span className="text-gray-200">00:{timer.toString().padStart(2, '0')}</span>
      </div>

      <button
        onClick={handleVerify}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700
          text-white font-semibold rounded-lg transition
          transform hover:scale-[1.02]"
      >
        Verify OTP
      </button>

      <button
        disabled={timer !== 0}
        onClick={handleResend}
        className={`w-full py-3 rounded-lg font-semibold transition
          ${
            timer === 0
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-gray-600 text-gray-300 cursor-not-allowed'
          }`}
      >
        Resend OTP
      </button>
    </div>
  );
};

export default OtpVerificationForm;
