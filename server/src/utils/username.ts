export const generateUsernameBase = (name?: string, email?: string): string => {
  if (name) {
    const sanitized = name
      .normalize('NFKD')
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '_')
      .toLowerCase()
      .trim();

    if (sanitized.length >= 3) {
      return sanitized;
    }
  }

  if (email) {
    return email.split('@')[0]!;
  }

  return 'user';
};
