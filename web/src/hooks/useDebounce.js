import { useEffect, useState } from 'react';

// Tunda perubahan nilai (dipakai pada kolom pencarian agar tidak spam API)
export default function useDebounce(value, delay = 300) {
  const [tertunda, setTertunda] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setTertunda(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return tertunda;
}
