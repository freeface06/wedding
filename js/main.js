document.addEventListener('DOMContentLoaded', () => {
    // 1. Swiper.js 초기화 (갤러리)
    const swiper = new Swiper('.mySwiper', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });

    // 2. 아코디언 메뉴 동작 (계좌번호)
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            
            // Toggle current item
            item.classList.toggle('active');
            
            // 기본 동작 제어 (하나만 열리게 하려면 아래 코드 주석 해제)
            /*
            const siblings = document.querySelectorAll('.accordion-item');
            siblings.forEach(sibling => {
                if(sibling !== item) {
                    sibling.classList.remove('active');
                }
            });
            */
        });
    });

    // 3. 계좌번호 복사 기능
    const copyButtons = document.querySelectorAll('.btn-copy');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // 버튼 요소의 부모 요소(account-row) 내부에서 계좌번호(acc-num) 값을 찾음
            const row = e.target.closest('.account-row');
            const accNum = row.querySelector('.acc-num').innerText;
            
            // 하이픈(-) 제거
            const cleanAccNum = accNum.replace(/-/g, '');
            
            navigator.clipboard.writeText(cleanAccNum).then(() => {
                alert('계좌번호가 복사되었습니다.');
            }).catch(err => {
                console.error('복사 실패:', err);
                alert('복사에 실패했습니다. 직접 선택하여 복사해 주세요.');
            });
        });
    });
});
