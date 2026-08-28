import { href } from '@/lib/basePath';

export default function Hello() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="rounded-lg border-2 border-black bg-white px-12 py-10 shadow-[4px_4px_0_0_#000] text-center">
        <h1 className="text-4xl font-bold text-black tracking-tight">hello</h1>
        <div className="mt-3 h-px w-16 bg-black mx-auto" />
      </div>

      <div className="mt-6 text-center">
        <a
          href={href('/')}
          className="text-sm font-semibold text-black underline underline-offset-4 decoration-2 hover:bg-black hover:text-white hover:no-underline px-1.5 py-0.5 rounded transition-colors"
        >
          ← 이벤트 신청서로 돌아가기
        </a>
      </div>
    </div>
  );
}
