import { useEffect, useRef, useState } from "react";

interface UseOtpInputProps {
  length: number;
  resendTimeout: number;
  onVerify: (otp: string) => Promise<void> | void;
  onResend?: () => Promise<void> | void;
}

export function useOtpInput({
  length,
  resendTimeout,
  onVerify,
  onResend,
}: UseOtpInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [timer, setTimer] = useState(resendTimeout);
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

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

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== length) return;

    try {
      setLoading(true);
      await onVerify(finalOtp);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer !== 0) return;

    setOtp(Array(length).fill(""));
    setTimer(resendTimeout);
    inputsRef.current[0]?.focus();
    await onResend?.();
  };

  return {
    otp,
    timer,
    loading,
    inputsRef,
    handleChange,
    handleKeyDown,
    handleVerify,
    handleResend,
  };
}
