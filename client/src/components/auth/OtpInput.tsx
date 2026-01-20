import { useOtpInput } from "../../hooks/useOtpInput";

interface OtpInputProps {
  length?: number;
  email?: string;
  onVerify: (otp: string) => Promise<void> | void;
  onResend?: () => Promise<void> | void;
  resendTimeout?: number;
}

export default function OtpInput({
  length = 6,
  email,
  onVerify,
  onResend,
  resendTimeout = 25,
}: OtpInputProps) {

  const {
    otp,
    timer,
    loading,
    inputsRef,
    handleChange,
    handleKeyDown,
    handleVerify,
    handleResend,
  } = useOtpInput({
    length,
    resendTimeout,
    onVerify,
    onResend,
  });

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">OTP Verification</h2>
        {email && (
          <p className="text-sm text-gray-400 mt-1">
            Code sent to <span className="text-gray-200">{email}</span>
          </p>
        )}
      </div>

      <div className="flex justify-between gap-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {(inputsRef.current[index] = el)}}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-12 text-center text-lg font-semibold
              bg-gray-700/50 border border-gray-600 rounded-lg
              text-white focus:outline-none focus:ring-2
              focus:ring-blue-500"
          />
        ))}
      </div>

      <div className="text-right text-xs text-gray-400">
        Resend OTP in{" "}
        <span className="text-gray-200">
          00:{timer.toString().padStart(2, "0")}
        </span>
      </div>

      <button
        onClick={handleVerify}
        disabled={loading}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700
          text-white font-semibold rounded-lg transition"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      <button
        disabled={timer !== 0}
        onClick={handleResend}
        className={`w-full py-3 rounded-lg font-semibold transition
          ${
            timer === 0
              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
              : "bg-gray-600 text-gray-300 cursor-not-allowed"
          }`}
      >
        Resend OTP
      </button>
    </div>
  );
}
