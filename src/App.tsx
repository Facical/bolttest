import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { href } from '@/lib/basePath';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const phoneValid = phone.replace(/[^0-9]/g, '').length >= 9;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phoneValid) return;

    setStatus('submitting');
    setErrorMsg('');

    const { error } = await supabase
      .from('event_registrations')
      .insert({ name: name.trim(), phone: phone.trim() });

    if (error) {
      setStatus('error');
      setErrorMsg('신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    setStatus('success');
    setName('');
    setPhone('');
  };

  const reset = () => {
    setStatus('idle');
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg border-2 border-black mb-4">
            <span className="text-2xl font-bold text-black">E</span>
          </div>
          <h1 className="text-2xl font-bold text-black tracking-tight">
            이벤트 신청서
          </h1>
          <div className="mt-2 h-px w-16 bg-black mx-auto" />
          <p className="mt-3 text-sm text-gray-500">
            아래 정보를 입력하고 신청 버튼을 눌러주세요.
          </p>
        </div>

        {/* Form card — wireframe style */}
        <div className="rounded-lg border-2 border-black bg-white p-6 shadow-[4px_4px_0_0_#000]">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-black mb-4">
                <svg
                  className="w-6 h-6 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-black mb-1">신청 완료</h2>
              <p className="text-sm text-gray-500 mb-6">
                이벤트 신청이 정상적으로 접수되었습니다.
              </p>
              <button
                onClick={reset}
                className="w-full rounded-md border-2 border-black bg-black text-white font-semibold py-2.5 hover:bg-white hover:text-black transition-colors"
              >
                다시 신청하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-black mb-1.5">
                  이름 <span className="text-gray-400">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                  className="w-full rounded-md border-2 border-gray-300 bg-white px-3 py-2.5 text-black placeholder-gray-300 focus:border-black focus:outline-none transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-black mb-1.5">
                  전화번호 <span className="text-gray-400">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-1234-5678"
                  className="w-full rounded-md border-2 border-gray-300 bg-white px-3 py-2.5 text-black placeholder-gray-300 focus:border-black focus:outline-none transition-colors"
                />
              </div>

              {/* Error message */}
              {status === 'error' && (
                <p className="text-sm text-black border-2 border-black bg-gray-100 px-3 py-2 rounded-md">
                  {errorMsg}
                </p>
              )}

              {/* Submit button — the one element that stands out */}
              <button
                type="submit"
                disabled={status === 'submitting' || !name.trim() || !phoneValid}
                className="w-full rounded-md border-2 border-black bg-black text-white font-bold py-3 hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:translate-y-px"
              >
                {status === 'submitting' ? '신청 중...' : '신청하기'}
              </button>
            </form>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          입력하신 정보는 이벤트 운영 목적으로만 사용됩니다.
        </p>

        <div className="mt-6 text-center">
          <a
            href={href('/hello')}
            className="text-sm font-semibold text-black underline underline-offset-4 decoration-2 hover:bg-black hover:text-white hover:no-underline px-1.5 py-0.5 rounded transition-colors"
          >
            hello 페이지로 이동 →
          </a>
        </div>
      </div>
    </div>
  );
}
