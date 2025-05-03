export default function Page() {
    return (
        <div
            className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden"
        >
            <div className="flex items-center bg-slate-50 p-4 pb-2 justify-between">
                <div className="text-[#0e141b] flex size-12 shrink-0 items-center" data-icon="ArrowLeft" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                    </svg>
                </div>
                <h2 className="text-[#0e141b] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">一日五分習慣をスタートする</h2>
            </div>
            <h2 className="text-[#0e141b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Todays tasks</h2>
            <div className="flex items-center gap-4 bg-slate-50 px-4 min-h-14 justify-between">
                <p className="text-[#0e141b] text-base font-normal leading-normal flex-1 truncate">Make bed</p>
                <div className="shrink-0">
                    <div className="flex size-7 items-center justify-center">
                        <input
                            type="checkbox"
                            className="h-5 w-5 rounded border-[#d0dbe7] border-2 bg-transparent text-[#1980e6] checked:bg-[#1980e6] checked:border-[#1980e6] checked:bg-[image:--checkbox-tick-svg] focus:ring-0 focus:ring-offset-0 focus:border-[#d0dbe7] focus:outline-none"
                        />
                    </div>
                </div>
            </div>
            <div className="flex px-4 py-3">
                <button
                    className="flex min-w-[84px] mx-auto max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-[#1980e6] text-slate-50 text-base font-bold leading-normal tracking-[0.015em]"
                >
                    <span className="truncate">タスクを始める</span>
                </button>
            </div>
            <div className="h-5 bg-slate-50"></div>
        </div>
    );
}