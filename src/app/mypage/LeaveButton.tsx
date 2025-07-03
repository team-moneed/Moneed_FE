'use client';
import { useMutation } from '@tanstack/react-query';
import { leave } from '@/api/auth.api';
import { cn } from '@/util/style';
import { useRouter } from 'next/navigation';

export default function LeaveButton() {
    const router = useRouter();
    const { mutate: leaveKakao, isPending } = useMutation({
        mutationFn: () => leave({ provider: 'kakao' }),
        onSuccess: () => {
            router.push('/?reason=leave');
        },
        onError: error => {
            console.error('탈퇴 오류:', error);
            alert('탈퇴 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
        },
    });

    const handleLeave = () => {
        const confirmMessage = `정말로 탈퇴하시겠습니까?

탈퇴 시 다음 사항이 적용됩니다:
• 모든 개인정보가 삭제됩니다
• 작성한 게시글과 댓글이 삭제됩니다
• 선택한 종목 정보가 삭제됩니다
• 탈퇴 후 복구가 불가능합니다

정말로 탈퇴하시겠습니까?`;

        if (confirm(confirmMessage)) {
            leaveKakao();
        }
    };

    return (
        <button
            className={cn(
                'text-[1.4rem] font-normal leading-[145%] text-moneed-gray-7',
                isPending ? 'opacity-50 cursor-not-allowed' : 'hover:text-moneed-gray-9',
            )}
            onClick={handleLeave}
            disabled={isPending}
        >
            {isPending ? '탈퇴 처리 중...' : '탈퇴하기'}
        </button>
    );
}
